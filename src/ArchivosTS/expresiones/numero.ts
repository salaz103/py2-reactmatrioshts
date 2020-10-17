import { tipo_valor } from "../entorno/tipo";
import {almacen} from '../../../src/app';
import {agregarcodigo3d} from '../../actions/ts.js';

export class numero implements nodoast{

    valor:number;
    tipovalor:tipo_valor;

    constructor(valor:number,tipo:tipo_valor){
        this.valor=valor;
        this.tipovalor=tipo;
    }

    

    traducir() {
        throw new Error("Method not implemented.");
    }

}