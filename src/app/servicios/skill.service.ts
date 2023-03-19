import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SkillType } from '../model/skill-type';
import { Skill } from '../model/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  URL = 'http://localhost:8080/api/skill/';

  constructor(private http: HttpClient) { }

  //obtener un skill 
  public getSkill(id: number): Observable<Skill> {
    return this.http.get<Skill>(this.URL + id);
  }

  //obtener lista de skills
  public getListaSkill(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.URL + 'all');
  }

  //crear Skill
  public crearSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.URL + 'add', skill);
  }

  //editar Skill
  public editarSkill(id: number, skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(this.URL + id, skill);
  }

  //borrar Skill 
  public borrarSkill(id: number): Observable<Skill> {
    return this.http.delete<Skill>(this.URL + id);
  }

}

