import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-calculo-impuestos-form',
    templateUrl: './calculo-impuestos-form.component.html',
    standalone: true,
    imports: [CardModule, TableModule, FormsModule, DividerModule, DropdownModule, PanelModule, InputNumberModule, ButtonModule, CommonModule]
})
export class CalculoImpuestosFormComponent {
  mensajeError: string = '';
  rucInvalido: boolean = true;
  numeroRuc: string = '';
  constructor(){

  }
  onBusquedaRucClick(){
    console.log(this.numeroRuc)
  }
  validarRuc() {
    if (!this.numeroRuc) return null;
    const regex = /^(10|20)\d{9}$/;
    if (!regex.test(this.numeroRuc)) {
      this.mensajeError = 'RUC inválido.';
      this.rucInvalido = true;
    }else{
      this.mensajeError = '';
      this.rucInvalido = false;
    }
    return true;
  }
}
