import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { CommonModule } from '@angular/common';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { SessionService } from 'src/app/common/services/sesion.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmpresaFormComponent } from '../empresa-form/empresa-form.component';
import { LocalFormComponent } from '../local-form/local-form.component';

@Component({
    selector: 'app-empresa-grid',
    templateUrl: './empresa-grid.component.html',
    styleUrl: './empresa-grid.component.scss',
    standalone: true,
    providers: [DialogService],
    imports: [CardModule, TableModule, ButtonModule, InputTextModule, InputIconModule, IconFieldModule, CommonModule, FormsModule]
})
export class EmpresaGridComponent implements OnDestroy {
    ref: DynamicDialogRef | undefined;
    globalFilter: string = '';
    nombreEmpresa: string;
    constructor(
        @Inject(Router) public router: Router,
        sessionService: SessionService,
        public dialogService: DialogService
    ) {
        this.nombreEmpresa = sessionService.getSession().fullname;
    }
    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
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
