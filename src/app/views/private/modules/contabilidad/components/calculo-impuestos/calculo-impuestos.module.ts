import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalculoImpuestosFormComponent } from './calculo-impuestos-form/calculo-impuestos-form.component';
import { CalculoImpuestosRoutingModule } from './calculo-impuestos-routing.module';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from "primeng/dropdown";
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

const PRIMENG_MODULES = [
    CardModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    DropdownModule,
    PanelModule,
    InputNumberModule,
    FormsModule
]
@NgModule({
	imports: [
        ...PRIMENG_MODULES,
		CommonModule,
        CalculoImpuestosRoutingModule
	],
	declarations: [CalculoImpuestosFormComponent]
})
export class CalculoImpuestosModule { }
