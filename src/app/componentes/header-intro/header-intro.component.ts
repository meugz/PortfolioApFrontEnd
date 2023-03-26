import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/servicios/persona.service';
import { environment } from 'src/environments/environment';
import * as bs from 'bootstrap/dist/js/bootstrap.bundle.js';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { TokenService } from 'src/app/servicios/token.service';
import { ImgPerfilService } from 'src/app/servicios/img-perfil.service';
import { ImageNameDto } from 'src/app/model/ImageNameDto.model';
import { HttpRequest } from '@angular/common/http';



@Component({
  selector: 'app-header-intro',
  templateUrl: './header-intro.component.html',
  styleUrls: ['./header-intro.component.css']
})
export class HeaderIntroComponent implements OnInit {

  personas: Persona[] = [];
  eForm: FormGroup;
  personaId: number;
  imgPath: string = environment.fireImgPath;
  mediaToken: string = environment.mediaToken;
  persona: Persona | undefined;



  constructor(private imgPerfilService: ImgPerfilService, private activatedRouter: ActivatedRoute, private personaService: PersonaService, private tokenService: TokenService, private usuarioService: UsuarioService, private formBuilder: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.buildForm();
    this.isLogged();
    this.personaService.getPersona().subscribe(data => {
      this.persona = data;
    })
  }
  //construccion formulario
  buildForm() {
    this.eForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      ocupacion: ['', Validators.required],
      foto: ['', Validators.compose([Validators.required])]

    })
  }
  //validaciones formulario 
  invalid(parametro: string) {
    return this.eForm.get(parametro).invalid && this.eForm.get(parametro).touched;
  }

  invalidError(parametro: string, param: string) {
    return this.eForm.get(parametro).getError(param) && this.eForm.get(parametro).touched;
  }

  //editar perfil - campos texto recargados en formulario
  editarPerfil() {
    this.eForm.markAllAsTouched();
    if (this.eForm.valid) {
      this.personaService.editarPersona(this.personaId, this.eForm.getRawValue()).subscribe({
        next: (data) => {
          alert("El perfil ha sido editado correctamente");
          this.personaService.getPersona().subscribe(persona => this.persona = persona);
        },
        error: (err) => {
          alert("Error al editar perfil.");
        },
        complete: () => {
          this.close();
        }
      });
    }
  }

  //apertura y cierre modal para editar perfil texto 
  open(id: number) {
    this.personaId = id;
    console.log(this.personaId);
    this.findPersona(id);
    var myModalEl = document.querySelector('#perfilModal');
    var myModal = bs.Modal.getOrCreateInstance(myModalEl);
    myModal.show(); // show modal
  }

  close() {
    this.eForm.reset();
    var myModalEl = document.getElementById('perfilModal');
    const myModal = bs.Modal.getInstance(myModalEl);
    myModal.hide(); // hide modal
  }

  findPersona(id: number) {
    this.personaService.getPersonaById(id).subscribe({
      next: (persona) => {
        console.log(persona)
        //me devuelve una lista con los nombres de los atributos del objeto
        let attributeList = Object.keys(persona);
        for (let attr of attributeList) {
          if (attr == 'nombre' || attr == 'apellido' || attr == 'ocupacion') {
            this.eForm.get(attr).setValue(persona[attr]);
          }
        }
      },
      error: (err) => {
        alert("No se pudo encontrar la información de la persona");
        this.close();
      }
    });
  }

  //control login
  isLogged() {
    return this.usuarioService.isLogged();
  }

  //seccion subir foto de perfil///////////////////

  //abrir modal para cambiar foto
  openModalPhoto() {
    var myModalEl = document.querySelector('#perfilPhotoModal');
    var myModal = bs.Modal.getOrCreateInstance(myModalEl);
    myModal.show(); // show modal
  }

  closeModalPhoto() {
    this.eForm.reset();
    var myModalEl = document.getElementById('perfilPhotoModal');
    const myModal = bs.Modal.getInstance(myModalEl);
    myModal.hide(); // hide modal
  }

  //metodo para guardar foto en storage de firebase y  bd back-end 
  uploadImage(event: any) {
    const file = event.target.files[0];
    const formdata = new FormData();
    formdata.append('image', file);
    this.imgPerfilService.savePhoto(formdata).subscribe((resp: ImageNameDto) => {
      console.log(resp);
      this.personaService.editarFoto(1, resp).subscribe((persona: Persona) => this.persona = persona);
    }
    );
  }
}

