import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'almacen', data: { breadcrumb: 'Almacen' }, loadChildren: () => import('./components/almacen/almacen.module').then(m => m.AlmacenModule)},
        { path: 'categoria', data: { breadcrumb: 'Categoria' }, loadChildren: () => import('./components/categoria/categoria.module').then(m => m.CategoriaModule)},
        { path: 'kardex', data: { breadcrumb: 'Kardex' }, loadChildren: () => import('./components/kardex/kardex.module').then(m => m.KardexModule)},
        { path: 'producto', data: { breadcrumb: 'Producto' }, loadChildren: () => import('./components/producto/producto.module').then(m => m.ProductoModule)},
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class InventarioRoutingModule { }
