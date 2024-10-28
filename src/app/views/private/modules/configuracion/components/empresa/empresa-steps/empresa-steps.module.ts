import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepsModule } from 'primeng/steps';
import { EmpresaFormComponent } from '../empresa-form/empresa-form.component';
import { EmpresaStepsRoutingModule } from './empresa-steps-routing.module';
import { RouterModule } from '@angular/router';
import { EmpresaPlanesComponent } from '../empresa-planes/empresa-planes.component';

const PRIMENG_MODULES = [
    CardModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    DropdownModule,
    PanelModule,
    InputNumberModule,
    StepsModule
];
@NgModule({
    imports: [...PRIMENG_MODULES, FormsModule, CommonModule, EmpresaStepsRoutingModule, ReactiveFormsModule],
    declarations: [EmpresaFormComponent, EmpresaPlanesComponent],
    exports: [RouterModule]
})
export class EmpresaStepsModule {}
