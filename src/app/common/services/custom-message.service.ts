import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CustomMessageService {

  constructor(private messageService: MessageService) { }

  showMessage(response: any): void {
    let severity = response.success ? 'success' : 'error';
    let summary = response.success ? 'Excelente!' : 'Ups!';
    const detail = response.message;
    if(!response.success && response.code != 200){
      severity = "error";
      summary = 'Error ('+ response.code +')';
    }
    else if(response.success && response.code != 200){
      severity = "warning";
      summary = 'Ups! ('+ response.code +')';
    }
    this.messageService.add({ severity, summary, detail });
  }
  showWarn(message: string): void {
    this.messageService.add({ severity: 'warn', summary: 'Validación!', detail: message });
  }
  showSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Excelente!', detail: message });
  }
  showError(err: any): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: "Sucedió un error interno, por favor vuelva a intentar." });
    console.log(err);
  }
}
