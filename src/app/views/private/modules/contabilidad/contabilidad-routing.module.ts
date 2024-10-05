import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VentasGridComponent } from './components/ventas/ventas-grid/ventas-grid.component';
import { ComprasGridComponent } from './components/compras/compras-grid/compras-grid.component';
import { PercepcionesGridComponent } from './components/percepciones/percepciones-grid/percepciones-grid.component';
import { RetencionesGridComponent } from './components/retenciones/retenciones-grid/retenciones-grid.component';
import { LiquidacionesGridComponent } from './components/liquidaciones/liquidaciones-grid/liquidaciones-grid.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'ventas', data: { breadcrumb: 'Ventas' }, loadChildren: () => import('./components/ventas/ventas.module').then(m => m.VentasModule)},
        { path: 'compras', data: { breadcrumb: 'Compras' }, loadChildren: () => import('./components/compras/compras.module').then(m => m.ComprasModule)},
        { path: 'percepciones', data: { breadcrumb: 'Percepciones' }, loadChildren: () => import('./components/percepciones/percepciones.module').then(m => m.PercepcionesModule)},
        { path: 'retenciones', data: { breadcrumb: 'Retenciones' }, loadChildren: () => import('./components/retenciones/retenciones.module').then(m => m.RetencionesModule)},
        { path: 'liquidaciones', data: { breadcrumb: 'Liquidaciones' }, loadChildren: () => import('./components/liquidaciones/liquidaciones.module').then(m => m.LiquidacionesModule)},
        { path: 'calculo-impuestos', data: { breadcrumb: 'Calculo de impuestos' }, loadChildren: () => import('./components/calculo-impuestos/calculo-impuestos.module').then(m => m.CalculoImpuestosModule)},
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ContabilidadRoutingModule { }
