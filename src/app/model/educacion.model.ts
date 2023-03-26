export class Educacion{
   id?: number;
   nombreEdu: String;
   institucionEdu: String;
   periodoEdu: String;
   descripcionEdu: String;

   constructor(nombreEdu: String, institucionEdu: String, periodoEdu: String, descripcionEdu: String){
    this.nombreEdu = nombreEdu;
    this.institucionEdu = institucionEdu;
    this.periodoEdu = periodoEdu;
    this.descripcionEdu = descripcionEdu;
   }
}