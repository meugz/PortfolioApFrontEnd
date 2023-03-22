import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Curso } from '../model/curso.model';
import { CursoService } from '../servicios/curso.service';
import * as bs from 'bootstrap/dist/js/bootstrap.bundle.js';
import { UsuarioService } from '../servicios/usuario.service';
import { TokenService } from '../servicios/token.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})

export class CursosComponent implements OnInit {
  curso: Curso | undefined;
  cursos: Curso[] = [];
  cursoForm: FormGroup;
  buttonEdit: boolean;
  cursoId: number;
  enCursos: boolean = false;
  
  constructor(private cursoService: CursoService, private tokenService:TokenService, private usuarioService: UsuarioService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.isLogged();
    this.buildForm();
    this.cursoService.getListaCurso().subscribe(cur => this.cursos = cur);
    this.enCursos = this.router.url.includes('cursos');
  }

  //armado formulario-validaciones
  buildForm() {
    this.cursoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      institucion: ['', Validators.required],
      periodo: ['', Validators.required],
      descripcion: ['', Validators.compose([Validators.required, Validators.maxLength(175)])]
    })
  }

  //validación de ingreso datos
  invalid(parametro: string) {
    return this.cursoForm.get(parametro).invalid && this.cursoForm.get(parametro).touched;
  }

  invalidError(parametro: string, param: string) {
    return this.cursoForm.get(parametro).getError(param) && this.cursoForm.get(parametro).touched;
  }

  //redirección de rutas a componentes cursos e inicio
  redirectTo() {
    this.router.navigate(['/cursos']);
  }

  redirectToHome() {
    this.router.navigate(['']);
  }

  //apertura y cierre modal para crear un Curso
  open() {
    this.buttonEdit = false;
    var myModalEl = document.querySelector('#cursoModal')
    var myModal = bs.Modal.getOrCreateInstance(myModalEl)
    myModal.show(); // show modal
  }

  close() {
    this.cursoForm.reset();
    var myModalEl = document.getElementById('cursoModal');
    const myModal = bs.Modal.getInstance(myModalEl);
    myModal.hide(); // hide modad
  }

  //metodo para crear un curso
  createCourse() {
    this.cursoForm.markAllAsTouched();
    if (this.cursoForm.valid) {
      this.cursoService.crearCurso(this.cursoForm.getRawValue()).subscribe({
        next: (data) => {
          alert("Curso creado correctamente.")
          this.cursoService.getListaCurso().subscribe(cur => this.cursos = cur);
        },
        error: (err) => {
          alert("Error al añadir el curso.")
        },
        complete: () => {
          this.close();
        }
      }
      );
    }
  }

  //método para abrir modal - condición para filtrar boton de crear / editar según formulario
  openCreate() {
    this.buttonEdit = false;
    this.open();
  }

  //apertura modal para editar - cambio de condición para filtrar boton de editar en formulario 
  openEdit(id: number) {
    this.cursoId = id;
    this.buttonEdit = true;
    this.findCourse(id);
    var myModalEl = document.querySelector('#cursoModal')
    var myModal = bs.Modal.getOrCreateInstance(myModalEl)
    myModal.show(); // show modal
  }

  //buscar curso - traer atributos para luego autocompletar campos del formulario de edición
  findCourse(id: number) {
    this.cursoService.getCurso(id).subscribe({
      next: (curso) => {
        //me devuelve una lista con los nombres de los atributos del objeto
        let attributeList = Object.keys(curso);
        for (let attr of attributeList) {
          if (attr != 'id') {
            this.cursoForm.get(attr).setValue(curso[attr]);
          }
        }
      },
      error: (err) => {
        alert("No se pudo encontrar el curso.");
        this.close();
      }
    });
  }

  //editar curso - traer valores de los campos del formulario
  editCourse() {
    this.cursoForm.markAllAsTouched();
    if (this.cursoForm.valid) {
      this.cursoService.editarCurso(this.cursoId, this.cursoForm.getRawValue()).subscribe({
        next: (data) => {
          alert("Curso editado correctamente.");
          this.cursoService.getListaCurso().subscribe(cur => this.cursos = cur);
        },
        error: (err) => {
          alert("Error al editar el curso.");
        },
        complete: () => {
          this.close();
        }
      });
    }
  }

  //borrar curso
  deleteCourse(id: number) {
    this.cursoService.borrarCurso(id).subscribe({
      next: (cur) => {
        alert("Curso eliminado correctamente.");
        this.cursoService.getListaCurso().subscribe(cur => this.cursos = cur);
      },
      error: (err) => {
        alert("Error al eliminar el curso.");
      }
    });
  }

  isLogged(){
    return this.usuarioService.isLogged();
  }

}
