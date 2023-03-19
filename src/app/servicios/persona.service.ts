import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../model/persona.model';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  URL = 'http://localhost:8080/api/persona/';

  constructor(private http: HttpClient) { }

  public getPersona(): Observable<Persona> {
    return this.http.get<Persona>(this.URL + '1');
  }

  public getPersonaById(id: number): Observable<Persona> {
    return this.http.get<Persona>(this.URL + id)
  }

  //editar persona
  public editarPersona(id: number, persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(this.URL + id, persona);
  }

  // //codigo adicional
  // public getListaPersonas(): Observable<Persona[]>{
  //   return this.http.get<Persona[]>(this.URL+'all');
  // }

  // //crear persona
  // public crearPersona(persona: Persona): Observable<Persona>{
  //   return this.http.post<Persona>(this.URL+'new', persona);
  // }

  // //borrar persona 
  // public borrarPersona(id:number): Observable<Persona>{
  //   return this.http.delete<Persona>(this.URL+id);
  // }

}
