import { NgModule } from '@angular/core';
import { ComprasGridComponent } from './compras-grid/compras-grid.component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ComprasRoutingModule } from './compras-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

const PRIMENG_MODULES = [
    CardModule,
    TableModule,
    InputTextModule,
    ButtonModule,
]
@NgModule({
	imports: [
        ...PRIMENG_MODULES,
		CommonModule,
        ComprasRoutingModule
	],
	declarations: [ComprasGridComponent]
})
export class ComprasModule { }
