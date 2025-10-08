import { Injectable, NgZone, signal, computed } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';

/**
 * Servicio para medir tiempos de navegación y carga de rutas perezosas (incluyendo MFEs).
 *
 * Definición de “cargado al 100%” en esta primera versión:
 *  - Desde NavigationStart hasta que el navegador ha renderizado (dos rAFs tras estabilizarse la zona).
 *  - Se reporta también el tiempo de carga del módulo perezoso si aplica (RouteConfigLoadStart/End).
 *
 * Nota: Si necesitas medir desde el clic exacto del RouterLink, podemos añadir una directiva opcional
 * que marque el timestamp en el evento click y usarlo como inicio en lugar de NavigationStart.
 */
@Injectable({ providedIn: 'root' })
export class PerformanceTimingService {
  private currentNavId: number | null = null;
  private navStartTs = 0;
  private lazyStartTs: number | null = null;
  private clickStartTs: number | null = null;

  // Señales reactivas con el último resultado de medición
  private _totalMs = signal<number | null>(null);
  private _lazyMs = signal<number | null>(null);

  // Etiqueta formateada para UI (por ejemplo: "Carga: 1.23s (MFE: 420ms)")
  label = computed(() => {
    const total = this._totalMs();
    const lazy = this._lazyMs();
    if (total == null) return '';
    const totalStr =
      total >= 1000
        ? `${(total / 1000).toFixed(2)}s`
        : `${Math.round(total)}ms`;
    if (lazy != null) {
      const lazyStr =
        lazy >= 1000 ? `${(lazy / 1000).toFixed(2)}s` : `${Math.round(lazy)}ms`;
      return `Carga: ${totalStr} (MFE: ${lazyStr})`;
    }
    return `Carga: ${totalStr}`;
  });

  constructor(private router: Router, private zone: NgZone) {
    this.bindRouterEvents();
  }

  get totalMs() {
    return this._totalMs;
  }

  get lazyMs() {
    return this._lazyMs;
  }

  private bindRouterEvents() {
    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationStart) {
        // Nueva navegación: inicializa medición
        this.currentNavId = event.id;
        // Si hay marca de clic, úsala como inicio, si no, usa el NavigationStart
        this.navStartTs = this.clickStartTs ?? performance.now();
        this.clickStartTs = null;
        this.lazyStartTs = null;
        this._lazyMs.set(null);
      }

      if (event instanceof RouteConfigLoadStart) {
        // Inicio de carga de módulo perezoso (probable MFE)
        if (this.currentNavId != null) {
          this.lazyStartTs = performance.now();
        }
      }

      if (event instanceof RouteConfigLoadEnd) {
        // Fin de carga de módulo perezoso
        if (this.currentNavId != null && this.lazyStartTs != null) {
          this._lazyMs.set(performance.now() - this.lazyStartTs);
        }
      }

      if (event instanceof NavigationEnd) {
        if (this.currentNavId === event.id) {
          // Espera a que Angular esté estable y el frame haya renderizado
          await this.waitForRenderStable();
          this._totalMs.set(performance.now() - this.navStartTs);
          this.currentNavId = null;
        }
      }

      if (
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        if (this.currentNavId === event.id) {
          // Resetea medición si la navegación no concluye
          this.currentNavId = null;
          this._totalMs.set(null);
          this._lazyMs.set(null);
          this.clickStartTs = null;
        }
      }
    });
  }

  /**
   * Espera a que la zona esté estable y a dos frames de rAF para dar tiempo a pintar.
   */
  private waitForRenderStable(): Promise<void> {
    return new Promise((resolve) => {
      // onStable se dispara cuando no hay tareas micro/macro pendientes para Angular
      const sub = this.zone.onStable.subscribe(() => {
        sub.unsubscribe();
        // Dos rAF para dar margen al layout/paint
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });
    });
  }

  /** Marca explícitamente el inicio por clic (desde la UI). */
  markClickStart() {
    this.clickStartTs = performance.now();
  }
}
