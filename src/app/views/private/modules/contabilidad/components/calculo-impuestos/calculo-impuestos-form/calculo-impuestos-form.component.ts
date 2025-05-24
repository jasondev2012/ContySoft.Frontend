import { Component } from '@angular/core';

@Component({
    selector: 'app-calculo-impuestos-form',
    templateUrl: './calculo-impuestos-form.component.html',
    standalone: false
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
  }
}
