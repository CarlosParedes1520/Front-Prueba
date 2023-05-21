import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Detalle } from '../interfaces/chat';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleServiceService {

  private baseUrl: string = environment.baseUrl;
  // private _usuario!: Usuario;

  // get usuario(){
  //   return {...this._usuario};
  // }
  constructor(private http: HttpClient) { }

  registro( conversacion: Detalle){
    const url = `${this.baseUrl}/detalle/add`
    return this.http.post<Detalle>(url,conversacion).pipe(
      map((response: any) => response as Detalle )
    )

  }


  borrarDetalle (id: number):Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/detalle/delete/${id}`)
  }

  actualizarDetalle( detalle: Detalle, id: number){
    const url = `${this.baseUrl}/detalle/mod/${id}`
    return this.http.put<Detalle>(url,detalle).pipe(
      map((response: any) => response as Detalle )
    );
  }

  getDetallePorId(id: number):Observable<Detalle>{
    return this.http.get<Detalle>(`${this.baseUrl}/detalle/find/${id}`)
  }
}
