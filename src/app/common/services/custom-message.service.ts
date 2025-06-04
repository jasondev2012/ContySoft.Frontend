import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CustomMessageService {

  constructor(
    private messageService: MessageService
  ) {}

  showSuccess(message: string, summary = "Ok") {    
    this.messageService.add({
        severity: 'success',
        summary: 'Ok',
        detail: message
    });
  }
}
