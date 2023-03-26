import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Interes } from '../model/interes.model';
import { InteresService } from '../servicios/interes.service';
import * as bs from 'bootstrap/dist/js/bootstrap.bundle.js';

@Component({
  selector: 'app-interes-edit',
  templateUrl: './interes-edit.component.html',
  styleUrls: ['./interes-edit.component.css']
})
export class InteresEditComponent implements OnInit {
  interes: Interes | undefined;
  intereses: Interes[] = [];
  interestForm: FormGroup;
  buttonEdit: boolean;
  interesId: number;
  enInteresesTabla: boolean = false;

  constructor(private interesService: InteresService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
    this.interesService.getListaInteres().subscribe(interes => this.intereses = interes);
    this.enInteresesTabla = this.router.url.includes('intereses/tabla');
  }

  //armado formulario-validaciones
  buildForm() {
    this.interestForm = this.formBuilder.group({
      descripcionInteres: ['', Validators.compose([Validators.required, Validators.maxLength(175)])]
    })
  }
  //validación de ingreso datos
  invalid(parametro: string) {
    return this.interestForm.get(parametro).invalid && this.interestForm.get(parametro).touched;
  }

  invalidError(parametro: string, param: string) {
    return this.interestForm.get(parametro).getError(param) && this.interestForm.get(parametro).touched;
  }

  close() {
    this.interestForm.reset();
    var myModalEl = document.getElementById('intEditModal');
    const myModal = bs.Modal.getInstance(myModalEl);
    myModal.hide(); // hide modad
  }

  //apertura modal para editar
  openEdit(id:number) {
    this.interesId = id;
    this.buttonEdit = true;
    this.findInterest(id);
    var myModalEl = document.querySelector('#intEditModal')
    var myModal = bs.Modal.getOrCreateInstance(myModalEl)
    myModal.show(); // show modal
  }

  //buscar interés 
  findInterest(id: number) {
    this.interesService.getInteres(id).subscribe({
      next: (interes) => {
        //me devuelve una lista con los nombres de los atributos del objeto
        let attributeList = Object.keys(interes);
        for (let attr of attributeList) {
          if (attr != 'id') {
            this.interestForm.get(attr).setValue(interes[attr]);
          }
        } 
      },
      error: (err) => {
        alert("No se pudo encontrar el interés.");
        this.close();
      }
    });
  }

  //editar interés
  editInterest() {
    this.interestForm.markAllAsTouched();
    if (this.interestForm.valid) {
      this.interesService.editarInteres(this.interesId, this.interestForm.getRawValue()).subscribe({
        next: (data) => {
          alert("Interés editado correctamente.");
          this.interesService.getListaInteres().subscribe(interes => this.intereses = interes);
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

  //borrar interés 
  deleteInterest(id: number) {

    this.interesService.borrarInteres(id).subscribe({
      next: (interes) => {
        alert("Interés eliminado correctamente.");
        this.interesService.getListaInteres().subscribe(interes => this.intereses = interes);
      },
      error: (err) => {
        alert("Error al eliminar el interés.");
      }
    });
  }

  
  redirectTo() {
    this.router.navigate(['/intereses']);
  }


}
