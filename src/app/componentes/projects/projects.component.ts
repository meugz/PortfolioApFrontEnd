import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/model/proyecto.model';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  proyectos: Proyecto[] = [];


  constructor(public proyectoService: ProyectoService) { }

  ngOnInit(): void {
    this.proyectoService.getListaProyecto().subscribe(project =>this.proyectos=project);
  }

  
}
