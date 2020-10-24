import {tipo_dato, tipo_rol} from './tipo';

export class simbolo{

    nombre:string;
    tipodato:tipo_dato;
    ambito:string;
    direccionrelativa:number;
    fila:number;
    columna:number;
    esGlobal:boolean;
    reasignable:boolean;
    



    constructor(id_e:string,tipo_d:tipo_dato,amb:string,fila:number,columna:number,esGlobal:boolean,reasignable:boolean,direccion?:number){
        this.nombre=id_e;
        this.tipodato=tipo_d;
        this.ambito=amb;
        this.fila=fila;
        this.columna=columna;
        this.esGlobal=esGlobal;
        this.reasignable= reasignable;
        this.direccionrelativa=direccion!=null?direccion:0;
    }

    
    getNombre(){
        return this.nombre;
    }

    getTipoDato(){
        return this.tipodato;
    }

    setTipoDato(tipo_d:tipo_dato){
        this.tipodato= tipo_d;
    }


    

}

export default simbolo;