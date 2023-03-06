import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/model/skill.model';
import { SkillService } from 'src/app/servicios/skill.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skills: Skill[]=[];

  constructor(public skillService: SkillService) { }

  ngOnInit(): void {
    this.skillService.getListaSkill().subscribe(skill =>this.skills=skill);
  }

}
