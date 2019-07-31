import { AbstractControl } from '@angular/forms';

export function ValidateName(control: AbstractControl) {
  if (!/^[a-zA-Z]+$/.test(control.value)) {
    return { validName: true };
  }
  return null;
}

export function ValidateIdNumber(control: AbstractControl) {
  if (!/^[0-9A-Za-z\-]+$/.test(control.value)) {
    return { validIdNumber: true };
  }
  return null;
}

export function ValidateMobile(control: AbstractControl) {
  if (!/^[0-9\-+\(\\)\s]+$/.test(control.value) && control.value !== '' && control.value !== null) {
    return { validMobile: true };
  }
  return null;
}
