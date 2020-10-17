import entorno from "../entorno/entorno";
import { tipo_variable } from "../entorno/tipo";
import instruccion from "./instruccion";

export class declaracion implements instruccion{

    tipovariable:tipo_variable;
    //EL ARREGLO NO TIENE UN TIPO ESPECÍFICO POR QUE PUEDE QUE VENGA VARIABLE NORMAL O ARREGLO
    variables:[];


    constructor(tipov:tipo_variable,vars:[]){
        this.tipovariable=tipov;
        this.variables= vars;
    }


    traducir(ambito: entorno) {
        console.log("TRADUCCION DE DECLARACION");
    }

}