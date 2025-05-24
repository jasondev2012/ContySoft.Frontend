import { NgModule } from '@angular/core';
import { LiquidacionesGridComponent } from './liquidaciones-grid/liquidaciones-grid.component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { LiquidacionesRoutingModule } from './liquidaciones-routing.module';
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
        LiquidacionesRoutingModule
	],
	declarations: [LiquidacionesGridComponent]
})
export class LiquidacionesModule { }
