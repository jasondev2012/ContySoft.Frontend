import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validador personalizado para la contraseña
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    if (!password) {
      return null; // Si el campo está vacío, deja que los validadores `required` se encarguen
    }

    // Verifica los requisitos de la contraseña
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[\W_]/.test(password); // Caracteres especiales (no alfanuméricos)
    const isValidLength = password.length >= 8;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;

    // Si no cumple, retorna los errores
    return !passwordValid ? {
      passwordStrength: {
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        isValidLength
      }
    } : null; // Si todo está bien, retorna null
  };
}
export function rucValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const ruc = control.value;
    // Verificar si el RUC empieza con '10' o '20'
    if (ruc && (ruc.startsWith('10') || ruc.startsWith('20'))) {
      return null; // RUC válido
    }
    return { invalidRuc: true }; // RUC no válido
  };
}