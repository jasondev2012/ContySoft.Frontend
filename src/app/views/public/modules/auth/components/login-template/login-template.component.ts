import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { LoadingService } from 'src/app/common/services/loading.service';
import { SessionService } from 'src/app/common/services/sesion.service';
import { LoginRequest } from 'src/app/interfaces/auth/login.interface';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login-template',
  templateUrl: './login-template.component.html',
  styleUrl: './login-template.component.scss'
})
export class LoginTemplateComponent  implements OnInit{
  products: any[]
  responsiveOptions: any[] | undefined;
  recordarEmail: boolean = false;

  password: string = '';
  usuario: string = '';
  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private loginService: LoginService,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private sessionService: SessionService
  ){
    this.products = 
      [
        {
            id: '1000',
            code: 'f230fh0g3',
            name: 'Bamboo Watch',
            description: 'Product Description',
            image: 'bamboo-watch.jpg',
            price: 65,
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'INSTOCK',
            rating: 5
        },
        {
            id: '1001',
            code: 'nvklal433',
            name: 'Black Watch',
            description: 'Product Description',
            image: 'black-watch.jpg',
            price: 72,
            category: 'Accessories',
            quantity: 61,
            inventoryStatus: 'OUTOFSTOCK',
            rating: 4
        },
        {
            id: '1002',
            code: 'zz21cz3c1',
            name: 'Blue Band',
            description: 'Product Description',
            image: 'blue-band.jpg',
            price: 79,
            category: 'Fitness',
            quantity: 2,
            inventoryStatus: 'LOWSTOCK',
            rating: 3
        }    
    ]
  }
  ngOnInit(): void {
    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '1220px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '1100px',
          numVisible: 1,
          numScroll: 1
      }
    ];

  }
  getSeverity(status: string) {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warning';
        case 'OUTOFSTOCK':
            return 'danger';
        default:
          return 'danger';
    }
  }
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evitar el comportamiento predeterminado
        this.onIniciarSesionClick(); // Llama a la función de iniciar sesión
    }
  }
  onIniciarSesionClick() {
      let request: LoginRequest = {
          usuario: this.usuario,
          password: this.password,
      };
      if (!request.usuario || request.usuario.replaceAll(' ', '') == '') {
          this.messageService.add({
              severity: 'warn',
              summary: 'Validación!',
              detail: 'Debe ingresar un email',
          });
          return;
      } else if (
          !request.password ||
          request.password.replaceAll(' ', '') == ''
      ) {
          this.messageService.add({
              severity: 'warn',
              summary: 'Validación!',
              detail: 'Debe ingresar una contraseña',
          });
          return;
      }

      this.loadingService.show();
      this.loginService.getLogin(request)
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe({
          next: (res) => {
              if (this.recordarEmail) {
                  localStorage.setItem('EMAIL', this.usuario);
                  localStorage.setItem(
                      'REC_EMAIL',
                      this.recordarEmail.toString()
                  );
              } else {
                  localStorage.removeItem('EMAIL');
                  localStorage.removeItem('REC_EMAIL');
              }
              this.sessionService.setSession(res);
              this.router.navigate(['/']); // Redirige al home
          },
          error: (err) => {
              //console.error('Error:', err);
          }
      });
  }
  onCrearCuentaClick() {
      this.router.navigate(['/auth/registro']);
  }
}
