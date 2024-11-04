import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginTemplateComponent } from './components/login-template/login-template.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'login', component: LoginComponent},
        { path: 'login2', component: LoginTemplateComponent},
        { path: 'registro', component: RegisterComponent},
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
