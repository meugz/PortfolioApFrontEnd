import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  enContacto: boolean = false;

  constructor( private router: Router) { }

  ngOnInit(): void {
    this.enContacto = this.router.url.includes('contacto');
  }

  // redirectToHome(){
  //   this.router.navigate(['']);
  // }
}
