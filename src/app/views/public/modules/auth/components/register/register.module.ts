import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepsModule } from 'primeng/steps';
import { RouterModule } from '@angular/router';
import { RegisterRoutingModule } from './register-routing.module';
import { DatosEmpresaComponent } from './datos-empresa/datos-empresa.component';
import { PlanesComponent } from './planes/planes.component';
import { PagoComponent } from './pago/pago.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { DatosCuentaComponent } from './datos-cuenta/datos-cuenta.component';

const PRIMENG_MODULES = [
    CardModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    DropdownModule,
    PanelModule,
    InputNumberModule,
    StepsModule,
    InputMaskModule,
    PasswordModule 
];
@NgModule({
    imports: [...PRIMENG_MODULES, FormsModule, CommonModule, RegisterRoutingModule, ReactiveFormsModule],
    declarations: [DatosEmpresaComponent, DatosCuentaComponent, PlanesComponent, PagoComponent, ConfirmacionComponent],
    exports: [RouterModule]
})
export class RegisterModule {}
