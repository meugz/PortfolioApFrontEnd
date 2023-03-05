import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/servicios/persona.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-intro',
  templateUrl: './header-intro.component.html',
  styleUrls: ['./header-intro.component.css']
})
export class HeaderIntroComponent implements OnInit {
  persona: Persona | undefined;

  constructor(public personaService: PersonaService) { }

  ngOnInit(): void {
    this.personaService.getPersona().subscribe(data => {
      this.persona = data;
      this.persona.foto = environment.imgBasePath+this.persona.foto;
    })
  }



}
