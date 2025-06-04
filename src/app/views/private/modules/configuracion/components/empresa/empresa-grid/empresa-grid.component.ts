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
import { finalize } from 'rxjs';
import { LoadingService } from 'src/app/common/services/loading.service';
import { InputMaskModule } from 'primeng/inputmask';
import { CatalogoService } from 'src/app/services/catalogo/catalogo.service';
import { ICatalogoGenerico } from 'src/app/interfaces/catalogo/catalogo.interface';
import { TipoCatalogo } from 'src/app/common/enums/tipo_catalogo.enum';
import { IEmpresaLocalList } from 'src/app/common/interfaces/configuracion/local.interface';
import { BadgeModule } from 'primeng/badge';
import { ICustomResponse } from 'src/app/common/interfaces/custom-response.interface';
import { CustomMessageService } from 'src/app/common/services/custom-message.service';
const PRIMG_NG = [BadgeModule, InputMaskModule, PasswordModule, SelectModule, CardModule, TableModule, ButtonModule, DividerModule, InputTextModule, InputIconModule, IconFieldModule];
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
    departamentos: ICatalogoGenerico[];
    provincias: ICatalogoGenerico[];
    distritos: ICatalogoGenerico[];
    locales: IEmpresaLocalList[];
    get empresa(): EmpresaRequest {
        return this.empresaForm.getRawValue() as EmpresaRequest;
    }
    constructor(
        @Inject(Router) public router: Router,
        sessionService: SessionService,
        private empresaService: EmpresaService,
        private customMessageService: CustomMessageService,
        @Inject(FormBuilder) private fb: FormBuilder,
        public dialogService: DialogService,
        private loadingService: LoadingService,
        private catalogoService: CatalogoService
    ) {
        this.departamentos = [];
        this.provincias = [];
        this.distritos = [];
        this.locales = [];
        this.nombreEmpresa = sessionService.getSession().fullname;
        this.empresaForm = this.fb.group({
            id: [0],
            ruc: [{ value: null, disabled: true }],
            razon_social: [{ value: null, disabled: true }],
            usuario_sol: [null, [Validators.required]],
            password_sol: [null, [Validators.required]],
            direccion: [null, [Validators.required]],
            cod_distrito: [null, [Validators.required]],
            cod_provincia: [null, [Validators.required]],
            cod_departamento: [null, [Validators.required]],
            plan: [{ value: null, disabled: true }],
            celular: [null, [Validators.required]],
            correo: [null, [Validators.required]]
        });
    }
    ngOnInit(): void {
        this.obtenerEmpresa();
        this.obtenerCatalogosIniciales();
    }
    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

    onGuardarClick() {
        this.loadingService.show();
        this.empresaService
            .registrar(this.empresa)
            .pipe(finalize(() => this.loadingService.hide()))
            .subscribe((res) => {
                if (res.success) {
                    this.customMessageService.showSuccess(res.message);
                }
            });
    }
    onNuevoClick() {
        this.abrirModal()
    }
    onEditClick(id_local: number){
        this.abrirModal(id_local)
    }
    onDepartamentoChange(event: any) {        
        this.provincias = [];
        this.distritos = [];
        if (event && event.value) {
            this.catalogoService.obtener(TipoCatalogo.PROVINCIAS, event.value).subscribe({
                next: (res) => {
                    if (res.success) {
                        this.provincias = res.data;
                    }
                }
            });
        }
    }
    onProvinciaChange(event: any) {
        if (event && event.value) {
            this.catalogoService.obtener(TipoCatalogo.DISTRITOS, event.value).subscribe({
                next: (res) => {
                    if (res.success) {
                        this.distritos = res.data;
                    }
                }
            });
        } else {
            this.distritos = [];
        }
    }
    abrirModal(id_local: number = 0){
        this.ref = this.dialogService.open(LocalFormComponent, {
            header: id_local > 0 ? 'Editar Local' : 'Nuevo Local',
            width: '35vw',
            modal: true,
            closable: true,
            data: {
                id: id_local
            },
            contentStyle: { overflow: 'auto' },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            }
        });

        this.ref?.onClose.subscribe((res: ICustomResponse) => {
            if(res && res.success){
                this.listarLocales();
            }
        });
    }
    obtenerEmpresa() {
        this.empresaService.obtener().subscribe((res) => {
            if (res) {
                this.empresaForm.patchValue(res.data);
                if(res.data.cod_departamento){
                    this.onDepartamentoChange({ value: res.data.cod_departamento })
                }
                if(res.data.cod_provincia){
                    this.onProvinciaChange({ value: res.data.cod_provincia })
                }
                this.listarLocales();
            }
        });
    }
    listarLocales(){
        this.empresaService.listarLocales().subscribe((res) => {
            if (res) {
                if(res.data){
                    this.locales = res.data
                }
            }
        });
    }
    obtenerCatalogosIniciales() {
        this.catalogoService.obtener(TipoCatalogo.DEPARTAMENTOS).subscribe({
            next: (res) => {
                if (res.success) {
                    this.departamentos = res.data;
                }
            }
        });
    }
}
