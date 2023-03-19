import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto.model';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import * as bs from 'bootstrap/dist/js/bootstrap.bundle.js';
import Inputmask from 'inputmask';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  @ViewChild('dateInputProject') myInputElementRef: ElementRef;
  proyectos: Proyecto[] = [];
  project: Proyecto;
  projectform: FormGroup;
  buttonEdit: boolean;
  projectId: number;
  enProyectos: boolean = false;


  constructor(private proyectoService: ProyectoService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
    this.proyectoService.getListaProyecto().subscribe(project => this.proyectos = project);
    this.enProyectos = this.router.url.includes('proyectos');
  }

  //armado formulario-validaciones
  buildForm() {
    this.projectform = this.formBuilder.group({
      nombreProyecto: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcionProyecto: ['', Validators.compose([Validators.required, Validators.maxLength(175)])],
      url: ['', Validators.compose([Validators.required, Validators.maxLength(175)])]
    })
  }

  //validación de ingreso datos
  invalid(parametro: string) {
    return this.projectform.get(parametro).invalid && this.projectform.get(parametro).touched;
  }

  invalidError(parametro: string, param: string) {
    return this.projectform.get(parametro).getError(param) && this.projectform.get(parametro).touched;
  }

  redirectTo() {
    this.router.navigate(['/proyectos']);
  }

  redirectToHome(){
    this.router.navigate(['']);
  }

  //apertura y cierre modal para crear el proyecto
  open() {
    this.buttonEdit = false;
    var myModalEl = document.querySelector('#proModal')
    var myModal = bs.Modal.getOrCreateInstance(myModalEl)
    myModal.show(); // show modal
  }

  close() {
    this.projectform.reset();
    var myModalEl = document.getElementById('proModal');
    const myModal = bs.Modal.getInstance(myModalEl);
    myModal.hide(); // hide modad
  }


  //metodo para crear proyecto
  createProject() {
    this.projectform.markAllAsTouched();
    if (this.projectform.valid) {
      this.proyectoService.crearProyecto(this.projectform.getRawValue()).subscribe(
        {
          next: (data) => {
            alert("Proyecto creado correctamente.")
            this.proyectoService.getListaProyecto().subscribe(project => this.proyectos = project);
          },
          error: (err) => {
            alert("Error al añadir el proyecto.")
          },
          complete: () => {
            this.close();
          }
        }
      );
    }
  }

  openCreate() {
    this.buttonEdit = false;
    this.open();
  }

  //apertura modal para editar
  openEdit(id: number) {
    this.projectId = id;
    this.buttonEdit = true;
    this.findProject(id);
    var myModalEl = document.querySelector('#proModal')
    var myModal = bs.Modal.getOrCreateInstance(myModalEl)
    myModal.show(); // show modal
  }

  //buscar proyecto 
  findProject(id: number) {
    this.proyectoService.getProyecto(id).subscribe({
      next: (project) => {
        //me devuelve una lista con los nombres de los atributos del objeto
        let attributeList = Object.keys(project);
        for (let attr of attributeList) {
          if (attr != 'id') {
            this.projectform.get(attr).setValue(project[attr]);
          }
        }
      },
      error: (err) => {
        alert("No se pudo encontrar el proyecto.");
        this.close();
      }
    });
  }

  //editar proyecto
  editProject() {
    this.projectform.markAllAsTouched();
    if (this.projectform.valid) {
      this.proyectoService.editarProyecto(this.projectId, this.projectform.getRawValue()).subscribe(
      {
        next: (data) => {
          alert("Proyecto editado correctamente.");
          this.proyectoService.getListaProyecto().subscribe(project => this.proyectos = project);
        },
        error: (err) => {
          alert("Error al editar. Controle que los campos esten completos correctamente.");
        },
        complete: () => {
          this.close();
        }
      });
    }
  }

  //borrar proyecto 
  deleteProject(id: number) {
    this.proyectoService.borrarProyecto(id).subscribe(
    {
      next: (exp) => {
        alert("Proyecto eliminado correctamente.");
        this.proyectoService.getListaProyecto().subscribe(project => this.proyectos = project);
      },
      error: (err) => {
        alert("Error al eliminar la experiencia laboral");
      }
    });
  }

  //inputmask para fecha   
  ngAfterViewInit(): void {
      Inputmask('datetime', {
      inputFormat: 'yyyy-mm-dd',
      placeholder: 'yyyy-mm-dd',
      alias: 'datetime',
      clearMaskOnLostFocus: false,
      isComplete: function(buffer, opts) {
        console.log('Data', buffer, opts);
      }
    }).mask(this.myInputElementRef.nativeElement);
  }

}
