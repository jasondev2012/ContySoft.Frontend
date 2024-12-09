import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VentaComponent } from './components/venta/venta.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'ventas', data: { breadcrumb: 'Ventas' }, component: VentaComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ReporteRoutingModule { }
