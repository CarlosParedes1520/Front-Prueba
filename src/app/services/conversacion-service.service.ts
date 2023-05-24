import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Conversacion } from '../interfaces/chat';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversacionServiceService {

  // Ruta principal del entorno de producción
  private baseUrl: string = environment.baseUrl;

  // constructor
  constructor(private http: HttpClient) { }

  // Método post  que crea una nueva conversación
  registro( conversacion: Conversacion){
    const url = `${this.baseUrl}/conversacion/add`
    return this.http.post<Conversacion>(url,conversacion).pipe(
      catchError( error => {
        return throwError(error.error);
      })
    );
  }

  // Método get  para listar conversación
  conversacionesLista( ) {
    const url = `${this.baseUrl}/conversacion/list`
    return this.http.get( url ).pipe(
      map( resp => resp as Conversacion [] )
    )
  }

  // Método get  para buscar una conversación
  getConversacionPorId(id: string):Observable<Conversacion>{
    return this.http.get<Conversacion>(`${this.baseUrl}/conversacion/find/${id}`)
  }

  // Método delete para borrar una conversación
  borrarConversacion (id: number):Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/conversacion/delete/${id}`)
  }

  // Método put  para modificar una conversación
  actualizar( conversacion: Conversacion, id: number){
    const url = `${this.baseUrl}/conversacion/mod/${id}`
    return this.http.put<Conversacion>(url,conversacion).pipe(
      map((response: any) => response as Conversacion )
    );
  }

  // Método que lista los registros de los seguimientos mediante un paginador
  listarConversacionPaginacion = (pagina: number) => {
    return this.http.get(`${this.baseUrl}conversacion/pagina/${pagina}/5`)
              .pipe(
                catchError((error) => {
                  return throwError(error);
              })
    );
  }


}
