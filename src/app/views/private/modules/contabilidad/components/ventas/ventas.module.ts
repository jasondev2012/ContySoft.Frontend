import { NgModule } from '@angular/core';
import { VentasGridComponent } from './ventas-grid/ventas-grid.component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { VentasRoutingModule } from './ventas-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
	imports: [
		CommonModule,
		VentasRoutingModule
	],
	declarations: []
})
export class VentasModule { }
