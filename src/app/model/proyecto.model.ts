export class Proyecto{
    id?: number;
    nombreProyecto: String;
	fecha: Date;
	descripcionProyecto: String;
	url: String;

    constructor(nombreProyecto: String, fecha: Date, descripcionProyecto: String, url: String){
        this.nombreProyecto = nombreProyecto;
        this.fecha = fecha;
        this.descripcionProyecto =descripcionProyecto;
        this.url = url;
    }
}
