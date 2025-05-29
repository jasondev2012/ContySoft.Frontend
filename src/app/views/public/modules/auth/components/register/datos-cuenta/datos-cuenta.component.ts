import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RegisterService } from '../../../../../../../services/auth/register.service';
import { RegisterAppService } from '../../../../../../../common/services/register-app.service';
import { DatosCuenta } from '../../../../../../../interfaces/auth/register.interface';
import { passwordValidator } from '../../../../../../../utils/abstrac-control/validaciones';
import { ButtonModule } from 'primeng/button';
import { CommonModule, NgClass } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-datos-cuenta',
    templateUrl: './datos-cuenta.component.html',
    styleUrl: './datos-cuenta.component.scss',
    standalone: true,
    imports: [ReactiveFormsModule, TooltipModule, FormsModule, CardModule, ButtonModule, PasswordModule, NgClass, CommonModule, InputTextModule, IconFieldModule, InputIconModule]  
})
export class DatosCuentaComponent implements OnInit {
    emailValido: boolean = false;
    emailEnUso: boolean = false;
    get formValid(): boolean {
        return this.registroForm.valid;
    }
    public registroForm: FormGroup;
    constructor(@Inject(Router) public router: Router,
                @Inject(FormBuilder) public fb: FormBuilder,
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
        if (email?.valid){
            this.registerService.validarEmail(email?.value).subscribe({
                next: (res:any) => {
                    this.emailValido = res.data;
                    this.emailEnUso = !res.data;
                }
            })
        }
    }
}
