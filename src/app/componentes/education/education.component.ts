import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/model/educacion.model';
import { EducacionService } from 'src/app/servicios/educacion.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  educacion: Educacion | undefined;
  titulos: Educacion[] = [];

  constructor(public educacionService: EducacionService) { }

  ngOnInit(): void {
    this.educacionService.getListaEducacion().subscribe(edu =>this.titulos = edu);
  }

}
