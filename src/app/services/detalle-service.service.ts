import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Detalle } from '../interfaces/chat';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleServiceService {
  // Ruta principal del entorno de producción
  private baseUrl: string = environment.baseUrl;
  // constructor
  constructor(private http: HttpClient) { }

  // Método post  que crea un nuevo detalle
  registro( detalle: Detalle){
    const url = `${this.baseUrl}/detalle/add`
    return this.http.post<Detalle>(url,detalle).pipe(
      catchError( error => {
        return throwError(error.error);
      })
    )
  }

  // Método delete  para eliminar detalle
  borrarDetalle (id: number):Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/detalle/delete/${id}`)
  }

  // Método put  para modificar detalle
  actualizarDetalle( detalle: Detalle, id: number){
    const url = `${this.baseUrl}/detalle/mod/${id}`
    return this.http.put<Detalle>(url,detalle).pipe(
      map((response: any) => response as Detalle )
    );
  }

  // Método get  para listar detalles
  detallesLista( ) {
    const url = `${this.baseUrl}/detalle/list`
    return this.http.get( url ).pipe(
      map( resp => resp as Detalle [] )
    )
  }

  // Método get  para buscar detalle
  getDetallePorId(id: number):Observable<Detalle>{
    return this.http.get<Detalle>(`${this.baseUrl}/detalle/find/${id}`)
  }
}
