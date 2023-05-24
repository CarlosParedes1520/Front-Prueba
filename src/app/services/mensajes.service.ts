import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  // constructor
  constructor() { }

  // metodo para mandar alertas de confirmacion de aprobación o errror
  mensajeSweetInformacion = (sweetAlertIcon: 'success' | 'error' | 'warning' | 'info' | 'question', mensaje: string ): void => {
    Swal.fire({ position: 'top-end', icon: sweetAlertIcon, title: mensaje, showConfirmButton: false, timer: 1300});
  }
}
