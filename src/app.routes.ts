import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { AuthGuard } from './app/common/guards/auth.guard';

// export const appRoutes: Routes = [
//     {
//         path: '',
//         component: AppLayout,
//         children: [
//             { path: '', component: Dashboard },
//             { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
//             { path: 'documentation', component: Documentation },
//             { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
//         ]
//     },
//     { path: 'landing', component: Landing },
//     { path: 'notfound', component: Notfound },
//     { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
//     { path: '**', redirectTo: '/notfound' }
// ];

export const routes: Routes = [
  {
    path: '', component: AppLayout,
    children: [
      { path: '', component: Dashboard, canActivate: [AuthGuard] },
      { path: 'contabilidad', loadChildren: () => import('./app/views/private/modules/contabilidad/contabilidad.module').then(m => m.ContabilidadModule), canActivate: [AuthGuard] },
      { path: 'configuracion', loadChildren: () => import('./app/views/private/modules/configuracion/configuracion.module').then(m => m.ConfiguracionModule), canActivate: [AuthGuard] }
    ]
  },
  { path: 'auth', loadChildren: () => import('./app/views/public/modules/auth/auth.module').then(m => m.AuthModule) },
//   { path: 'landing', loadChildren: () => import('./app/demo/components/landing/landing.module').then(m => m.LandingModule) },
  { path: 'notfound', component: Notfound },
  { path: '**', redirectTo: '/notfound' }
];

