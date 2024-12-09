import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PosComponent } from './components/pos/pos.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', data: { breadcrumb: 'Ventas' }, loadChildren: () => import('./components/ventas/ventas.module').then(m => m.VentasModule)},
        { path: 'pos', data: { breadcrumb: 'POS' }, component: PosComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PuntoDeVentaRoutingModule { }
