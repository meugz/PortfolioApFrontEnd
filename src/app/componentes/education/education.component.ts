import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Educacion } from 'src/app/model/educacion.model';
import { EducacionService } from 'src/app/servicios/educacion.service';
import * as bs from 'bootstrap/dist/js/bootstrap.bundle.js';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})

export class EducationComponent implements OnInit {
  educacion: Educacion | undefined;
  titulos: Educacion[] = [];
  eduform: FormGroup;
  eduId: number;
  buttonEdit: boolean = false;
  enEducacion: boolean = false;
  

  constructor(private educacionService: EducacionService, private tokenService:TokenService, private usuarioService: UsuarioService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.isLogged();
    this.buildForm();
    this.educacionService.getListaEducacion().subscribe(edu => this.titulos = edu);
    this.enEducacion = this.router.url.includes('educacion');
  }

  //armado formulario-validaciones
  buildForm() {
    this.eduform = this.formBuilder.group({
      nombreEdu: ['', Validators.required],
      institucionEdu: ['', Validators.required],
      //ubicacion: ['', Validators.required],
      periodoEdu: ['', Validators.required],
      descripcionEdu: ['', Validators.compose([Validators.required, Validators.maxLength(175)])]
    });
  }

  //validación de ingreso datos
  invalid(parametro: string) {
    return this.eduform.get(parametro).invalid && this.eduform.get(parametro).touched;
  }

  invalidError(parametro: string, param: string) {
    return this.eduform.get(parametro).getError(param) && this.eduform.get(parametro).touched;
  }

  //redirecciones de rutas a componentes
  redirectTo() {
    this.router.navigate(['/educacion']);
  }

  redirectToHome() {
    this.router.navigate(['']);
  }

  //apertura y cierre modal para crear educación
  open() {
    var myModalEl = document.querySelector('#eduModal')
    var myModal = bs.Modal.getOrCreateInstance(myModalEl)
    myModal.show(); // show modal
  }

  close() {
    this.eduform.reset();
    var myModalEl = document.getElementById('eduModal');
    const myModal = bs.Modal.getInstance(myModalEl);
    myModal.hide(); // hide modad
  }

  //metodo para crear educación
  createEdu() {
    this.eduform.markAllAsTouched();
    if (this.eduform.valid) {
      this.educacionService.crearEducacion(this.eduform.getRawValue()).subscribe({
        next: (data) => {
          alert("Educación formal creada correctamente.")
          this.educacionService.getListaEducacion().subscribe(edu => this.titulos = edu);
        },
        error: (err) => {
          alert("Error al añadir la educación formal.")
        },
        complete: () => {
          this.close();
        }
      }
      );
    }
  }

  //método de apertura modal para filtrar botones de edición y creación según vista
  openCreate() {
    this.buttonEdit = false;
    this.open();
  }

  //apertura modal para editar - cambio de condición de botón para filtrar según vista edición 
  openEdit(id: number) {
    this.eduId = id;
    this.buttonEdit = true;
    this.findEdu(id);
    var myModalEl = document.querySelector('#eduModal')
    var myModal = bs.Modal.getOrCreateInstance(myModalEl)
    myModal.show(); // show modal
  }

  //buscar educación formal y traer parámetros para los campos de formulario de edición
  findEdu(id: number) {
    this.educacionService.getEducacion(id).subscribe({
      next: (educacion) => {
        //me devuelve una lista con los nombres de los atributos del objeto
        let attributeList = Object.keys(educacion);
        for (let attr of attributeList) {
          if (attr != 'id') {
            this.eduform.get(attr).setValue(educacion[attr]);
          }
        }
      },
      error: (err) => {
        alert("No se pudo encontrar la experiencia laboral");
        this.close();
      }
    });
  }

  //editar educación formal 
  editEdu() {
    this.eduform.markAllAsTouched();
    if (this.eduform.valid) {
      this.educacionService.editarEducacion(this.eduId, this.eduform.getRawValue()).subscribe({
        next: (data) => {
          alert("Educación formal editada correctamente.");
          this.educacionService.getListaEducacion().subscribe(edu => this.titulos = edu);
        },
        error: (err) => {
          alert("Error al editar educación formal.");
        },
        complete: () => {
          this.close();
        }
      });
    }
  }

  //borrar educación formal 
  deleteEdu(id: number) {
    this.educacionService.borrarEducacion(id).subscribe({
      next: (exp) => {
        alert("Educación formal eliminada correctamente");
        this.educacionService.getListaEducacion().subscribe(edu => this.titulos = edu);
      },
      error: (err) => {
        alert("Error al eliminar educación formal.");
      }
    });
  }
  
  isLogged(){
     return this.usuarioService.isLogged();
   }

}
