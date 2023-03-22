import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/model/skill.model';
import { SkillService } from 'src/app/servicios/skill.service';
import * as bs from 'bootstrap/dist/js/bootstrap.bundle.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SkillType } from 'src/app/model/skill-type';
import { SkillLevel } from 'src/app/model/skill-level';
import { SyhLevel } from 'src/app/model/syh-level';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  //skill: Skill = new Skill('', '', null, '', '');
  skills: Skill[] = [];
  addform: FormGroup;
  skillTypes: any[] = [];
  idiomaLevels: any[] = [];
  syhLevels: any[] = [];
  tipoSkill: any;
  enSkills: boolean = false;
  
  constructor(public skillService: SkillService, private tokenService: TokenService, private usuarioService: UsuarioService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.isLogged();
    this.buildForm();
    this.cargarSelectTipo();
    this.cargarSelectNivel();
    this.cargarSelectNivelHyS();
    //this.filtrarSelect(); 
    this.skillService.getListaSkill().subscribe(skill => this.skills = skill);
    this.enSkills = this.router.url.includes('skills');
  }

  onTipo(tipo: any) {
    this.tipoSkill = tipo.target.value;
    console.log(tipo.target.value);
  }

  cargarSelectTipo() {
    for (let tipo in SkillType) {
      this.skillTypes.push({ text: tipo, value: SkillType });
    }
  }
  cargarSelectNivel() {
    for (let nivelI in SkillLevel) {
      this.idiomaLevels.push({ text: nivelI, value: SkillLevel });
    }
  }

  cargarSelectNivelHyS() {
    for (let nivelHyS in SyhLevel) {
      this.syhLevels.push({ text: nivelHyS, value: SyhLevel[nivelHyS] });
    }
  }

  // filtrarSelect() {
  //   if (this.tipoSkill == 'IDIOMAS') {
  //     this.cargarSelectNivel();
  //   } else {
  //     console.log(false);
  //     this.cargarSelectNivelHyS();
  //   }
  // }

  buildForm() {
    this.addform = this.formBuilder.group({
      nombreSkill: ['', Validators.required],
      nivel: ['', Validators.required],
      tipo: ['', Validators.required],
      descripcionSkill: ['', Validators.compose([Validators.required, Validators.maxLength(175)])]
    })
  }

  createSkill() {
    this.addform.markAllAsTouched();
    if (this.addform.valid) {
      this.skillService.crearSkill(this.addform.getRawValue()).subscribe(
        {
          next: (data) => {
            alert("Habilidad creada correctamente");
            this.skillService.getListaSkill().subscribe(skill => this.skills = skill);
          },
          error: (err) => {
            alert("Error al añadir la habilidad");
          },
          complete: () => {
            this.close();
          }
        }
      );
    }
  }

  invalid(parametro: string) {
    return this.addform.get(parametro).invalid && this.addform.get(parametro).touched;
  }

  invalidError(parametro: string, param: string) {
    return this.addform.get(parametro).getError(param) && this.addform.get(parametro).touched;
  }

  redirectTo() {
    this.router.navigate(['/skills']);
  }

  redirectToTable() {
    this.router.navigate(['/skills/tabla']);
  }

  redirectToHome(){
    this.router.navigate(['']);
  }

  openCreate() {
    this.open();
  }

  open() {
    var myModalEl = document.querySelector('#exampleModal')
    var myModal = bs.Modal.getOrCreateInstance(myModalEl)
    myModal.show(); // show modal
  }

  close() {
    this.addform.reset();
    var myModalEl = document.getElementById('exampleModal');
    const myModal = bs.Modal.getInstance(myModalEl);
    myModal.hide(); // hide modal
  }

  isLogged(){
    return this.usuarioService.isLogged();
  }
  


}
