import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-empresa-planes',
    templateUrl: './empresa-planes.component.html',
    styleUrl: './empresa-planes.component.scss',
    standalone: true,
    imports: [CardModule, ButtonModule]
})
export class EmpresaPlanesComponent {

}
