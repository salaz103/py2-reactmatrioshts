import entorno from "../entorno/entorno";
import expresion from "../expresiones/expresion";
import { generacion } from "../helpers/generacion";
import instruccion from "./instruccion";
import { almacen } from '../../../src/app';
import { errores } from '../../actions/ts.js';
import simbolo from "../entorno/simbolo";
import { tipo_dato } from "../entorno/tipo";

export class asignacion implements instruccion {

    id: string;
    expresion: expresion;
    linea: number;
    columna: number;

    constructor(id: string, ex: expresion, linea: number, columna: number) {
        this.id = id;
        this.expresion = ex;
        this.linea = linea;
        this.columna = columna;
    }


    traducir(ambito: entorno) {
        const generador = generacion.getGenerador();

        //1. BUSCAR EL SIMBOLO, PARA VER SI EXISTE O NO
        let sim: simbolo;
        if (ambito.existe(this.id)) {
            sim = ambito.getSimbolo(this.id);
        }

        //PREGUNTAMOS SI EXISTE EL ID, PARA TIRAR ERROR O NO
        if (sim) {
            //TOCA PREGUNTAR SI ES LET O NO, YA QUE SI ES CONST, NO SE PUEDE REASIGNAR
            if (sim.reasignable == true) {
                //SI ES REASIGNABLE ENTONCES YA PODEMOS INICIAR LA TRADUCCION PARA COLOCAR NUEVO VALOR
                generador.agregarComentarios("INICIO- ASIGNACION");
                let retorno_expresion = this.expresion.traducir(ambito);
                console.log(retorno_expresion);
                //AHORA YA ESTA TRADUCIDA LA EXPRESION, TOCAR HACER OTRA VALIDACION, VER QUE SEAN
                //DEL MISMO TIPO

                if ((sim.getTipo() == tipo_dato.DECIMAL || sim.getTipo() == tipo_dato.ENTERO)
                    && (retorno_expresion.tipodato == tipo_dato.DECIMAL || retorno_expresion.tipodato == tipo_dato.ENTERO)) {

                        //TOCA PREGUNTAR SI ES GLOBAL O NO
                        if(sim.esGlobal){
                            sim.tipodato= retorno_expresion.tipodato==tipo_dato.ENTERO?tipo_dato.ENTERO:tipo_dato.DECIMAL;
                            generador.stack(sim.direccionrelativa,retorno_expresion.obtenerValor());
                        }else{
                            const acceso= generador.generarTemporal();
                            generador.sacarTemporal(acceso);
                            generador.agregarExpresion(acceso,"p","+",sim.direccionrelativa);
                            sim.tipodato= retorno_expresion.tipodato==tipo_dato.ENTERO?tipo_dato.ENTERO:tipo_dato.DECIMAL;
                            generador.stack(acceso,retorno_expresion.obtenerValor());
                        }

                } else if (sim.getTipo() == retorno_expresion.tipodato) {
                    //SI ENTRA ACA, ES POR QUE PUEDE QUE SEA UN BOOLEAN O UN STRING
                    if(sim.getTipo()==tipo_dato.BOOLEAN){
                        //SIGNIFICA QUE ES UN BOOLEAN Y DE IGUAL FORMA DEBO PREGUNTAR SI ES GLOBAL O NO
                        if(sim.esGlobal){
                            const nuevo_valor= generador.generarTemporal();
                            const etiqueta_salida= generador.generarEtiqueta();
                            generador.sacarTemporal(nuevo_valor);
                            generador.agregarEtiqueta(retorno_expresion.etiquetastrue);
                            generador.agregarExpresion(nuevo_valor,"1","","");
                            generador.agregarGoTo(etiqueta_salida);
                            generador.agregarEtiqueta(retorno_expresion.etiquetasfalse);
                            generador.agregarExpresion(nuevo_valor,"0","","");
                            generador.agregarEtiqueta(etiqueta_salida);
                            generador.stack(sim.direccionrelativa,nuevo_valor);

                        }else{
                            //SI ES LOCAL, TOCA MOVER EL PUNTERO
                            const acceso= generador.generarTemporal();
                            generador.sacarTemporal(acceso);
                            generador.agregarExpresion(acceso,"p","+",sim.direccionrelativa);
                            const nuevo_valor= generador.generarTemporal();
                            const etiqueta_salida= generador.generarEtiqueta();
                            generador.sacarTemporal(nuevo_valor);
                            generador.agregarEtiqueta(retorno_expresion.etiquetastrue);
                            generador.agregarExpresion(nuevo_valor,"1","","");
                            generador.agregarGoTo(etiqueta_salida);
                            generador.agregarEtiqueta(retorno_expresion.etiquetasfalse);
                            generador.agregarExpresion(nuevo_valor,"0","","");
                            generador.agregarEtiqueta(etiqueta_salida);
                            generador.stack(acceso,nuevo_valor);
                        }


                    }else{
                        //SIGNIFICA QUE ES STRING PERO AQUI HAY QUE PREGUNTAR SI ES GLOBAL O NO
                        if(sim.esGlobal){
                            generador.stack(sim.direccionrelativa,retorno_expresion.obtenerValor());
                        }else{
                            const acceso= generador.generarTemporal();
                            generador.sacarTemporal(acceso);
                            generador.agregarExpresion(acceso,"p","+",sim.direccionrelativa);
                            generador.stack(acceso,retorno_expresion.obtenerValor());
                        }
                    }


                } else {
                    almacen.dispatch(errores({
                        tipo: 'SEMANTICO',
                        descripcion: 'VARIABLE: ' + this.id + ' CON TIPO DATO: '+sim.getTipo()+' NO ES COMPATIBLE CON: '+retorno_expresion.tipodato,
                        ambito: ambito.nombre,
                        linea:this.linea,
                        columna:this.columna
                    }));

                }




            } else {
                almacen.dispatch(errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'VARIABLE CONST ' + this.id + ' NO ES REASIGNABLE',
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            }
        } else {
            almacen.dispatch(errores({
                tipo: 'SEMANTICO',
                descripcion: 'VARIABLE ' + this.id + ' NO PUEDE SER ASIGNADA POR QUE NO EXISTE',
                ambito: ambito.nombre,
                linea: this.linea,
                columna: this.columna
            }));
        }
    }

}