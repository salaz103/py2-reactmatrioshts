import { tipo_dato } from "../entorno/tipo";
import {almacen} from '../../../src/app';
import {agregarcodigo3d} from '../../actions/ts.js';
import {generartmp} from '../helpers/helpers';
import expresion from "./expresion";
import { traduccionexp } from "./traduccionexp";
import entorno from "../entorno/entorno";

export class numero implements expresion{

    valor:number;
    tipodato:tipo_dato;
    linea:number;
    columna:number;

    constructor(valor:number,tipo:tipo_dato,linea:number,columna:number){
        this.valor=valor;
        this.tipodato=tipo;
        this.linea=linea;
        this.columna=columna;

    }
    traducir(ambito: entorno) {
        ///TODAS LAS CLASES QUE HEREDEN DE EXPRESION SIEMPRE ANTES DE TRADUCIRLAS
        // SE LES COLOCARA EL TIPO 
        //EN ESTE CASO POR SER UN PRIMITIVO EL TIPO YA LO TIENEN DE FIJO
        return new traduccionexp(this.valor.toString(),false,this.tipodato,false);
    }



}