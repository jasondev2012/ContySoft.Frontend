import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KardexGridComponent } from './kardex-grid/kardex-grid.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: 'listar', component: KardexGridComponent }
	])],
	exports: [RouterModule]
})
export class KardexRoutingModule { }
