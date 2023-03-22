import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto.model';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  proyectos: Proyecto[] = [];
 

  //inyectamos el servicio en el componente 
  constructor(private location: Location, private activatedRoute: ActivatedRoute, private datosPorfolio: PorfolioService,  private usuarioService: UsuarioService, private tokenService: TokenService, private proyectoService: ProyectoService, private router: Router) { }

  ngOnInit(): void {
    this.isLogged();
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

  redirectToLogin(){
    this.router.navigate(['/login']);
  }

  isLogged(){
    return this.usuarioService.isLogged();
  }
  
  onLogOut(): void {
    this.tokenService.logOut();
  }

}
