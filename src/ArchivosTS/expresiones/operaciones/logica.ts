import entorno from "../../entorno/entorno";
import { operador, tipo_dato } from "../../entorno/tipo";
import expresion from "../expresion";
import operacion from "./operacion";
import {almacen} from '../../../../src/app';
import {errores} from '../../../actions/ts.js';
import { generacion } from "../../helpers/generacion";
import { traduccionexp } from "../traduccionexp";

export class logica extends operacion implements expresion{


    linea:number;
    columna:number;
    tipodato:tipo_dato;

    constructor(expiz:expresion,op:operador,expder:expresion,linea:number,columna:number){
        super(expiz,op,expder);
        this.linea=linea;
        this.columna=columna;
    }


    traducir(ambito: entorno) {
        const generador= generacion.getGenerador();


        //PRIMERO VEMOS SI ES AND,OR
        if(this.tipooperador==operador.AND){
            let retornoizquierdo= this.expresionizquierda.traducir(ambito);
            
            if(retornoizquierdo.tipodato==tipo_dato.BOOLEAN){
                generador.agregarEtiqueta(retornoizquierdo.etiquetastrue);
                let retornoderecho= this.expresionderecha.traducir(ambito);
                if(retornoderecho.tipodato==tipo_dato.BOOLEAN){
                    generador.agregarEtiqueta(retornoizquierdo.etiquetasfalse);
                    generador.agregarGoTo(retornoderecho.etiquetasfalse);
                    const retorno= new traduccionexp("",false,tipo_dato.BOOLEAN,true);
                    retorno.etiquetastrue= retornoderecho.etiquetastrue;
                    retorno.etiquetasfalse= retornoderecho.etiquetasfalse;
                    return retorno;
                }else{
                    almacen.dispatch(errores({
                        tipo:'SEMANTICO',
                        descripcion:'2DO OPERADOR EN && NO ES BOOLEAN, SE RECIBIO: '+ retornoderecho.tipodato,
                        ambito:ambito.nombre,
                        linea:this.linea,
                        columna: this.columna
                    }));
                    generador.agregarEtiqueta(retornoizquierdo.etiquetasfalse);
                    return new traduccionexp("",false,tipo_dato.UNDEFINED,false);
                }

            }else{
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'1ER OPERADOR EN && NO ES BOOLEAN, SE RECIBIO: '+ retornoizquierdo.tipodato,
                    ambito:ambito.nombre,
                    linea:this.linea,
                    columna: this.columna
                }));
                return new traduccionexp("",false,tipo_dato.UNDEFINED,false);
            }
           
    
        }else if(this.tipooperador==operador.OR){
            let retornoizquierdo= this.expresionizquierda.traducir(ambito);
            
            if(retornoizquierdo.tipodato==tipo_dato.BOOLEAN){
                generador.agregarEtiqueta(retornoizquierdo.etiquetasfalse);
                let retornoderecho= this.expresionderecha.traducir(ambito);
                if(retornoderecho.tipodato==tipo_dato.BOOLEAN){
                    generador.agregarEtiqueta(retornoderecho.etiquetastrue);
                    generador.agregarGoTo(retornoizquierdo.etiquetastrue);
                    const retorno= new traduccionexp("",false,tipo_dato.BOOLEAN,true);
                    retorno.etiquetastrue= retornoizquierdo.etiquetastrue;
                    retorno.etiquetasfalse= retornoderecho.etiquetasfalse;
                    return retorno;
                }else{
                    almacen.dispatch(errores({
                        tipo:'SEMANTICO',
                        descripcion:'2DO OPERADOR EN && NO ES BOOLEAN, SE RECIBIO: '+ retornoderecho.tipodato,
                        ambito:ambito.nombre,
                        linea:this.linea,
                        columna: this.columna
                    }));
                    generador.agregarEtiqueta(retornoizquierdo.etiquetastrue);
                    return new traduccionexp("",false,tipo_dato.UNDEFINED,false);
                }


            }else{
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'1ER OPERADOR EN || NO ES BOOLEAN, SE RECIBIO: '+ retornoizquierdo.tipodato,
                    ambito:ambito.nombre,
                    linea:this.linea,
                    columna: this.columna
                }));
                return new traduccionexp("",false,tipo_dato.UNDEFINED,false);
            }

        }
      
        return null;
        
    }

    

}