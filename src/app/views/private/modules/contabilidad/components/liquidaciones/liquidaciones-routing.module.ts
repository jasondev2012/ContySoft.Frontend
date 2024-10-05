import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LiquidacionesGridComponent } from './liquidaciones-grid/liquidaciones-grid.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: LiquidacionesGridComponent }
	])],
	exports: [RouterModule]
})
export class LiquidacionesRoutingModule { }
