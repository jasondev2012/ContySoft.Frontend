import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-retenciones-grid',
    templateUrl: './retenciones-grid.component.html',
    standalone: true,
    imports: [CardModule, TableModule]
})
export class RetencionesGridComponent {

}
