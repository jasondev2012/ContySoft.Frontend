import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-local-form',
    templateUrl: './local-form.component.html',
    styleUrl: './local-form.component.scss',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, InputTextModule, InputMaskModule, ButtonModule]
})
export class LocalFormComponent {
  localForm: FormGroup;

  constructor(@Inject(FormBuilder) public fb: FormBuilder, public ref: DynamicDialogRef){
    this.localForm = this.fb.group({
      id: [0],
      codigo: [{ value: null, disabled: true }],
      nombre: [null],
      provincia: [null],
      distrito: [null],
      ubigeo: [null],
      direccion: [null],
      celuar: [null],
      serie_factura: [null],
      serie_boleta: [null]
    })
  }
  closeDialog(data: any) {
      this.ref.close(data);
  }
}
