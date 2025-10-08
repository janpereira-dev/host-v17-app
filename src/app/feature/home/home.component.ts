import { Component, computed, signal } from '@angular/core';

// Importar versiones del package.json en build-time
// Necesita compilerOptions.resolveJsonModule = true en tsconfig.json
import packageJson from '../../../../package.json';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly pkg = signal(packageJson as any);

  // Lista amigable de librerías a mostrar
  private readonly desiredKeys = [
    '@angular/core',
    '@angular/router',
    '@angular/material',
    '@angular/cdk',
    'rxjs',
    'zone.js',
    'bootstrap',
    '@angular-architects/module-federation',
    '@angular-architects/module-federation-tools',
  ];

  angularVersion = computed(
    () => this.pkg().dependencies?.['@angular/core'] ?? 'desconocida'
  );

  libs = computed(() => {
    const deps = {
      ...(this.pkg().dependencies ?? {}),
      ...(this.pkg().devDependencies ?? {}),
    } as Record<string, string>;

    return this.desiredKeys
      .filter((k) => deps[k])
      .map((k) => ({ name: k, version: deps[k] }))
      .sort((a, b) => a.name.localeCompare(b.name));
  });
}
