import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuntoDeVentaRoutingModule } from './punto-de-venta-routing.module';
import { CardModule } from 'primeng/card';

const PRIME_NG = [
  CardModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PuntoDeVentaRoutingModule,
    ...PRIME_NG
  ]
})
export class PuntoDeVentaModule { }
