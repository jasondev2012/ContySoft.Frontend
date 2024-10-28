import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmpresaGridComponent } from './empresa-grid/empresa-grid.component';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { EmpresaStepsComponent } from './empresa-steps/empresa-steps.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EmpresaGridComponent },
		{ path: 'steps', component: EmpresaStepsComponent, children: [
			{
				path: '', // Ruta vacía para cargar el primer componente en `EmpresaStepsComponent`
				loadChildren: () =>
					import('./empresa-steps/empresa-steps.module').then(m => m.EmpresaStepsModule),
			}
		]},

		{ path: 'nuevo', component: EmpresaFormComponent },
	])],
	exports: [RouterModule]
})
export class EmpresaRoutingModule { }
