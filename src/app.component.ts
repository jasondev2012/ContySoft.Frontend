import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinner } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { LoadingService } from './app/common/services/loading.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, ToastModule, ProgressSpinner, CommonModule],
    template: `<div class="spinner-container" *ngIf="isLoading$ | async">
            <p-progress-spinner ariaLabel="loading"/>
        </div>
        <p-toast></p-toast>
        <router-outlet></router-outlet>`
})
export class AppComponent {
    isLoading$; // Nos suscribimos al observable del servicio
    constructor(private loaderService: LoadingService){
        this.isLoading$ = this.loaderService.loading$
    }
}
