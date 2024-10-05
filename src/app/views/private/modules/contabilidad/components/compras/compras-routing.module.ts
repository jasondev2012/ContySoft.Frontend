import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComprasGridComponent } from './compras-grid/compras-grid.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ComprasGridComponent }
	])],
	exports: [RouterModule]
})
export class ComprasRoutingModule { }
