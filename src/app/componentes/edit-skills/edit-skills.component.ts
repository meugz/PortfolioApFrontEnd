import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as bs from 'bootstrap/dist/js/bootstrap.bundle.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill } from 'src/app/model/skill.model';
import { SkillService } from 'src/app/servicios/skill.service';
import { SkillType } from 'src/app/model/skill-type';
import { SkillLevel } from 'src/app/model/skill-level';
import { SyhLevel } from 'src/app/model/syh-level';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-skills',
  templateUrl: './edit-skills.component.html',
  styleUrls: ['./edit-skills.component.css']
})

export class EditSkillsComponent implements OnInit {
  skill: Skill;
  skills: Skill[] = [];
  eform: FormGroup;
  skillId: number;
  tipoSkill: any;
  skillTypes: any[] = [];
  idiomaLevels: any[] = [];
  syhLevels: any[] = [];
  enSkillsTabla: boolean = false;


  constructor(private skillService: SkillService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.buildForm();
    this.cargarSelectTipo();
    this.cargarSelectNivel();
    this.cargarSelectNivelHyS();
    this.skillService.getListaSkill().subscribe(skill => this.skills = skill);
    this.enSkillsTabla = this.router.url.includes('skills/tabla');
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

  buildForm() {
    this.eform = this.formBuilder.group({
      nombreSkill: ['', Validators.required],
      nivel: ['', Validators.required],
      tipo: ['', Validators.required],
      descripcionSkill: ['', Validators.compose([Validators.required, Validators.maxLength(175)])]
    });
  }

  editarSkill() {
    this.eform.markAllAsTouched();
    if (this.eform.valid) {
      this.skillService.editarSkill(this.skillId, this.eform.getRawValue()).subscribe({
        next: (data) => {
          alert("La habilidad ha sido editada correctamente");
          this.skillService.getListaSkill().subscribe(skill => this.skills = skill);
        },
        error: (err) => {
          alert("Error al editar la habilidad");
        },
        complete: () => {
          this.close();
        }
      });
    }
  }

  deleteSkill(id: number) {
    this.skillService.borrarSkill(id).subscribe({
      next: (skill) => {
        alert("La habilidad ha sido eliminada");
        this.skillService.getListaSkill().subscribe(skill => this.skills = skill);
      },
      error: (err) => {
        alert("Error al eliminar la habilidad");
      }
    });
  }

  invalid(parametro: string) {
    return this.eform.get(parametro).invalid && this.eform.get(parametro).touched;
  }

  invalidError(parametro: string, param: string) {
    return this.eform.get(parametro).getError(param) && this.eform.get(parametro).touched;

  }

  open(id: number) {
    this.skillId = id;
    this.findSkill(id);
    var myModalEl = document.querySelector('#exampleModal');
    var myModal = bs.Modal.getOrCreateInstance(myModalEl);
    myModal.show(); // show modal
  }

  close() {
    this.eform.reset();
    var myModalEl = document.getElementById('exampleModal');
    const myModal = bs.Modal.getInstance(myModalEl);
    myModal.hide(); // hide modal
  }

  findSkill(id: number) {
    this.skillService.getSkill(id).subscribe({
      next: (skill) => {
        //me devuelve una lista con los nombres de los atributos del objeto
        let attributeList = Object.keys(skill);
        for (let attr of attributeList) {
          if (attr != 'id' && attr != 'percentNivel') {
            this.eform.get(attr).setValue(skill[attr]);
            if (attr == 'tipo') {
              this.tipoSkill = skill[attr];
            }
          }
        }
      },
      error: (err) => {
        alert("No se pudo encontrar la habilidad");
        this.close();
      }
    });
  }

  onTipo(tipo: any) {
    this.tipoSkill = tipo.target.value;
    console.log(tipo.target.value);
  }

  redirectTo() {
    this.router.navigate(['/skills']);
  }

}
