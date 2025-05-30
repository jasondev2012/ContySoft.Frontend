import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { CommonModule } from '@angular/common';
import { InputIconModule } from 'primeng/inputicon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService } from 'src/app/common/services/sesion.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocalFormComponent } from '../local-form/local-form.component';
import { DividerModule } from 'primeng/divider';
import { SelectModule } from 'primeng/select';
import { ShowErrorsDirective } from 'src/app/common/directives/show-errors.directive';
import { EmpresaService } from 'src/app/services/configuracion/empresa.service';
import { PasswordModule } from 'primeng/password';
import { EmpresaRequest } from 'src/app/common/interfaces/configuracion/empresa.interface';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { LoadingService } from 'src/app/common/services/loading.service';
import { InputMaskModule } from 'primeng/inputmask';
const PRIMG_NG = [InputMaskModule, PasswordModule, SelectModule, CardModule, TableModule, ButtonModule, DividerModule, InputTextModule, InputIconModule, IconFieldModule]
@Component({
    selector: 'app-empresa-grid',
    templateUrl: './empresa-grid.component.html',
    styleUrl: './empresa-grid.component.scss',
    standalone: true,
    providers: [DialogService],
    imports: [...PRIMG_NG, ShowErrorsDirective, CommonModule, FormsModule, ReactiveFormsModule]
})
export class EmpresaGridComponent implements OnDestroy, OnInit {
    ref: DynamicDialogRef | undefined;
    globalFilter: string = '';
    nombreEmpresa: string;
    empresaForm: FormGroup;

    get empresa(): EmpresaRequest {
        return this.empresaForm.getRawValue() as EmpresaRequest;
    }
    constructor(
        @Inject(Router) public router: Router,
        sessionService: SessionService,
        private empresaService: EmpresaService,
        private messageService: MessageService,
        @Inject(FormBuilder) private fb: FormBuilder,
        public dialogService: DialogService,
        private loadingService: LoadingService
    ) {
        this.nombreEmpresa = sessionService.getSession().fullname;
        this.empresaForm = this.fb.group({
            id: [0],
            ruc: [{ value: null, disabled: true }],
            razon_social: [{ value: null, disabled: true }],
            usuario_sol: [null, [Validators.required]],
            password_sol: [null, [Validators.required]],
            direccion: [null, [Validators.required]],
            id_distrito: [null, [Validators.required]],
            id_provincia: [null, [Validators.required]],
            id_departamento: [null, [Validators.required]],
            plan: [{ value: null, disabled: true }],
            celular: [null, [Validators.required]],
            correo: [null, [Validators.required]]
        })


    }
    ngOnInit(): void {
        this.obtenerEmpresa();
    }
    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

    onGuardarClick(){
        this.loadingService.show()
        this.empresaService.registrar(this.empresa)
        .pipe(finalize(() => this.loadingService.hide()))
        .subscribe(res => {
            if(res.success){
                this.messageService.add({
                    severity: 'success',
                    summary: 'Ok',
                    detail: res.message,
                });
            }
        })
    }
    obtenerEmpresa(){
        this.empresaService.obtener().subscribe(res => {
            console.log(res)
            if(res){
                this.empresaForm.patchValue(res.data)
            }
        })
    }
    onNuevoClick() {
        this.ref = this.dialogService.open(LocalFormComponent, {
            header: 'Nuevo Local',
            width: '35vw',
            modal: true,
            closable: true,
            contentStyle: { overflow: 'auto' },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            }
        });

        this.ref?.onClose.subscribe((local: any) => {
            if (local) {
            }
        });
    }
}
