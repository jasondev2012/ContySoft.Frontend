import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmpresaFormComponent } from '../empresa-form/empresa-form.component';
import { EmpresaPlanesComponent } from '../empresa-planes/empresa-planes.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: '', redirectTo: 'planes', pathMatch: 'full' }, // Redirecciona internamente a 'registro'
			{ path: 'registro', component: EmpresaFormComponent },
			{ path: 'planes', component: EmpresaPlanesComponent },
		]),
    ],
	exports: [RouterModule]
})
export class EmpresaStepsRoutingModule { }
