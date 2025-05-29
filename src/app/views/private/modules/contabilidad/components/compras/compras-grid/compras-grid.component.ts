import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-compras-grid',
    templateUrl: './compras-grid.component.html',
    standalone: true,
    imports: [CommonModule, CardModule, TableModule, ButtonModule, InputTextModule, IconFieldModule, InputIconModule, FormsModule, ReactiveFormsModule]
})
export class ComprasGridComponent {
    globalFilter: string = '';

}
