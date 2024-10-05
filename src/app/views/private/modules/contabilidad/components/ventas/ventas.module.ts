import { NgModule } from '@angular/core';
import { VentasGridComponent } from './ventas-grid/ventas-grid.component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { VentasRoutingModule } from './ventas-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

const PRIMENG_MODULES = [
    CardModule,
    TableModule,
    InputTextModule,
    ButtonModule
]
@NgModule({
	imports: [
        ...PRIMENG_MODULES,
		CommonModule,
		VentasRoutingModule
	],
	declarations: [VentasGridComponent]
})
export class VentasModule { }
