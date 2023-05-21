import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Conversacion } from '../interfaces/chat';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversacionServiceService {


  private baseUrl: string = environment.baseUrl;
  private _conversacion!: Conversacion;

  // get usuario(){
  //   return {...this._conversacion};
  // }

  constructor(private http: HttpClient) { }

  registro( conversacion: Conversacion){
    const url = `${this.baseUrl}/conversacion/add`
    return this.http.post<Conversacion>(url,conversacion).pipe(
      map((response: any) => response as Conversacion )
    );
  }

  conversaciones( ) {
    const url = `${this.baseUrl}/conversacion/list`
    return this.http.get( url ).pipe(
      map( resp => resp as Conversacion [] )
    )
  }

  getConversacionPorId(id: string):Observable<Conversacion>{
    return this.http.get<Conversacion>(`${this.baseUrl}/conversacion/find/${id}`)
  }

  borrarConversacion (id: number):Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/conversacion/delete/${id}`)
  }


  actualizar( conversacion: Conversacion, id: number){
    const url = `${this.baseUrl}/conversacion/mod/${id}`
    return this.http.put<Conversacion>(url,conversacion).pipe(
      map((response: any) => response as Conversacion )
    );
  }


}
