// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router'; // 👈 Agregado
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MessageService } from 'primeng/api';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        options: {
            darkModeSelector: '.my-app-dark'
        }
      },
    }),
    provideRouter(routes), // 👈 Aquí defines las rutas
    MessageService
  ],
};
