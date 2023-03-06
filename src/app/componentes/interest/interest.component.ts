import { Component, OnInit } from '@angular/core';
import { Interes } from 'src/app/model/interes.model';
import { Persona } from 'src/app/model/persona.model';
import { InteresService } from 'src/app/servicios/interes.service';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css']
})
export class InterestComponent implements OnInit {
  interes: Interes | undefined;
  intereses: Interes[] = [];


  constructor(public interesService: InteresService) { }

  ngOnInit(): void {
    this.interesService.getListaInteres().subscribe(interes =>this.intereses= interes);
  }

}
