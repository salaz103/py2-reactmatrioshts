import entorno from "../entorno/entorno";
import { tipo_valor } from "../entorno/tipo";
import expresion from "./expresion";
import {almacen} from '../../../src/app';
import {errores} from '../../actions/ts.js';

export class operadorternario implements expresion{

    condicion:expresion;
    expresiontrue:expresion;
    expresionfalse:expresion;
    tipo:tipo_valor;

    constructor(c:expresion,et:expresion,ef:expresion){
        this.condicion=c;
        this.expresiontrue=et;
        this.expresionfalse=ef;
    }



    obtenerValor(ambito: entorno): object {
        //LO PRIMERO ES EVALUAR LA CONDICION, PARA VALIDAR ERRORES, ESTA DEBE SER BOOLEANA 
        let valorcondicion= this.condicion.obtenerValor(ambito);
        let tipo= this.condicion.obtenerTipo(ambito);
        if(tipo==tipo_valor.BOOLEAN){
            //SIGNIFICA QUE LA CONDICION SI ES BOOLEAN Y AHORA LA TENEMOS QUE VALIDAR PARA VER QUE DEVOLVEMOS
            if(valorcondicion.valueOf()){
                //SI LA CONDICION ES TRUE, DEVOLVEMOS EL VALOR DE LA PRIMERA EXPRESION
                let valor= this.expresiontrue.obtenerValor(ambito);
                this.tipo= this.expresiontrue.obtenerTipo(ambito);
                return valor;
            }else{
                //SIGNIFCA QUE DEVOLVEREMOS EL VALOR DE LA SEGUNDA FUNCION
                let valor= this.expresionfalse.obtenerValor(ambito);
                this.tipo= this.expresionfalse.obtenerTipo(ambito);
                return valor;
            }

        }else{
            //ERROR - LA CONDICION DEBE SER BOOLEANA
            almacen.dispatch(errores({
                tipo:'SEMANTICO',
                descripcion:'LA CONDICION EN EL OPERADOR TERNARIO NO ES BOOLEANA',
                ambito:ambito.nombre
            }));
            return null;
        }
    }


    obtenerTipo(ambito: entorno): tipo_valor {
        return this.tipo;
    }

    

}