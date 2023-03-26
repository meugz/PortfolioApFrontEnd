import { SkillType } from "./skill-type";

export class Skill{
    id?: number;
    nombreSkill: string;
    nivel: string;
    percentNivel: number;
    tipo: SkillType;
    descripcionSkill: string; 

    constructor(nombreSkill: string, nivel: string, percentNivel:number, tipo:SkillType, descripcionSkill: string){
        this.nombreSkill = nombreSkill;
        this.nivel = nivel;
        this.percentNivel = percentNivel;
        this.tipo = tipo;
        this.descripcionSkill = descripcionSkill;
    }
}