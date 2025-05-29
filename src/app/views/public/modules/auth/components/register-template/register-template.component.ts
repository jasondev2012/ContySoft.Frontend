import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import {
    passwordValidator,
    rucValidator,
} from 'src/app/utils/abstrac-control/validaciones';
import { LoadingService } from 'src/app/common/services/loading.service';
import { ConsultaRucService } from 'src/app/common/http/consulta-ruc.service';
import { RegisterService } from 'src/app/services/auth/register.service';
import { SessionService } from 'src/app/common/services/sesion.service';
import { Inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { NgClass } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
    selector: 'app-register-template',
    templateUrl: './register-template.component.html',
    styleUrl: './register-template.component.scss',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, CardModule, NgClass, PasswordModule, ButtonModule]  
})
export class RegisterTemplateComponent implements OnInit {
    items: MenuItem[] | undefined;
    get formValid(): boolean {
        return this.registroForm.valid;
    }
    public registroForm = new FormGroup({
        ruc: new FormControl('', [
            Validators.required,
            rucValidator(),
            Validators.minLength(11),
            Validators.maxLength(11),
        ]),
        razon_social: new FormControl({ value: '', disabled: true }),
        tipo_persona: new FormControl({ value: '', disabled: true }),
        usuario_sol: new FormControl('', [Validators.required]),
        password_sol: new FormControl('', [Validators.required]),
        usuario: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
            Validators.required,
            passwordValidator(),
        ]),
    });
    constructor(
        public layoutService: LayoutService,
        @Inject(Router) public router: Router,
        public messageService: MessageService,
        public registerService: RegisterService,
        private loadingService: LoadingService,
        private consultaRucService: ConsultaRucService,
        private sessionService: SessionService
    ) {
        this.sessionService.clearSession(); // Limpia la sesión
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Datos Generales',
                routerLink: 'personal',
            },
            {
                label: 'Plan',
                routerLink: 'seat',
            },
            {
                label: 'Pago',
                routerLink: 'payment',
            },
            {
                label: 'Confirmación',
                routerLink: 'confirmation',
            },
        ];
    }
    onRucBlur() {
        // let rucControl = this.registroForm.get('ruc');
        // if (rucControl.valid) {
        //     //this.loadingService.show();
        //     let ruc = rucControl.value;
        //     if (ruc.startsWith('10')) {
        //         this.registroForm.get('tipo_persona').setValue('NATURAL');
        //     } else if (ruc.startsWith('20')) {
        //         this.registroForm.get('tipo_persona').setValue('JURÍDICA');
        //     } else {
        //         this.registroForm.get('tipo_persona').setValue(null);
        //     }
        //     this.consultaRucService
        //         .getDatos(ruc)
        //         .pipe(finalize(() => this.loadingService.hide()))
        //         .subscribe({
        //             next: (res) => {
        //                 this.registroForm
        //                     .get('razon_social')
        //                     .setValue(res.razonSocial);
        //             },
        //             error: (err) => {
        //                 console.log(err);
        //                 this.registroForm
        //                     .get('razon_social')
        //                     .setValue('SIN DOMINIO S.A.C');
        //             },
        //         });
        // }
    }
    onRegistrarClick() {
        console.log("asdasdasd")
        if (this.formValid) {
            this.loadingService.show();
            // const request: RegisterRequest =
            //     this.registroForm.getRawValue() as RegisterRequest;

            // this.registerService
            //     .setRegistro(request)
            //     .pipe(finalize(() => this.loadingService.hide()))
            //     .subscribe({
            //         next: (res) => {
            //             this.sessionService.setSession(res);
            //             this.router.navigate(['/']); // Redirige al home
            //         },
            //         error: (err) => {
            //             console.log(err);
            //         },
            //     });
        } else {
            this.markFormGroupTouched(this.registroForm);
            this.messageService.add({
                severity: 'warn',
                summary: 'Ups!',
                detail: 'Debe ingresar los datos requeridos',
            });
        }
    }
    onIrLoginClick() {
        this.router.navigate(['/auth/login']);
    }
    markFormGroupTouched(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((controlName) => {
            const control = formGroup.get(controlName);
            control?.markAsTouched();
            control?.markAsDirty();
        });
    }
}
