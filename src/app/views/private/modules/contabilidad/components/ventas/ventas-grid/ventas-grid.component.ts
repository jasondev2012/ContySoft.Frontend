import { Component, ElementRef, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { LoadingService } from 'src/app/common/services/loading.service';
import { SessionService } from 'src/app/common/services/sesion.service';
import { Ventas } from 'src/app/interfaces/ventas/ventas.interface';
import { VentasService } from 'src/app/services/ventas/ventas.service';
@Component({
    selector: 'app-ventas-grid',
    templateUrl: './ventas-grid.component.html',
})
export class VentasGridComponent implements OnInit{

    ventas!: Ventas[]
    token: string
    @ViewChild('fileInput') fileInput!: ElementRef;
    constructor(private ventasService: VentasService,
                private loadinService: LoadingService,
                private messageService: MessageService,
                private sessionService: SessionService,
                private router: Router
    ) {
        this.token = this.sessionService.getSession().token
    }

    ngOnInit(): void {
        this.ventasService.obtenerVentas(this.token)
        .subscribe({
            next: res => {
                this.ventas = res.data;
                console.log(this.ventas);
            }
        })
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input?.files?.length) {
            const file: File = input.files[0];

            // Verificamos si el archivo es de tipo .txt
            if (file.type === 'text/plain') {

                this.loadinService.show()
                // Llamamos al servicio para enviar el archivo

                this.ventasService.importarVentas(file, this.token)
                .pipe(finalize(() => this.loadinService.hide()))
                .subscribe({
                    next: (response) => {
                      this.messageService.add({
                          severity: 'success',
                          summary: 'Ok!',
                          detail: response.message,
                      });
                      this.ventasService.obtenerVentas(this.token)
                        .subscribe({
                                    next: res => {
                                            this.ventas = res.data;
                                            this.router.navigate([this.router.url]);
                                        }
                                    });
                        this.limpiarCampoArchivo();  // Limpiamos el campo de archivo
                        // Aquí puedes manejar la respuesta como desees
                    },
                    error: (err) => {
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
