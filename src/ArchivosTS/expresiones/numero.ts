import { tipo_valor } from "../entorno/tipo";
import {almacen} from '../../../src/app';
import {agregarcodigo3d} from '../../actions/ts.js';
import {generartmp} from '../helpers/helpers';
import expresion from "./expresion";
import { traduccionexp } from "./traduccionexp";
import entorno from "../entorno/entorno";

export class numero implements expresion{

    valor:number;
    tipovalor:tipo_valor;

    constructor(valor:number,tipo:tipo_valor){
        this.valor=valor;
        this.tipovalor=tipo;
    }
    traducir(ambito: entorno) {
        //return new Number(this.valor);
        let temporal= generartmp();
        let c3d:string= temporal+" ="+this.valor+";\n";
        //console.log(c3d);
        almacen.dispatch(agregarcodigo3d(c3d));
        //console.log(almacen.getState());
        return new traduccionexp(temporal,tipo_valor.NUMBER,false,[],[]);
    }



}