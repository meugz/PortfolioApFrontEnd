import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Interes } from '../model/interes.model';

@Injectable({
  providedIn: 'root'
})
export class InteresService {
  URL = environment.basePath+'interes/';

  constructor(private http: HttpClient) { }

  //obtener una interes -- resolver tema del id
  public getInteres(id: number): Observable<Interes> {
    return this.http.get<Interes>(this.URL + id);
  }

  //obtener lista de Intereses
  public getListaInteres(): Observable<Interes[]> {
    return this.http.get<Interes[]>(this.URL + 'all');
  }

  //crear Interes
  public crearInteres(interes: Interes): Observable<Interes> {
    return this.http.post<Interes>(this.URL + 'add', interes);
  }

  //editar Interes
  public editarInteres(id: number, interes: Interes): Observable<Interes> {
    return this.http.put<Interes>(this.URL + id, interes);
  }

  //borrar Interes
  public borrarInteres(id: number): Observable<Interes> {
    return this.http.delete<Interes>(this.URL + id);
  }

}
