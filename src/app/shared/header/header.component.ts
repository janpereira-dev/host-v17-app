import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { PerformanceTimingService } from '../perf/performance-timing.service';
import { RouterLinkTimingDirective } from '../perf/routerlink-timing.directive';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AsyncPipe, NgIf } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterLink,
    RouterLinkTimingDirective,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly perf = inject(PerformanceTimingService);
  private readonly oidcSecurityService = inject(OidcSecurityService);
  label = this.perf.label;

  isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;

  login(): void {
    // Guardar URL actual para volver tras el login
    sessionStorage.setItem(
      'postLoginRedirect',
      location.pathname + location.search + location.hash
    );
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    this.oidcSecurityService.logoff().subscribe();
  }
}
