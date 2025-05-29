import { NgModule } from '@angular/core';
import { ComprasGridComponent } from './compras-grid/compras-grid.component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ComprasRoutingModule } from './compras-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
	imports: [
		CommonModule,
        ComprasRoutingModule
	],
	declarations: []
})
export class ComprasModule { }
