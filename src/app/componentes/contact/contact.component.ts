import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  enContacto: boolean = false;
  @ViewChild('name', {static: false}) name: ElementRef;
  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('message', {static: false}) message: ElementRef;

  constructor( private router: Router) { }

  ngOnInit(): void {
    this.enContacto = this.router.url.includes('contacto');
  }

  enviar(){
    this.name.nativeElement.value = "";
    this.email.nativeElement.value = "";
    this.message.nativeElement.value = "";
  }

  
}
