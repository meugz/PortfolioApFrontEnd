import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageNameDto } from '../model/ImageNameDto.model';
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

  //editar foto perfil - persona pasando la foto por string
  public editarFoto(id:number, imgDto: ImageNameDto){
    return this.http.post(this.URL+'img/perfil/'+id, imgDto);
  }

}
