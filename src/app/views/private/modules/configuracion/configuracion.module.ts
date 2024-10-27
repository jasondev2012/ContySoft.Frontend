import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { CardModule } from 'primeng/card';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DatosPersonalesComponent,
    ConfiguracionRoutingModule
  ]
})
export class ConfiguracionModule { }
