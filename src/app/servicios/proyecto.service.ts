import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../model/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  URL = 'http://localhost:8080/api/proyecto/';

  constructor(private http:HttpClient) { }

  //obtener un proyecto -- resolver tema del id
  public getProyecto(id:number): Observable<Proyecto>{
    return this.http.get<Proyecto>(this.URL+'ver/'+id);
  }

  //obtener lista de proyectos
  public getListaProyecto(): Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(this.URL+'lista');
  }

  //crear proyecto
  public crearProyecto(project:Proyecto): Observable<Proyecto>{
    return this.http.post<Proyecto>(this.URL+'add', project);
  }

  //editar proyecto
  public editarProyecto(project:Proyecto): Observable<Proyecto>{
    return this.http.put<Proyecto>(this.URL+'editar', project);
  }

  //borrar proyecto 
  public borrarProyecto(id:number): Observable<Proyecto>{
    return this.http.delete<Proyecto>(this.URL+'delete/'+id);
  }
}
