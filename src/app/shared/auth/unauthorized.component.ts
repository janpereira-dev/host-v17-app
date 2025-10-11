import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  template: `
    <div style="padding:2rem">
      <h2>Acceso no autorizado</h2>
      <p>No se pudo completar la autenticación o no tienes permisos.</p>
    </div>
  `,
})
export class UnauthorizedComponent {}
