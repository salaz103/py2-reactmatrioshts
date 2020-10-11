import instruccion from './instruccion';
import expresion from '../expresiones/expresion';
import entorno from '../entorno/entorno';
import {codigoconsola} from '../../actions/ts.js';
import {almacen} from '../../../src/app';

export class imprimir implements instruccion{

    linea:number;
    columna:number;
    storeglobal = almacen;
    expresion:expresion;

    constructor(expresion:expresion){
        this.expresion=expresion;
    }

    ejecutar(ambito:entorno){
        const exp= this.expresion.obtenerValor(ambito);
        let resultado= "> "+ String(exp)+"\n";
        this.storeglobal.dispatch(codigoconsola(resultado));
        return null;
    }

}