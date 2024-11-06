import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginTemplateComponent } from './components/login-template/login-template.component';
import { RegisterTemplateComponent } from './components/register-template/register-template.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'login', component: LoginComponent},      
		{ path: 'registro', component: RegisterComponent, children: [
			{
				path: '', // Ruta vacía para cargar el primer componente en `EmpresaStepsComponent`
				loadChildren: () =>
					import('./components/register/register.module').then(m => m.RegisterModule),
			}
		]},
        { path: 'registro2', component: RegisterTemplateComponent},
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
