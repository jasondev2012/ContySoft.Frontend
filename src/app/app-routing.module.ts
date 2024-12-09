import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { authGuard } from './common/guards/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [authGuard]},
                    { path: 'ventas', loadChildren: () => import('./views/private/modules/punto-de-venta/punto-de-venta.module').then(m => m.PuntoDeVentaModule), canActivate: [authGuard] },
                    { path: 'inventario', loadChildren: () => import('./views/private/modules/inventario/inventario.module').then(m => m.InventarioModule), canActivate: [authGuard] },
                    { path: 'configuracion', loadChildren: () => import('./views/private/modules/configuracion/configuracion.module').then(m => m.ConfiguracionModule), canActivate: [authGuard] },
                    { path: 'reporte', loadChildren: () => import('./views/private/modules/reporte/reporte.module').then(m => m.ReporteModule), canActivate: [authGuard] }
                ]
            },
            { path: 'auth', loadChildren: () => import('./views/public/modules/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
