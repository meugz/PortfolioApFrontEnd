import { Persona } from "./persona.model";

export class Experiencia{
   nombrePuesto: String;
   empresa: String;
   ubicacion: String; 
   fecha: Date; 
   descripcionExp: String;
 

   constructor(nombrePuesto: String, empresa: String, ubicacion: String, fecha: Date, descripcionExp: String, ){
        this.nombrePuesto = nombrePuesto;
        this.empresa = empresa;
        this.ubicacion = ubicacion; 
        this.fecha = fecha; 
        this.descripcionExp = descripcionExp;
       
   }
}