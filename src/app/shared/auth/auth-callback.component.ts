import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Procesando inicio de sesión...</p>`,
})
export class AuthCallbackComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe({
      next: ({ isAuthenticated }) => {
        const target = sessionStorage.getItem('postLoginRedirect') || '/';
        if (isAuthenticated) {
          this.router.navigateByUrl(target);
        } else {
          this.router.navigateByUrl('/');
        }
      },
      error: () => this.router.navigateByUrl('/'),
    });
  }
}
