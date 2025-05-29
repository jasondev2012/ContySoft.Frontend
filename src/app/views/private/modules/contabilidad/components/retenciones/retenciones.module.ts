import { NgModule } from '@angular/core';
import { RetencionesGridComponent } from './retenciones-grid/retenciones-grid.component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { RetencionesRoutingModule } from './retenciones-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
	imports: [
		CommonModule,
        RetencionesRoutingModule
	],
	declarations: []
})
export class RetencionesModule { }
