import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Curso } from '../model/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  URL = environment.basePath+'curso/';

  constructor(private http: HttpClient) { }

  //obtener un curso
  public getCurso(id: number): Observable<Curso> {
    return this.http.get<Curso>(this.URL + id);
  }

  //obtener lista de cursos
  public getListaCurso(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.URL + 'all');
  }

  //crear Curso
  public crearCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.URL + 'add', curso);
  }

  //editar Curso
  public editarCurso(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(this.URL + id, curso);
  }

  //borrar Curso 
  public borrarCurso(id: number): Observable<Curso> {
    return this.http.delete<Curso>(this.URL + id);
  }
}
