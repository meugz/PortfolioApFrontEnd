export class Curso{
    id?: number;
    nombre: String;
    institucion: String;
    periodo: String;
    descripcion: String;
 
    constructor(nombre: String, institucion: String, periodo: String, descripcion: String){
     this.nombre = nombre;
     this.institucion = institucion;
     this.periodo = periodo;
     this.descripcion = descripcion;
    }
 }