import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RegisterModel } from 'src/app/interfaces/auth/register.interface';

@Injectable()
export class RegisterAppService {
    informacionRegistro: RegisterModel = {
        cuenta: undefined,
        pago: undefined,
        empresa: undefined,
        plan: undefined
    };

    private registroCompletado = new Subject<any>();

    registroCompletado$ = this.registroCompletado.asObservable();

    getInformacion() {
        return this.informacionRegistro;
    }

    setInformacion(registro: RegisterModel) {
        this.informacionRegistro = registro;
    }

    complete() {
        this.registroCompletado.next(this.informacionRegistro);
    }
}
