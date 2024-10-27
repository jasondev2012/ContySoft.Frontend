import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'datos-personales', data: { breadcrumb: 'Datos Personales' }, component: DatosPersonalesComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
