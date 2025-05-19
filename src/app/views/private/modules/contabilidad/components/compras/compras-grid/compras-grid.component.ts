import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-compras-grid',
    templateUrl: './compras-grid.component.html',
    standalone: true,
    imports: [CardModule, TableModule]
})
export class ComprasGridComponent {

}
