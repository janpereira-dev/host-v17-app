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
      remoteEntry: 'https://remotev12app.netlify.app/remoteEntry.js',
      remoteName: 'remoteV12App',
      exposedModule: './VentasWebComponent',
      elementName: 'remote-v12-ventas',
    } as WebComponentWrapperOptions,
  },
  {
    path: 'grid19',
    component: WebComponentWrapper,
    data: {
      type: 'module',
      remoteEntry: 'https://remotev19app.netlify.app/remoteEntry.js',
      exposedModule: './GridWebComponent',
      elementName: 'remote-v19-grid',
    } as WebComponentWrapperOptions,
  },
  {
    path: 'saitama',
    component: WebComponentWrapper,
    data: {
      type: 'module',
      remoteEntry: 'https://remotev17app.netlify.app/remoteEntry.js',
      exposedModule: './SaitamaElement',
      elementName: 'remote-v17-saitama',
    } as WebComponentWrapperOptions,
  },
];
