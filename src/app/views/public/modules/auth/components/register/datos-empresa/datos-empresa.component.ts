import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ConsultaRucService } from '../../../../../../../common/http/consulta-ruc.service';
import { LoadingService } from '../../../../../../../common/services/loading.service';
import { RegisterAppService } from '../../../../../../../common/services/register-app.service';
import { SessionService } from '../../../../../../../common/services/sesion.service';
import { DatosEmpresa } from '../../../../../../../interfaces/auth/register.interface';
import { LayoutService } from '../../../../../../../layout/service/layout.service';
import { RegisterService } from '../../../../../../../services/auth/register.service';
import { rucValidator } from '../../../../../../../utils/abstrac-control/validaciones';

@Component({
    selector: 'app-datos-empresa',
    templateUrl: './datos-empresa.component.html',
    styleUrl: './datos-empresa.component.scss',
    standalone: true,
    imports: [    
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
        PasswordModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule]
})
export class DatosEmpresaComponent {
    personalInformation: any;

    ruc_en_uso: boolean = false;
    ruc_en_uso_message: string = "";

    get formValid(): boolean {
        return this.registroForm.valid;
    }
    public registroForm: FormGroup;
    constructor(@Inject(Router) public router: Router,
                public layoutService: LayoutService,
                public messageService: MessageService,
                public registerService: RegisterService,
                private loadingService: LoadingService,
                private consultaRucService: ConsultaRucService,
                private sessionService: SessionService,
                @Inject(FormBuilder) public fb: FormBuilder,
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
            control?.markAsTouched();
            control?.markAsDirty();
        });
    }
    onRucBlur() {
        let rucControl = this.registroForm.get('ruc');
        if (rucControl?.valid) {
            //this.loadingService.show();
            let ruc = rucControl?.value;
            if (ruc.startsWith('10')) {
                this.registroForm.get('tipo_persona')?.setValue('NATURAL');
            } else if (ruc.startsWith('20')) {
                this.registroForm.get('tipo_persona')?.setValue('JURÍDICA');
            } else {
                this.registroForm.get('tipo_persona')?.setValue(null);
            }
            this.consultaRucService
                .busquedaRuc(ruc)
                .pipe(finalize(() => this.loadingService.hide()))
                .subscribe({
                    next: (res: any) => {
                        this.ruc_en_uso_message = res.message;
                        this.ruc_en_uso = !res.success;
                        if(res.success){
                            this.registroForm.get('razon_social')?.setValue(res.data.razonSocial);
                        }else{
                            this.registroForm.get('razon_social')?.setValue(null);
                        }

                    },
                    error: (err: any) => {
                        console.log(err);
                        this.registroForm
                            .get('razon_social')
                            ?.setValue('SIN DOMINIO S.A.C');
                    },
                });
        }
    }
}
