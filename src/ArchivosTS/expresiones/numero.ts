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

        //EL VALOR PUEDE QUE SEA ENTERO Y DECIMAL, PRIMERO TENEMOS QUE VER QUE TIPO ES
        let ret:traduccionexp= new traduccionexp(this.valor.toString(),false,tipo_dato.UNDEFINED,false);
        if(Number.isInteger(this.valor)){
            ret.tipodato=tipo_dato.ENTERO;
        }else{
            ret.tipodato=tipo_dato.DECIMAL;
        }
        
        return ret;
    }



}