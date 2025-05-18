import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-empresa-form',
    templateUrl: './empresa-form.component.html',
    styleUrl: './empresa-form.component.scss',
    standalone: false
})
export class EmpresaFormComponent {
  empresaForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.empresaForm = this.fb.group({
      id: [0],
      codigo: [{ value: null, disabled: true }],
      ruc: [null],
      razon_social: [{ value: null, disabled: true }],
      departamento: [null],
      provincia: [null],
      distrito: [null],
      ubigeo: [null],
      direccion: [null],
      celuar: [null],
      telefono: [null],
      email: [null],
      plan: [null]
    })
  }
}
