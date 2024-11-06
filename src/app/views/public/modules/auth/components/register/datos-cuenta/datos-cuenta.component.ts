import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegisterAppService } from 'src/app/common/services/register-app.service';
import { DatosCuenta } from 'src/app/interfaces/auth/register.interface';
import { RegisterService } from 'src/app/services/auth/register.service';
import { passwordValidator } from 'src/app/utils/abstrac-control/validaciones';

@Component({
    selector: 'app-datos-cuenta',
    templateUrl: './datos-cuenta.component.html',
    styleUrl: './datos-cuenta.component.scss',
})
export class DatosCuentaComponent implements OnInit {
    emailValido: boolean = false;
    emailEnUso: boolean = false;
    get formValid(): boolean {
        return this.registroForm.valid;
    }
    public registroForm: FormGroup;
    constructor(private router: Router,
                private fb: FormBuilder,
                public messageService: MessageService,
                private registerService: RegisterService,
                private registerAppService: RegisterAppService) {
        this.registroForm = this.fb.group({
            usuario: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, passwordValidator()]],
        });
    }

    ngOnInit() {
        if(this.registerAppService.informacionRegistro?.cuenta){
            this.registroForm.patchValue(this.registerAppService.informacionRegistro?.cuenta);
        }
    }
    
    nextPage() {
        const cuenta = this.registroForm.getRawValue() as DatosCuenta;
        this.registerAppService.informacionRegistro.cuenta = cuenta;
        this.router.navigate(['auth', 'registro', 'empresa']);
        //this.submitted = true;
    }

    onEmailBlur(){        
        let email = this.registroForm.get('usuario');
        if (email.valid){
            this.registerService.validarEmail(email.value).subscribe({
                next: res => {
                    this.emailValido = res.data;
                    this.emailEnUso = !res.data;
                }
            })
        }
    }
}
