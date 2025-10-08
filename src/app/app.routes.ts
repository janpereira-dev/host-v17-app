import { Routes } from '@angular/router';
import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';

export const routes: Routes = [
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
];
