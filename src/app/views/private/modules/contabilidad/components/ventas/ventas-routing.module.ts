import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VentasGridComponent } from './ventas-grid/ventas-grid.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: VentasGridComponent }
	])],
	exports: [RouterModule]
})
export class VentasRoutingModule { }
