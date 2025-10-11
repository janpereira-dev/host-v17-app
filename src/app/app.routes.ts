import { Routes } from '@angular/router';
import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';
import { AutoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
import { AuthCallbackComponent } from './shared/auth/auth-callback.component';
import { UnauthorizedComponent } from './shared/auth/unauthorized.component';

export const routes: Routes = [
  {
    path: 'callback',
    component: AuthCallbackComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: '',
    canActivate: [AutoLoginPartialRoutesGuard],
    loadComponent: () =>
      import('./feature/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'ventas',
    canActivate: [AutoLoginPartialRoutesGuard],
    component: WebComponentWrapper,
    data: {
      type: 'script',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      remoteName: 'remoteV12App',
      exposedModule: './VentasWebComponent',
      elementName: 'remote-v12-ventas',
    } as WebComponentWrapperOptions,
  },
  {
    path: 'grid19',
    canActivate: [AutoLoginPartialRoutesGuard],
    component: WebComponentWrapper,
    data: {
      type: 'module',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      exposedModule: './GridWebComponent',
      elementName: 'remote-v19-grid',
    } as WebComponentWrapperOptions,
  },
  {
    path: 'saitama',
    canActivate: [AutoLoginPartialRoutesGuard],
    component: WebComponentWrapper,
    data: {
      type: 'module',
      remoteEntry: 'http://localhost:4203/remoteEntry.js',
      exposedModule: './SaitamaElement',
      elementName: 'remote-v17-saitama',
    } as WebComponentWrapperOptions,
  },
  // Callback route for OIDC if you want to handle it explicitly (optional)
  // { path: 'callback', canActivate: [AutoLoginAllRoutesGuard], component: EmptyComponent }
];
