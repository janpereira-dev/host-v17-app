import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { ModuleFederationToolsModule } from '@angular-architects/module-federation-tools';
import { provideAuth, LogLevel } from 'angular-auth-oidc-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(ModuleFederationToolsModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideAuth({
      config: {
        authority:
          'https://login.microsoftonline.com/93ad25dd-8cdc-4066-9727-31a8a3024f80/v2.0',
        redirectUrl: `${window.location.origin}/callback`,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'e1d23d37-b148-48db-9433-ccc73bd59444',
        scope: 'openid profile email offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        maxIdTokenIatOffsetAllowedInSeconds: 600,
        logLevel: LogLevel.Debug,
      },
    }),
  ],
};
