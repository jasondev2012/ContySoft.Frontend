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
import { InputTextModule } from 'primeng/inputtext';
import { RegisterTemplateComponent } from './components/register-template/register-template.component';
import { StepsModule } from 'primeng/steps';
import { RegisterAppService } from 'src/app/common/services/register-app.service';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, RegisterTemplateComponent],
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
    InputTextModule,
    StepsModule
  ],
  providers: [RegisterAppService]
})
export class AuthModule { }
