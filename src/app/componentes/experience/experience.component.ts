import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia.model';
import { Persona } from 'src/app/model/persona.model';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  persona: Persona | undefined;
  trabajos: Experiencia[] = [];

  constructor(public experienciaService: ExperienciaService) { }

  ngOnInit(): void {
    this.experienciaService.getListaExperiencia().subscribe(exp =>this.trabajos=exp);
  }

}
