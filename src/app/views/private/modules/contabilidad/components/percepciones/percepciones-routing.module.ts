import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PercepcionesGridComponent } from './percepciones-grid/percepciones-grid.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PercepcionesGridComponent }
	])],
	exports: [RouterModule]
})
export class PercepcionesRoutingModule { }
