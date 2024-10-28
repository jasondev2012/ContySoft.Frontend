import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
    passwordValidator,
    rucValidator,
} from 'src/app/utils/abstrac-control/validaciones';
import { LoadingService } from 'src/app/common/loading.service';
import { ConsultaRucService } from 'src/app/common/http/consulta-ruc.service';
import { finalize } from 'rxjs';
import { RegisterService } from 'src/app/services/auth/register.service';
import { RegisterRequest } from 'src/app/interfaces/auth/register.interface';
import { SessionService } from 'src/app/common/sesion.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent {
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
        public router: Router,
        public messageService: MessageService,
        public registerService: RegisterService,
        private loadingService: LoadingService,
        private consultaRucService: ConsultaRucService,
        private sessionService: SessionService
    ) {
        this.sessionService.clearSession(); // Limpia la sesión
    }
    onRucBlur() {
        let rucControl = this.registroForm.get('ruc');
        if (rucControl.valid) {
            //this.loadingService.show();
            let ruc = rucControl.value;
            if (ruc.startsWith('10')) {
                this.registroForm.get('tipo_persona').setValue('NATURAL');
            } else if (ruc.startsWith('20')) {
                this.registroForm.get('tipo_persona').setValue('JURÍDICA');
            } else {
                this.registroForm.get('tipo_persona').setValue(null);
            }
            this.consultaRucService
                .getDatos(ruc)
                .pipe(finalize(() => this.loadingService.hide()))
                .subscribe({
                    next: (res) => {
                        this.registroForm
                            .get('razon_social')
                            .setValue(res.razonSocial);
                    },
                    error: (err) => {
                        console.log(err);
                        this.registroForm
                            .get('razon_social')
                            .setValue('SIN DOMINIO S.A.C');
                    },
                });
        }
    }
    onRegistrarClick() {
        if (this.formValid) {
            this.loadingService.show();
            const request: RegisterRequest =
                this.registroForm.getRawValue() as RegisterRequest;

            this.registerService
                .setRegistro(request)
                .pipe(finalize(() => this.loadingService.hide()))
                .subscribe({
                    next: (res) => {
                        this.sessionService.setSession(res);
                        this.router.navigate(['/']); // Redirige al home
                    },
                    error: (err) => {
                        console.log(err)
                    },
                });
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
            control.markAsTouched();
            control.markAsDirty();
        });
    }
}
