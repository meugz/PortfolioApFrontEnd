import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia } from '../model/experiencia.model';
import { Persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  URL = environment.basePath+'experiencia/';

  constructor(private http: HttpClient) { }

  //obtener una experiencia -- resolver tema del id
  public getExperiencia(id: number): Observable<Experiencia> {
    return this.http.get<Experiencia>(this.URL + id);
  }

  //obtener lista de experiencia laboral
  public getListaExperiencia(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(this.URL + 'all');
  }

  //crear experiencia laboral 
  public crearExperiencia(experiencia: Experiencia): Observable<Experiencia> {
    return this.http.post<Experiencia>(this.URL + 'add', experiencia);
  }

  //editar experiencia laboral 
  public editarExperiencia(id: number, experiencia: Experiencia): Observable<Experiencia> {
    return this.http.put<Experiencia>(this.URL + id, experiencia);
  }

  //borrar experiencia laboral
  public borrarExperiencia(id: number): Observable<Experiencia> {
    return this.http.delete<Experiencia>(this.URL + id);
  }
}
