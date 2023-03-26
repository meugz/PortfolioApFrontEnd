import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Interes } from 'src/app/model/interes.model';
import { InteresService } from 'src/app/servicios/interes.service';
import * as bs from 'bootstrap/dist/js/bootstrap.bundle.js';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css']
})
export class InterestComponent implements OnInit {
  interes: Interes | undefined; //ver si esto en el html esta bien para pasar el id por parámetro
  intereses: Interes[] = [];
  interestForm: FormGroup;
  buttonEdit: boolean;
  interesId: number;
  enIntereses: boolean = false;
  estaVacio: boolean = false;
 
 

  constructor(private interesService: InteresService, private tokenService: TokenService, private usuarioService: UsuarioService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.isLogged();
    this.buildForm();
    this.interesService.getListaInteres().subscribe(interes => this.intereses = interes);
    this.enIntereses = this.router.url.includes('intereses');
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

  redirectTo() {
    this.router.navigate(['/intereses']);
  }

  redirectToTable() {
    this.router.navigate(['/intereses/tabla']);
  }

  redirectToHome() {
    this.router.navigate(['']);
  }

  openCreate() {
    this.open();
  }

  //apertura y cierre modal para crear intereses
  open() {
    this.buttonEdit = false;
    var myModalEl = document.querySelector('#interestModal')
    var myModal = bs.Modal.getOrCreateInstance(myModalEl)
    myModal.show(); // show modal
  }

  close() {
    this.interestForm.reset();
    var myModalEl = document.getElementById('interestModal');
    const myModal = bs.Modal.getInstance(myModalEl);
    myModal.hide(); // hide modad
  }

  //metodo para interes
  createInterest() {
    this.interestForm.markAllAsTouched();
    if (this.interestForm.valid) {
      this.interesService.crearInteres(this.interestForm.getRawValue()).subscribe(
        {
          next: (data) => {
            alert("Interés creado correctamente.")
            this.router.navigate(['/intereses']);
            this.interesService.getListaInteres().subscribe(interes => this.intereses = interes);
          },
          error: (err) => {
            alert("Error al añadir el interés.")
            this.router.navigate(['/intereses']);
          },
          complete: () => {
            this.close();
          }
        }
      );
    }
  }

  isLogged(){
    return this.usuarioService.isLogged();
  }

}
