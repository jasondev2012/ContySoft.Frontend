import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VentaGridComponent } from './venta-grid/venta-grid.component';
import { VentaFormComponent } from './venta-form/venta-form.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: 'listar', component: VentaGridComponent },
		{ path: 'agregar', component: VentaFormComponent }
	])],
	exports: [RouterModule]
})
export class VentasRoutingModule { }
