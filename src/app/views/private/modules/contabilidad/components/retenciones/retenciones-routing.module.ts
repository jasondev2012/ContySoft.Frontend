import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RetencionesGridComponent } from './retenciones-grid/retenciones-grid.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: RetencionesGridComponent }
	])],
	exports: [RouterModule]
})
export class RetencionesRoutingModule { }
