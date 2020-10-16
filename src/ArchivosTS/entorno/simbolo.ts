import {tipo_valor, tipo_rol} from './tipo';

export class simbolo{

    nombre:string;
    tipovalor:tipo_valor;
    ambito:string;
    Rol:tipo_rol;
    apuntador:number;
    fila:number;
    columna:number;
    



    constructor(id_e:string,tipo_e:tipo_valor,amb:string,r:tipo_rol,fila:number,columna:number,direccion?:number){
        this.nombre=id_e;
        this.tipovalor=tipo_e;
        this.ambito=amb;
        this.fila=fila;
        this.columna=columna;
        this.apuntador=direccion!=null?direccion:0;
    }

    
    getNombre(){
        return this.nombre;
    }

    getTipo(){
        return this.tipovalor;
    }

    setTipo(tipo:tipo_valor){
        this.tipovalor= tipo;
    }


    

}

export default simbolo;