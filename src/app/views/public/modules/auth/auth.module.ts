import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { LoginComponent } from './components/login/login.component';
import { ButtonModule } from 'primeng/button';
import { RegisterComponent } from './components/register/register.component';
import { TooltipModule } from 'primeng/tooltip';
import { CarouselModule } from 'primeng/carousel';
import { LoginTemplateComponent } from './components/login-template/login-template.component';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LoginTemplateComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    ReactiveFormsModule,
    TooltipModule,
    CarouselModule,
    InputTextModule
  ],
  
})
export class AuthModule { }
