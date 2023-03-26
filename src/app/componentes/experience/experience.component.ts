import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia.model';
import { Persona } from 'src/app/model/persona.model';
import * as bs from 'bootstrap/dist/js/bootstrap.bundle.js';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Inputmask from 'inputmask';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { TokenService } from 'src/app/servicios/token.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ExperienceComponent implements OnInit, AfterViewInit {
  @ViewChild('dateInput') myInputElementRef: ElementRef;
  persona: Persona | undefined;
  trabajos: Experiencia[] = [];
  expform: FormGroup;
  expId: number;
  experiencia: Experiencia;
  buttonEdit: boolean = false;
  enExperiencias: boolean = false;



  constructor(public experienciaService: ExperienciaService, private tokenService: TokenService, private usuarioService: UsuarioService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.isLogged();
    this.buildForm();
    this.experienciaService.getListaExperiencia().subscribe(exp => this.trabajos = exp);
    this.enExperiencias = this.router.url.includes('experiencias');
  }

  //armado formulario-validaciones
  buildForm() {
    this.expform = this.formBuilder.group({
      nombrePuesto: ['', Validators.required],
      empresa: ['', Validators.required],
      ubicacion: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcionExp: ['', Validators.compose([Validators.required, Validators.maxLength(175)])]
    })
  }

  //validación de ingreso datos
  invalid(parametro: string) {
    return this.expform.get(parametro).invalid && this.expform.get(parametro).touched;
  }

  invalidError(parametro: string, param: string) {
    return this.expform.get(parametro).getError(param) && this.expform.get(parametro).touched;

  }

  redirectTo() {
    this.router.navigate(['/experiencias']);
  }

  //redirección a componente Home
  redirectToHome() {
    this.router.navigate(['']);
  }

  //apertura y cierre modal para crear experiencia
  open() {
    var myModalEl = document.querySelector('#expModal')
    var myModal = bs.Modal.getOrCreateInstance(myModalEl)
    myModal.show(); // show modal 
  }

  close() {
    this.expform.reset();
    var myModalEl = document.getElementById('expModal');
    const myModal = bs.Modal.getInstance(myModalEl);
    myModal.hide(); // hide modad
  }

  //metodo para crear experiencia
  createExp() {
    this.expform.markAllAsTouched();
    if (this.expform.valid) {
      this.experienciaService.crearExperiencia(this.expform.getRawValue()).subscribe(
        {
          next: (data) => {
            alert("Experiencia laboral creada correctamente")
            this.experienciaService.getListaExperiencia().subscribe(exp => this.trabajos = exp);
          },
          error: (err) => {
            alert("Error al añadir la experiencia")
          },
          complete: () => {
            this.close();
          }
        }
      );
    }
  }

  //buscar experiencia laboral y traer atributos para mostrar en campos del formulario
  findExpe(id: number) {
    this.experienciaService.getExperiencia(id).subscribe({
      next: (experiencia) => {
        //me devuelve una lista con los nombres de los atributos del objeto
        let attributeList = Object.keys(experiencia);
        for (let attr of attributeList) {
          if (attr != 'id') {
            this.expform.get(attr).setValue(experiencia[attr]);
          }
        }
      },
      error: (err) => {
        alert("No se pudo encontrar la experiencia laboral");
        this.close();
      }
    });
  }

  //método de apertura modal para filtrar boton de guardar experiencia laboral
  openCreate() {
    this.buttonEdit = false;
    this.open();
  }

  //apertura modal para editar y cambio de condición para filtrar botón de editar
  openEdit(id: number) {
    this.expId = id;
    this.buttonEdit = true;
    this.findExpe(id);
    var myModalEl = document.querySelector('#expModal')
    var myModal = bs.Modal.getOrCreateInstance(myModalEl)
    myModal.show(); // show modal
  }

  //editar experiencia laboral - traemos atributos a los campos del formulario
  editExpe() {
    this.expform.markAllAsTouched();
    if (this.expform.valid) {
      this.experienciaService.editarExperiencia(this.expId, this.expform.getRawValue()).subscribe({
        next: (data) => {
          alert("Experiencia laboral editada correctamente");
          this.experienciaService.getListaExperiencia().subscribe(exp => this.trabajos = exp);
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

  //borrar experiencia 
  deleteExp(id: number) {
    this.experienciaService.borrarExperiencia(id).subscribe({
      next: (exp) => {
        alert("Experiencia laboral eliminada correctamente");
        this.experienciaService.getListaExperiencia().subscribe(exp => this.trabajos = exp);
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
      isComplete: function (buffer, opts) {
        console.log('Data', buffer, opts);
      }
    }).mask(this.myInputElementRef.nativeElement);
  }

  isLogged() {
    return this.usuarioService.isLogged();
  }
}

