import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class RequestStateService {
    private errorState = false;

    setErrorState(state: boolean): void {
        this.errorState = state;
    }

    getErrorState(): boolean {
        return this.errorState;
    }
}
