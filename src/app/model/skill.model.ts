export class Skill{
    id?: number;
    nombreSkill: String;
    nivel: String;
    descripcionSkill: String; 

    constructor(nombreSkill: String, nivel: String, descripcionSkill: String){
        this.nombreSkill = nombreSkill;
        this.nivel = nivel;
        this.descripcionSkill = descripcionSkill;
    }
}