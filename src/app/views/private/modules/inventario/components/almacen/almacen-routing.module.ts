import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlmacenGridComponent } from './almacen-grid/almacen-grid.component';
import { AlmacenFormComponent } from './almacen-form/almacen-form.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: 'listar', component: AlmacenGridComponent },
		{ path: 'agregar', component: AlmacenFormComponent }
	])],
	exports: [RouterModule]
})
export class AlmacenRoutingModule { }
