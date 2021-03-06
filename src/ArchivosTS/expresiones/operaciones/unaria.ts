import entorno from "../../entorno/entorno";
import { operador, tipo_dato } from "../../entorno/tipo";
import expresion from "../expresion";
import {almacen} from '../../../../src/app';
import {errores} from '../../../actions/ts.js';
import { traduccionexp } from "../traduccionexp";


export class unaria implements expresion{

    tipodato:tipo_dato;
    expresionderecha:expresion;
    tipooperador:operador;
    linea:number;
    columna:number;

    constructor(op:operador,expder:expresion,linea:number,columna:number){
        this.expresionderecha= expder;
        this.tipooperador=op;
        this.linea=linea;
        this.columna=columna;
    }


    traducir(ambito: entorno){
        const retornoexp= this.expresionderecha.traducir(ambito);
        console.log(retornoexp);
        if(this.tipooperador==operador.MENOS){

            if(retornoexp.tipodato==tipo_dato.ENTERO || retornoexp.tipodato==tipo_dato.DECIMAL){
                
                return new traduccionexp("-"+retornoexp.obtenerValor(),retornoexp.es_temporal,retornoexp.tipodato,retornoexp.tiene_etiquetas);
            }else{
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'OPERADOR NEGATIVO SOLO ES APLICABLE A NUMBER',
                    ambito:ambito.nombre,
                    linea:this.linea,
                    columna:this.columna
                }));
            }

        }else if(this.tipooperador==operador.NOT){

            if(retornoexp.tipodato==tipo_dato.BOOLEAN){
                const retval= new traduccionexp("",false,tipo_dato.BOOLEAN,true);
                retval.etiquetastrue=retornoexp.etiquetasfalse;
                retval.etiquetasfalse= retornoexp.etiquetastrue;
                return retval;

            }else{
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'OPERADOR NOT SOLO ES APLICABLE A BOOLEAN',
                    ambito:ambito.nombre,
                    linea:this.linea,
                    columna:this.columna
                }));
            }

        }


        return new traduccionexp("",false,tipo_dato.UNDEFINED,false);
    }

}