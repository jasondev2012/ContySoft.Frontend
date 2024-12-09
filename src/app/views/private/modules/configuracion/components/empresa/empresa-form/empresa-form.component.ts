import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { finalize, forkJoin } from 'rxjs';
import { Catalogo } from 'src/app/common/constants/catalogo.constant';
import { CustomMessageService } from 'src/app/common/services/custom-message.service';
import { CatalogoService } from 'src/app/services/catalogo/catalogo.service';
import { ICatalogoResponse } from 'src/app/services/catalogo/interfaces/catalogo.interface';
import { EmpresaService } from 'src/app/services/configuracion/empresa.services';
import { IEmpresaRequest } from 'src/app/services/configuracion/interfaces/empresa.interface';

@Component({
    selector: 'app-empresa-form',
    templateUrl: './empresa-form.component.html',
    styleUrl: './empresa-form.component.scss',
})
export class EmpresaFormComponent implements OnInit {
    id: number | null = null;
    empresaForm: FormGroup;
    loading: boolean = false;
    title: string = 'Nueva Empresa';
    departamentos: ICatalogoResponse[] = [];
    provincias: ICatalogoResponse[] = [];
    distritos: ICatalogoResponse[] = [];
    ciiu: ICatalogoResponse[] = [];
    get frmValido() {
        return this.empresaForm.valid;
    }
    get empresa(): IEmpresaRequest{
        return this.empresaForm.getRawValue() as IEmpresaRequest;
    }
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: CustomMessageService,
        private empresaService: EmpresaService,
        private catalogoService: CatalogoService
    ) {
        this.empresaForm = this.fb.group({
            id: [0],
            codigo: [{ value: null, disabled: true }],
            nombre: [null, [Validators.required]],
            razon_social: [null, [Validators.required]],
            direccion: [null, [Validators.required]],
            representante_legal: [null, [Validators.required]],
            ruc: [null, [Validators.required]],
            tipo_empresa: [null, [Validators.required]],
            celular: [null, [Validators.required]],
            telefono: [null],
            email: [null],
            codigo_departamento: [null, [Validators.required]],
            codigo_provincia: [null, [Validators.required]],
            codigo_distrito: [null, [Validators.required]],
            ciiu: [null, [Validators.required]],
            es_principal: [false],
            activo: [true],
        });
    }
    ngOnInit(): void {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.empresaForm.get('id').setValue(this.id > 0 ? this.id : 0);
        forkJoin({
            departamentos: this.catalogoService.get(Catalogo.Departamento),
            ciiu: this.catalogoService.get(Catalogo.Ciiu),
            codigo: this.empresaService.getNuevoCodigo()
        }).subscribe((data) => {
            this.departamentos = data.departamentos;
            this.ciiu = data.ciiu;
            if(this.id > 0){
                this.empresaService.get(this.id).subscribe({
                    next: res => {
                        this.empresaForm.patchValue(res);
                        if(res.codigo_departamento){
                            this.getProvincias({ value: res.codigo_departamento });
                        }
                        if(res.codigo_provincia){
                            this.getDistritos({ value: res.codigo_provincia });
                        }
                    }
                })
            }else{
                this.empresaForm.get('codigo').setValue(data.codigo.data);
            }
            
        });
    }
    save() {
        if(!this.frmValido){
          this.messageService.showWarn('Debe completar los campos obligatorios');
        }
        this.loading = true;
        this.empresaService.set(this.empresa)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: res => {
            this.messageService.showMessage(res);
            if(res.success){
                this.back();
            }
          }
        })
    }
    back() {
        this.router.navigate(['configuracion', 'empresa']);
    }
    getProvincias(event: any) {
        console.log(event);
        this.catalogoService.get(Catalogo.Provincia, event.value).subscribe({
            next: (res) => {
                this.provincias = res;
            },
        });
    }
    getDistritos(event: any) {
        this.catalogoService.get(Catalogo.Distrito, event.value).subscribe({
            next: (res) => {
                this.distritos = res;
            },
        });
    }
}
