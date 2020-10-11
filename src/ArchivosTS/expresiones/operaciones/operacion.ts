import expresion from "../expresion";
import {operador} from "../../entorno/tipo";

export default class operacion{

expresionizquierda:expresion;
expresionderecha:expresion;
tipooperador:operador;

    constructor(expiz:expresion,op:operador,expder?:expresion){
        this.expresionizquierda= expiz;
        this.tipooperador= op;
        this.expresionderecha= expder;
    }

}