import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriaGridComponent } from './categoria-grid/categoria-grid.component';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: 'listar', component: CategoriaGridComponent },
		{ path: 'agregar', component: CategoriaFormComponent }
	])],
	exports: [RouterModule]
})
export class CategoriaRoutingModule { }
