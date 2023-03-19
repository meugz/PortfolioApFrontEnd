import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/servicios/persona.service';
import { environment } from 'src/environments/environment';
import * as bs from 'bootstrap/dist/js/bootstrap.bundle.js';

@Component({
  selector: 'app-header-intro',
  templateUrl: './header-intro.component.html',
  styleUrls: ['./header-intro.component.css']
})
export class HeaderIntroComponent implements OnInit {
  persona: Persona | undefined;
  personas: Persona[] = [];
  eForm: FormGroup;
  personaId: number;

  constructor(public personaService: PersonaService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.buildForm(); 
    this.personaService.getPersona().subscribe(data => {
    this.persona = data;
    this.persona.foto = environment.imgBasePath+this.persona.foto;
      
    })
    
  }


  buildForm() {
    this.eForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      ocupacion: ['', Validators.required],
      foto: ['', Validators.compose([Validators.required])]

    })
  }

  invalid(parametro: string) {
    return this.eForm.get(parametro).invalid && this.eForm.get(parametro).touched;
  }

  invalidError(parametro: string, param: string) {
    return this.eForm.get(parametro).getError(param) && this.eForm.get(parametro).touched;

  }

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
          if (attr == 'nombre' || attr == 'apellido' || attr == 'ocupacion' || attr == 'foto') {
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
 


}
