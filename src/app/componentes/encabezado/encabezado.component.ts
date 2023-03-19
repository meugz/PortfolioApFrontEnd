import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto.model';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  proyectos: Proyecto[] = [];

  //inyectamos el servicio en el componente 
  constructor(private datosPorfolio: PorfolioService, private proyectoService: ProyectoService, private router: Router) { }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos();
  }

  //Redirección de rutas a componentes desde el navbar
  redirectToHome() {
    this.router.navigate(['']);
  }

  redirectToPerfil() {
    this.router.navigate(['/perfil']);
  }

  redirectToExpe() {
    this.router.navigate(['/experiencias']);
  }

  redirectToEdu() {
    this.router.navigate(['/educacion']);
  }

  redirectToSkills() {
    this.router.navigate(['/skills']);
  }

  redirectToInterest() {
    this.router.navigate(['/intereses']);
  }

  redirectToContact() {
    this.router.navigate(['/contacto']);
  }

  redirectToProyectos() {
    this.router.navigate(['/proyectos']);
  }

  redirectToCursos() {
    this.router.navigate(['/cursos']);
  }

}
