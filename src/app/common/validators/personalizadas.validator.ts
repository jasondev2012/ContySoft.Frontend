import { AbstractControl, ValidationErrors } from '@angular/forms';

// Validador para solo números
export function soloNumeros(control: AbstractControl): ValidationErrors | null {
  const regex = /^[0-9]*$/; // Solo números
  if (control.value && !regex.test(control.value)) {
    return { soloNumeros: 'Solo se permiten números.' };
  }
  return null;
}

// Validador para solo letras
export function soloTexto(control: AbstractControl): ValidationErrors | null {
  const regex = /^[a-zA-Z\s]*$/; // Solo letras y espacios
  if (control.value && !regex.test(control.value)) {
    return { soloTexto: 'Solo se permiten letras.' };
  }
  return null;
}
