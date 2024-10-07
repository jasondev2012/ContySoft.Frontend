import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LoadingService } from './common/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    
    isLoading$ = this.loaderService.loading$; // Nos suscribimos al observable del servicio
    constructor(private primengConfig: PrimeNGConfig, private loaderService: LoadingService) {
        this.primengConfig.ripple = true;
    }

    ngOnInit() {
    }

}
