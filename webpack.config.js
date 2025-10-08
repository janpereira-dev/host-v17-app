const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

// Importante: NO compartir Angular (ni RxJS/Zone/Material/CDK) entre versiones mayores distintas
// para evitar conflictos de singleton y "Unsatisfied version".
module.exports = withModuleFederationPlugin({
  remotes: {},
  shared: {
    // Compartimos el resto de dependencias por defecto, pero EXCLUIMOS los paquetes listados
    // para que cada app (host v17 y remoto v12) use su propia copia empaquetada.
    ...shareAll(
      { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      [
        '@angular/core',
        '@angular/common',
        '@angular/common/http',
        '@angular/router',
        '@angular/animations',
        '@angular/forms',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        'zone.js',
        'rxjs',
        '@angular/material',
        '@angular/cdk',
      ]
    ),
  },
});
