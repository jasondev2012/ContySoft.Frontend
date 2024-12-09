import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AuthInterceptor } from './common/interceptors/auth.interceptor';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';

@NgModule({
    declarations: [AppComponent, NotfoundComponent ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        ToastModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ProgressSpinnerModule
    ],
    providers: [MessageService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true // Permite múltiples interceptores
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true // Permite múltiples interceptores
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
