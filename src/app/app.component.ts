import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LoadingService } from './common/services/loading.service';
import { SessionService } from './common/services/sesion.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false
})
export class AppComponent implements OnInit {
    isLoading$ = this.loaderService.loading$; // Nos suscribimos al observable del servicio
    constructor(
        private primengConfig: PrimeNGConfig,
        private loaderService: LoadingService,
        private sessionService: SessionService
    ) {
        this.primengConfig.ripple = true;
    }

    ngOnInit() {
        //this.sessionService.startSessionTimer();

        // this.sessionService.onWarningTriggered().subscribe(() => {
        //     this.showSessionWarning();
        // });

        // this.sessionService.onSessionExpired().subscribe(() => {
        //     this.sessionService.endSession();
        // });
    }
    onKeepSession() {
        this.sessionService.resetSession();
    }

    onEndSession() {
        this.sessionService.endSession();
    }
    showSessionWarning() {
        const warningTime = 300; // 30 segundos para el aviso
        let timerInterval: any;
        Swal.fire({
            title: 'Advertencia',
            html: `Su sesión está a punto de vencer. ¿Desea mantener la sesión activa?<br><strong>Tiempo restante: <b>${warningTime}</b> segundos</strong>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Mantener Sesión',
            cancelButtonText: 'Cerrar Sesión',
            timer: warningTime * 1000,  // 30 segundos en milisegundos
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: () => {
              const content = Swal.getHtmlContainer();
              if (content) {
                const timerEl = content.querySelector('b');  // Selecciona el elemento <b> para el contador
                timerInterval = setInterval(() => {
                  if (timerEl) {
                    timerEl.textContent = String(Math.floor(Swal.getTimerLeft()! / 1000));  // Actualiza el contador
                  }
                }, 1000);
              }
            },
            willClose: () => {
              clearInterval(timerInterval);  // Limpiar el intervalo
            }
          }).then((result) => {
            if (result.isConfirmed) {
              // Si el usuario elige mantener la sesión, reiniciamos la sesión
              this.sessionService.resetSession();
            } else if (result.dismiss === Swal.DismissReason.timer || result.dismiss === Swal.DismissReason.cancel) {
              // Si el tiempo se agota o elige cerrar sesión, cerrar la sesión
              this.sessionService.endSession();
            }
          });

    }
}
