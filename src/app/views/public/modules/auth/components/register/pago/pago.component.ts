import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterAppService } from 'src/app/common/services/register-app.service';
import { DatosPago } from 'src/app/interfaces/auth/register.interface';

@Component({
    selector: 'app-pago',
    templateUrl: './pago.component.html',
    styleUrl: './pago.component.scss',
})
export class PagoComponent {
    get formValid(): boolean {
        return this.registroForm.valid;
    }
    public registroForm: FormGroup;
    constructor(private router: Router,
                private fb: FormBuilder,
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
