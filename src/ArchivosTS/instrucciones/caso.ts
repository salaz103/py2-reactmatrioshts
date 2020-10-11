import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";

export class caso{

    exp:expresion;
    listainstrucciones:instruccion[];
    
    
    constructor(condicion:expresion,listai:instruccion[]){
        this.exp=condicion;
        this.listainstrucciones=listai;
    }

}