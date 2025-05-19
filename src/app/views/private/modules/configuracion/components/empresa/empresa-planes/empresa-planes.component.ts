import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-empresa-planes',
    templateUrl: './empresa-planes.component.html',
    styleUrl: './empresa-planes.component.scss',
    standalone: true,
    imports: [CardModule]
})
export class EmpresaPlanesComponent {

}
