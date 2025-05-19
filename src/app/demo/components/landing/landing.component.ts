import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Inject } from '@angular/core';
import { Divider } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    standalone: true,
    imports: [Divider, StyleClassModule]
})
export class LandingComponent {

    constructor(public layoutService: LayoutService, @Inject(Router) public router: Router) { }
    
}
