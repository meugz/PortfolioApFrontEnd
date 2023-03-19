export class Persona{
    id?:number;
    nombre: String;
    apellido: String;
    email: String;
    ocupacion: String;
    ciudad: String;
    fechaNac: String;
    descripcion: String;
    foto: String; 
   
    constructor(nombre: String, apellido: String, email: String, ocupacion: String, ciudad: String, fechaNac: String, descripcion: String, foto: String){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.ocupacion = ocupacion;
        this.ciudad = ciudad;
        this.fechaNac = fechaNac;
        this.descripcion = descripcion;
        this.foto = foto;    
    }
   
}