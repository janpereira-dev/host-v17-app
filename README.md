# HostV17App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Autenticación OIDC (Entra ID)

Este proyecto está configurado con `angular-auth-oidc-client` para proteger todas las rutas mediante Auto Login. La configuración usa los valores de Entra ID descritos en `EntraId.md`.

- Librería instalada: `angular-auth-oidc-client@^17`
- Proveedor: configurado en `src/app/app.config.ts` con:
	- `authority`: `https://login.microsoftonline.com/{tenantId}/v2.0`
	- `clientId`: `{application (client) id}`
	- `redirectUrl` y `postLogoutRedirectUri`: `window.location.origin`
	- `scope`: `openid profile email offline_access`
	- `responseType`: `code`
	- `silentRenew`: `true`
	- `useRefreshToken`: `true`

Las rutas están protegidas con `AutoLoginPartialRoutesGuard` en `app.routes.ts`.

### Inicio rápido

1. Configura en Entra ID la SPA con los Redirect URIs incluyendo `http://localhost:4200/`.
2. Ajusta `authority` y `clientId` en `src/app/app.config.ts`.
3. Ejecuta la app y accede a `http://localhost:4200/`.
4. Usa los botones Login/Logout en la barra superior.

Para entornos múltiples, puedes extraer esta configuración a `src/assets/environments.json` y leerla en el bootstrap.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
