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
import { EmpresaGridComponent } from './empresa-grid/empresa-grid.component';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { StepsModule } from 'primeng/steps';
import { EmpresaStepsComponent } from './empresa-steps/empresa-steps.component';
import { EmpresaStepsModule } from './empresa-steps/empresa-steps.module';
import { CheckboxModule } from 'primeng/checkbox';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { ShowErrorsDirective } from 'src/app/common/directives/show-errors.directive';
import { DirectiveModule } from 'src/app/common/directives/directive.module';

const PRIMENG_MODULES = [
    CardModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    DropdownModule,
    PanelModule,
    InputNumberModule,
    StepsModule,    
    DynamicDialogModule,
    InputTextareaModule,
    CheckboxModule,
    TagModule,
    SkeletonModule,
    DirectiveModule
];
@NgModule({
    imports: [...PRIMENG_MODULES, FormsModule, CommonModule, EmpresaRoutingModule, ReactiveFormsModule, EmpresaStepsModule],
    declarations: [EmpresaGridComponent, EmpresaStepsComponent, EmpresaFormComponent],
})
export class EmpresaModule {}
