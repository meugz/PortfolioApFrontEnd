import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interes } from '../model/interes.model';

@Injectable({
  providedIn: 'root'
})
export class InteresService {
  URL = 'http://localhost:8080/api/interes/';

  constructor(private http:HttpClient) { }

   //obtener una interes -- resolver tema del id
   public getInteres(id:number): Observable<Interes>{
    return this.http.get<Interes>(this.URL+'ver/'+id);
  }

  //obtener lista de Intereses
  public getListaInteres(): Observable<Interes[]>{
    return this.http.get<Interes[]>(this.URL+'lista');
  }

  //crear Interes
  public crearInteres(interes:Interes): Observable<Interes>{
    return this.http.post<Interes>(this.URL+'add', interes);
  }

  //editar Interes
  public editarInteres(interes:Interes): Observable<Interes>{
    return this.http.put<Interes>(this.URL+'editar', interes);
  }

  //borrar Interes
  public borrarInteres(id:number): Observable<Interes>{
    return this.http.delete<Interes>(this.URL+'delete/'+id);
  }
}
