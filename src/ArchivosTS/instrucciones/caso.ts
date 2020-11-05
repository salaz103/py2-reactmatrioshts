import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";

export class caso{

    exp:expresion;
    listainstrucciones:instruccion[];
    linea:number;
    columna:number;
    
    
    constructor(condicion:expresion,listai:instruccion[],linea:number,columna:number){
        this.exp=condicion;
        this.listainstrucciones=listai;
        this.linea=linea;
        this.columna=columna;
    }

}