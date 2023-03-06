import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../model/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  URL = 'http://localhost:8080/api/skill/';

  constructor(private http:HttpClient) { }

  //obtener un skill -- resolver tema del id
  public getSkill(id:number): Observable<Skill>{
    return this.http.get<Skill>(this.URL+'ver/'+id);
  }
  
  //obtener lista de skills
  public getListaSkill(): Observable<Skill[]>{
    return this.http.get<Skill[]>(this.URL+'lista');
  }
  
  //crear Skill
  public crearSkill(project:Skill): Observable<Skill>{
    return this.http.post<Skill>(this.URL+'add', project);
  }

  //editar Skill
  public editarSkill(project:Skill): Observable<Skill>{
    return this.http.put<Skill>(this.URL+'editar', project);
  }

  //borrar Skill 
  public borrarSkill(id:number): Observable<Skill>{
    return this.http.delete<Skill>(this.URL+'delete/'+id);
  }
}
