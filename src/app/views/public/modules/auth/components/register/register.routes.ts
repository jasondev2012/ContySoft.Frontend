import { DatosEmpresaComponent } from './datos-empresa/datos-empresa.component';
import { PlanesComponent } from './planes/planes.component';
import { PagoComponent } from './pago/pago.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { DatosCuentaComponent } from './datos-cuenta/datos-cuenta.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'cuenta', pathMatch: 'full' }, // Redirecciona internamente a 'registro'
    { path: 'cuenta', component: DatosCuentaComponent },
    { path: 'empresa', component: DatosEmpresaComponent },
    { path: 'planes', component: PlanesComponent },
    { path: 'pago', component: PagoComponent },
    { path: 'confirmacion', component: ConfirmacionComponent },
];
