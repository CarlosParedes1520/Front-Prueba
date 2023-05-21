import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidadorService {

  public numericoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
 
  constructor() { }
}
