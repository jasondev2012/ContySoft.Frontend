import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalculoImpuestosFormComponent } from './calculo-impuestos-form/calculo-impuestos-form.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CalculoImpuestosFormComponent }
	])],
	exports: [RouterModule]
})
export class CalculoImpuestosRoutingModule { }
