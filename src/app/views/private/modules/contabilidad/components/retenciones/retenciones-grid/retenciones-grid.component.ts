import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-retenciones-grid',
    templateUrl: './retenciones-grid.component.html',
    standalone: true,
    imports: [CardModule, TableModule, InputTextModule]
})
export class RetencionesGridComponent {

}
