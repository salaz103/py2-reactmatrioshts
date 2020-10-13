export class funcion{
    nombre:string;
    nuevonombre:string;

    constructor(id:string){
        this.nombre=id;
        this.nuevonombre="";
    }

    setNuevoNombre(nuevo:string){
        this.nuevonombre=nuevo;
    }

    getNuevoNombre():string{
        return this.nuevonombre;
    }

}