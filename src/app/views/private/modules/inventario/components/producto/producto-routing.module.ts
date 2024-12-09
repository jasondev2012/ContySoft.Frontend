import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductoGridComponent } from './producto-grid/producto-grid.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: 'listar', component: ProductoGridComponent }
	])],
	exports: [RouterModule]
})
export class ProductoRoutingModule { }
