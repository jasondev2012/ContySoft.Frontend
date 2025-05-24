import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs/internal/operators/finalize';
import { ConsultaRucService } from 'src/app/common/http/consulta-ruc.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import { RegisterAppService } from 'src/app/common/services/register-app.service';
import { SessionService } from 'src/app/common/services/sesion.service';
import { DatosEmpresa, RegisterModel } from 'src/app/interfaces/auth/register.interface';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { RegisterService } from 'src/app/services/auth/register.service';
import { rucValidator } from 'src/app/utils/abstrac-control/validaciones';

@Component({
    selector: 'app-datos-empresa',
    templateUrl: './datos-empresa.component.html',
    styleUrl: './datos-empresa.component.scss',
})
export class DatosEmpresaComponent {
    personalInformation: any;

    ruc_en_uso: boolean = false;
    ruc_en_uso_message: string = "";

    get formValid(): boolean {
        return this.registroForm.valid;
    }
    public registroForm: FormGroup;
    constructor(private router: Router,
                public layoutService: LayoutService,
                public messageService: MessageService,
                public registerService: RegisterService,
                private loadingService: LoadingService,
                private consultaRucService: ConsultaRucService,
                private sessionService: SessionService,
                private fb: FormBuilder,
                private registerAppService: RegisterAppService
    ) {
        this.registroForm = this.fb.group({
            ruc: ['', [ Validators.required, rucValidator(), Validators.minLength(11), Validators.maxLength(11)]],
            razon_social: [{ value: '', disabled: true }],
            tipo_persona: [{ value: '', disabled: true }],
            usuario_sol: ['', [Validators.required]],
            password_sol: ['', [Validators.required]]
        })
    }

    ngOnInit() {
        if(this.registerAppService.informacionRegistro?.empresa){
            this.registroForm.patchValue(this.registerAppService.informacionRegistro?.empresa);
        }
        if(!this.registerAppService.informacionRegistro?.cuenta){
          this.router.navigate(['auth', 'registro', 'cuenta']);
          return;
        }
    }


    prevPage() {
        this.router.navigate(['auth', 'registro', 'cuenta']);
    }
    nextPage() {
        const empresa = this.registroForm.getRawValue() as DatosEmpresa;
        this.registerAppService.informacionRegistro.empresa = empresa;
        this.router.navigate(['auth','registro','planes']);
        //this.submitted = true;
    }
    onRegistrarClick() {
        if (this.formValid) {
            // this.loadingService.show();
            // const request: RegisterModel =
            //     this.registroForm.getRawValue() as RegisterModel;

            // this.registerService
            //     .setRegistro(request)
            //     .pipe(finalize(() => this.loadingService.hide()))
            //     .subscribe({
            //         next: (res) => {
            //             this.sessionService.setSession(res);
            //             this.router.navigate(['/']); // Redirige al home
            //         },
            //         error: (err) => {
            //             console.log(err)
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
    markFormGroupTouched(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((controlName) => {
            const control = formGroup.get(controlName);
            control.markAsTouched();
            control.markAsDirty();
        });
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
                .busquedaRuc(ruc)
                .pipe(finalize(() => this.loadingService.hide()))
                .subscribe({
                    next: (res) => {
                        this.ruc_en_uso_message = res.message;
                        this.ruc_en_uso = !res.success;
                        if(res.success){
                            this.registroForm.get('razon_social').setValue(res.data.razonSocial);
                        }else{
                            this.registroForm.get('razon_social').setValue(null);
                        }

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
}
