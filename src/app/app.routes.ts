import { Routes } from '@angular/router';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './common/guards/auth.guard';

export const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
      { path: 'contabilidad', loadChildren: () => import('./views/private/modules/contabilidad/contabilidad.module').then(m => m.ContabilidadModule), canActivate: [AuthGuard] },
      { path: 'configuracion', loadChildren: () => import('./views/private/modules/configuracion/configuracion.module').then(m => m.ConfiguracionModule), canActivate: [AuthGuard] }
    ]
  },
  { path: 'auth', loadChildren: () => import('./views/public/modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' }
];

