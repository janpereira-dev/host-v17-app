import { Routes } from '@angular/router';
import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'ventas',
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
    component: WebComponentWrapper,
    data: {
      // Remote Angular 19 usa container ESM -> cargar como módulo (no script global)
      type: 'module',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      exposedModule: './GridWebComponent',
      elementName: 'remote-v19-grid',
    } as WebComponentWrapperOptions,
  },
];
