import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as bs from 'bootstrap/dist/js/bootstrap.bundle.js';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/servicios/persona.service';
import Inputmask from 'inputmask';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChild('dateNacInput') myInputElementRef: ElementRef;
  persona: Persona | undefined;
  personas: Persona[] = [];
  eform: FormGroup;
  personaId: number;
  

  constructor(private personaService: PersonaService, private tokenService: TokenService, private usuarioService: UsuarioService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.isLogged();
    this.buildForm();
    this.personaService.getPersona().subscribe(data => { this.persona = data })
  }

  //armado formulario-validaciones
  buildForm() {
    this.eform = this.formBuilder.group({
      email: ['', Validators.required],
      ciudad: ['', Validators.required],
      fechaNac: ['', Validators.required],
      descripcion: ['', Validators.compose([Validators.required, Validators.maxLength(200)])]

    })
  }

  //validaciones en inputs 
  invalid(parametro: string) {
    return this.eform.get(parametro).invalid && this.eform.get(parametro).touched;
  }

  invalidError(parametro: string, param: string) {
    return this.eform.get(parametro).getError(param) && this.eform.get(parametro).touched;
  }

  //método para traer datos a los campos del formulario y editarlos
  editarPersona() {
    this.eform.markAllAsTouched();
    if (this.eform.valid) {
      this.personaService.editarPersona(this.personaId, this.eform.getRawValue()).subscribe({
        next: (data) => {
          alert("La persona ha sido editada correctamente");
          this.personaService.getPersona().subscribe(persona => this.persona = persona);
        },
        error: (err) => {
          alert("Error al editar la persona");
        },
        complete: () => {
          this.close();
        }
      });
    }
  }

  //abrir modal con formulario de edición - traemos el id por parámetro
  open(id: number) {
    this.personaId = id;
    console.log(this.personaId);
    this.findPersona(id);
    var myModalEl = document.querySelector('#personModal');
    var myModal = bs.Modal.getOrCreateInstance(myModalEl);
    myModal.show(); // show modal
  }

  //cerrar modal con formulario de edición
  close() {
    this.eform.reset();
    var myModalEl = document.getElementById('personModal');
    const myModal = bs.Modal.getInstance(myModalEl);
    myModal.hide(); // hide modal
  }

  //buscar por id para conseguir los atributos. Luego se llamar el método al abrir el formulario
  findPersona(id: number) {
    this.personaService.getPersonaById(id).subscribe({
      next: (persona) => {
        console.log(persona)
        //me devuelve una lista con los nombres de los atributos del objeto
        let attributeList = Object.keys(persona);
        for (let attr of attributeList) {
          if (attr == 'fechaNac' || attr == 'descripcion' || attr == 'ciudad' || attr == 'email') {
            this.eform.get(attr).setValue(persona[attr]);
          }
        }
      },
      error: (err) => {
        alert("No se pudo encontrar la persona");
        this.close();
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

  //corroborar si inicio sesion
  isLogged(){
    return this.usuarioService.isLogged();
  }
  
}
