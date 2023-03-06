import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../model/persona.model';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  URL = 'http://localhost:8080/api/persona/';

  constructor(private http:HttpClient) { }

  public getPersona(): Observable<Persona>{
    return this.http.get<Persona>(this.URL+ 'ver/1');
  }

  public getPersonaById(id:number): Observable<Persona>{
    return this.http.get<Persona>(this.URL+'ver/'+id)
  }


}