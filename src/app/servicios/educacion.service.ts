import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../model/educacion.model';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  URL = 'http://localhost:8080/api/educacion/';

  constructor(private http: HttpClient) { }

  //obtener una educacion -- resolver tema del id
  public getEducacion(id: number): Observable<Educacion> {
    return this.http.get<Educacion>(this.URL + id);
  }

  //obtener lista de educacion
  public getListaEducacion(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(this.URL + 'all');
  }

  //crear Educacion
  public crearEducacion(edu: Educacion): Observable<Educacion> {
    return this.http.post<Educacion>(this.URL + 'add', edu);
  }

  //editar Educacion
  public editarEducacion(id: number, edu: Educacion): Observable<Educacion> {
    return this.http.put<Educacion>(this.URL + id, edu);
  }

  //borrar educacion 
  public borrarEducacion(id: number): Observable<Educacion> {
    return this.http.delete<Educacion>(this.URL + id);
  }
}
