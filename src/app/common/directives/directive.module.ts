import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowErrorsDirective } from './show-errors.directive';

@NgModule({
  declarations: [ShowErrorsDirective],
  imports: [CommonModule],
  exports: [ShowErrorsDirective] // Exporta la directiva
})
export class DirectiveModule {}
