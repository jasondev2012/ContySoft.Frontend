import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { LoadingService } from 'src/app/common/loading.service';
import { SessionService } from 'src/app/common/sesion.service';
import { VentasService } from 'src/app/services/ventas/ventas.service';

@Component({
    selector: 'app-ventas-grid',
    templateUrl: './ventas-grid.component.html',
})
export class VentasGridComponent {
    @ViewChild('fileInput') fileInput!: ElementRef;
    constructor(private ventasService: VentasService,
                private loadinService: LoadingService,
                private messageService: MessageService,
                private sessionService: SessionService
    ) {}

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input?.files?.length) {
            const file: File = input.files[0];

            // Verificamos si el archivo es de tipo .txt
            if (file.type === 'text/plain') {

                this.loadinService.show()
                // Llamamos al servicio para enviar el archivo

                this.ventasService.importarVentas(file, this.sessionService.getSession().token)
                .pipe(finalize(() => this.loadinService.hide()))
                .subscribe({
                    next: (response) => {
                      this.messageService.add({
                          severity: 'success',
                          summary: 'Ok!',
                          detail: response.message,
                      });
                        this.limpiarCampoArchivo();  // Limpiamos el campo de archivo
                        // Aquí puedes manejar la respuesta como desees
                    },
                    error: (err) => {
                      console.log(err.error)
                      this.messageService.add({
                          severity: 'error',
                          summary: 'Error',
                          detail: err.error.message
                      });
                        this.limpiarCampoArchivo();  // Limpiamos el campo si el archivo no es .txt
                    },
                });
                
            } else {
              this.messageService.add({
                  severity: 'warn',
                  summary: 'Ups!',
                  detail: 'Solo se permiten archivos .txt'
              });
            }
        }
    }
    // Método para limpiar el input file
    limpiarCampoArchivo(): void {
      this.fileInput.nativeElement.value = '';  // Limpiamos el valor del input
    }
}
