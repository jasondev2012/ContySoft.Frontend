import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmacenRoutingModule } from './almacen-routing.module';
import { CardModule } from 'primeng/card';
import { AlmacenGridComponent } from './almacen-grid/almacen-grid.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { AlmacenFormComponent } from './almacen-form/almacen-form.component';
import { ShowErrorsDirective } from 'src/app/common/directives/show-errors.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { DirectiveModule } from 'src/app/common/directives/directive.module';

const PRIME_NG = [ 
  CardModule,
  TableModule,
  ButtonModule,
  InputTextModule,
  DynamicDialogModule,
  InputTextareaModule,
  DropdownModule,
  CheckboxModule,
  TagModule,
  SkeletonModule
]

@NgModule({
  declarations: [AlmacenGridComponent, AlmacenFormComponent ],
  imports: [
    CommonModule,
    AlmacenRoutingModule,
    ReactiveFormsModule,
    DirectiveModule,
    ...PRIME_NG
  ],
  providers: [DialogService]
})
export class AlmacenModule { }
