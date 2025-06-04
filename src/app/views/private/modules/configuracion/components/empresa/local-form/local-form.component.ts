import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { Inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShowErrorsDirective } from 'src/app/common/directives/show-errors.directive';
import { CustomValidators } from 'src/app/common/validators/custom-validators';
import { IEmpresaLocalModel, IEmpresaLocalRequest } from 'src/app/common/interfaces/configuracion/local.interface';
import { EmpresaService } from 'src/app/services/configuracion/empresa.service';
import { finalize } from 'rxjs/internal/operators/finalize';
import { ICustomDataResponse } from 'src/app/common/interfaces/custom-response.interface';
import { ICatalogoGenerico } from 'src/app/interfaces/catalogo/catalogo.interface';
import { SelectModule } from 'primeng/select';
const PRIME_NG = [SelectModule, CardModule, InputTextModule, InputMaskModule, ButtonModule];
@Component({
    selector: 'app-local-form',
    templateUrl: './local-form.component.html',
    styleUrl: './local-form.component.scss',
    standalone: true,
    imports: [ShowErrorsDirective, FormsModule, ReactiveFormsModule, ...PRIME_NG]
})
export class LocalFormComponent implements OnInit {
    localForm: FormGroup;
    loading: boolean;
    id_local: number;
    estatus: ICatalogoGenerico[];
    get formValid(): boolean {
        return this.localForm.valid;
    }
    get local(): IEmpresaLocalModel {
        return this.localForm.getRawValue() as IEmpresaLocalModel;
    }
    constructor(
        @Inject(FormBuilder) public fb: FormBuilder,
        public ref: DynamicDialogRef,
        public dialogService: DialogService,
        private empresaService: EmpresaService,
        private messageService: MessageService
    ) {
        this.estatus = [{ id: 1, valorBool: true, nombre: 'Activo', codigo: '' }, { id: 1, valorBool: false, nombre: 'Eliminado', codigo: '' }]
        this.loading = false;
        this.localForm = this.fb.group({
            id: [0],
            codigo: [{ value: null, disabled: true }],
            nombre: [null, [Validators.required]],
            direccion: [null, [Validators.required]],
            celular: [null, [Validators.required]],
            serie_factura: [null, [Validators.required, CustomValidators.serieFacturaBoletaFormat()]],
            serie_boleta: [null, [Validators.required, CustomValidators.serieFacturaBoletaFormat()]],
            activo: [true]
        });
        const { id } = this.dialogService.getInstance(this.ref).data;
        this.id_local = id;
    }
    ngOnInit(): void {
        if (this.id_local > 0) {
            this.empresaService.obtenerLocal(this.id_local).subscribe({
                next: (res) => {
                    if (res && res.data) {
                        this.localForm.patchValue(res.data)
                        const numero_factura = res.data.numero_factura.toString().padStart(10, '0');
                        const serie_factura = `${res.data.serie_factura}-${numero_factura}`;
                        
                        const numero_boleta = res.data.numero_boleta.toString().padStart(10, '0');
                        const serie_boleta = `${res.data.serie_boleta}-${numero_boleta}`;

                        this.localForm.get('serie_factura')?.setValue(serie_factura)
                        this.localForm.get('serie_boleta')?.setValue(serie_boleta)
                    }
                }
            });
        }
    }
    onGuardarClick() {
        this.loading = true;
        this.empresaService
            .registrarLocal(this.local)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe((res) => {
                if (res.success) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Ok',
                        detail: res.message
                    });
                    this.closeDialog(res);
                }
            });
    }
    closeDialog(data: any) {
        this.ref.close(data);
    }
}
