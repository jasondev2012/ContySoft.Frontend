import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RegisterAppService } from '../../../../../../../common/services/register-app.service';
import { DatosPago } from '../../../../../../../interfaces/auth/register.interface';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-pago',
    templateUrl: './pago.component.html',
    styleUrl: './pago.component.scss',
    standalone: true,
    imports: [CommonModule, CardModule, FormsModule, ReactiveFormsModule, ButtonModule, InputMaskModule, InputTextModule]  
})
export class PagoComponent {
    get formValid(): boolean {
        return this.registroForm.valid;
    }
    public registroForm: FormGroup;
    constructor(@Inject(Router) public router: Router,
                @Inject(FormBuilder) public fb: FormBuilder,
                private registerAppService: RegisterAppService) {
        this.registroForm = this.fb.group({
            nombre_titular: ['JASON GUTIERREZ', [ Validators.required]],
            correo_titular: ['jason.gutierrez.dev@gmail.com', [ Validators.required]],
            numero_tarjeta: ['1231-2312-3123-1231', [ Validators.required]],
            fecha_vencimiento: ['11/35', [Validators.required]],
            cvv: ['', [Validators.required]]
        })
    }

    ngOnInit() {
        if(this.registerAppService.informacionRegistro?.pago){
            this.registroForm.patchValue(this.registerAppService.informacionRegistro?.pago);
        }
        if(!this.registerAppService.informacionRegistro?.cuenta){
          this.router.navigate(['auth', 'registro', 'cuenta']);
          return;
        }
        if(!this.registerAppService.informacionRegistro?.empresa){
          this.router.navigate(['auth', 'registro', 'empresa']);
          return;
        }
        if(!this.registerAppService.informacionRegistro?.plan){
          this.router.navigate(['auth', 'registro', 'planes']);
          return;
        }
    }

    nextPage() {
        const pago = this.registroForm.getRawValue() as DatosPago;
        this.registerAppService.informacionRegistro.pago = pago;
        this.router.navigate(['auth', 'registro', 'confirmacion']);
    }

    prevPage() {
        this.router.navigate(['auth', 'registro', 'planes']);
    }
}
