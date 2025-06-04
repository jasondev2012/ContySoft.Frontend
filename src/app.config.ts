import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { ConfirmationService, MessageService } from 'primeng/api';
import { definePreset } from '@primeng/themes';
import { errorInterceptor } from './app/common/interceptors/error.interceptor';
import { authInterceptor } from './app/common/interceptors/auth.interceptor';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        }
    }
});

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(
            withFetch(),
            withInterceptors([errorInterceptor, authInterceptor])
        ),
        provideAnimationsAsync(),
        providePrimeNG({ 
            translation: {
                accept: "Aceptar",
                reject: "Rechazar",
                emptyMessage: "No se encontraron resultados",
                emptyFilterMessage: "No se encontraron resultados",
                emptySearchMessage: "No se encontraron resultados",
                dateFormat: "dd/mm/yyyy",
                firstDayOfWeek: 1,
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
            },
            theme: { 
                preset: MyPreset, 
                options: { 
                    darkModeSelector: '.app-dark' 
                } 
            } 
        }),
        MessageService,
        ConfirmationService
    ]
};
