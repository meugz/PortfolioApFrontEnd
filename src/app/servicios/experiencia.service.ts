import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../model/experiencia.model';
import { Persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  URL = 'http://localhost:8080/api/experiencia/';

  constructor(private http:HttpClient) { }

  //obtener una experiencia -- resolver tema del id
  public getExperiencia(id:number): Observable<Experiencia>{
    return this.http.get<Experiencia>(this.URL+'ver/'+id);
  }

  //obtener lista de experiencia laboral
  public getListaExperiencia(): Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(this.URL+'lista');
  }

  //crear experiencia laboral 
  public crearExperiencia(experiencia:Experiencia): Observable<Experiencia>{
    return this.http.post<Experiencia>(this.URL+'add', experiencia);
  }

  //editar experiencia laboral 
  public editarExperiencia(experiencia:Experiencia): Observable<Experiencia>{
    return this.http.put<Experiencia>(this.URL+'editar', experiencia);
  }

  public borrarExperiencia(id:number): Observable<Experiencia>{
    return this.http.delete<Experiencia>(this.URL+'delete/'+id);
  }

  
  
}
