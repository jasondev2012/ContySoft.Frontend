import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { CustomMessageService } from 'src/app/common/services/custom-message.service';
import { ICatalogoResponse } from 'src/app/services/catalogo/interfaces/catalogo.interface';
import { AlmacenService } from 'src/app/services/inventario/almacen.service';
import { IAlmacenRequest } from 'src/app/services/inventario/interfaces/almacen.interface';


@Component({
  selector: 'app-almacen-form',
  templateUrl: './almacen-form.component.html',
  styleUrl: './almacen-form.component.scss'
})
export class AlmacenFormComponent implements OnInit {
  frmAlmacen: FormGroup;
  empresas: ICatalogoResponse[] = [];
  loading: boolean = false;
  id_almacen: number = 0;
  get frmValido(){
    return this.frmAlmacen.valid;
  }
  get almacen(): IAlmacenRequest{
    return this.frmAlmacen.getRawValue() as IAlmacenRequest;
  }
  constructor(private fb: FormBuilder, 
              public ref: DynamicDialogRef, 
              private cd: ChangeDetectorRef,
              private messageService: CustomMessageService,
              public config: DynamicDialogConfig,
              private almacenService: AlmacenService){
    this.frmAlmacen = this.fb.group({
      id: [0],      
      id_empresa: [null, [Validators.required]],
      codigo: [{ value: null, disabled: true }],
      nombre: [null, [Validators.required, Validators.maxLength(50)]],
      direccion: [null],
      descripcion: [null],
      activo: [true]
    })
    this.empresas = this.config.data?.empresas || [];
    this.id_almacen = this.config.data?.id || 0;
  }
  ngOnInit(): void {
    this.frmAlmacen.get('id').setValue(this.id_almacen);
    if(this.id_almacen && this.id_almacen > 0){
      this.almacenService.get(this.id_almacen).subscribe({
        next: res => {
          console.log()
          this.frmAlmacen.patchValue(res)
          this.frmAlmacen.get("id_empresa").disable();
        }
      })
    }

  }
  getNuevoCodigo(event: any){
    this.almacenService.getNuevoCodigo(event.value).subscribe({
      next: res => {
        this.frmAlmacen.get('codigo').setValue(res.data);
      }
    })
  }
  save(){
    if(!this.frmAlmacen.valid){
      this.messageService.showWarn('Debe completar los campos obligatorios');
    }
    this.loading = true;
    this.almacenService.set(this.almacen)
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: res => {
        this.messageService.showMessage(res);
        if(res.success){
          this.ref.close();
        }
      }
    })
  }
}
