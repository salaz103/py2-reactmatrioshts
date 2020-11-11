import entorno from "../entorno/entorno";
import simbolo from "../entorno/simbolo";
import { tipo_dato } from "../entorno/tipo";
import expresion from "./expresion";
import { traduccionexp } from "./traduccionexp";
import { almacen } from '../../../src/app';
import { errores } from '../../actions/ts.js';
import { generacion } from "../helpers/generacion";

export class identificador implements expresion {


    id: string;
    tipo: tipo_dato;
    linea: number;
    columna: number;

    constructor(identificador: string, linea: number, columna: number) {
        this.id = identificador;
        this.linea = linea;
        this.columna = columna;
    }


    traducir(ambito: entorno): traduccionexp {
        const generador = generacion.getGenerador();
        let sim: simbolo;
        //1. PUEDE QUE EL ID SEA LOCAL O VENGA DE UN AMBITO SUPERIOR
        ///  LO QUE HAY QUE HACER ES IR RECORRIENDO LOS AMBITOS, INICIANDO POR EL ACTUAL, DONDE ESTOY (ambito)
        if (ambito.existe(this.id)) {
            //console.log("SI ENCONTRE EL ID: "+this.id);
            sim = ambito.getSimbolo(this.id);
        }

        //ESTE TEMPORAL SERA EL TEMPORAL QUE RETORNAREMOS
        let tmp_guardado = generador.generarTemporal();
        if (sim) {
            //SI ENTRO AQUÍ ES POR QUE SI EXISTE LA VARIABLE PERO ANTES DE TRADUCIRLA, TOCA VER SI ES GLOBAL O LOCAL
            if (sim.esGlobal) {
                //SI EL SIMBOLO ES GLOBAL, SOLO VOY A LA POSICION QUE TIENE DIRECTAMENTE AL STACK
                generador.getValorStack(tmp_guardado, sim.direccionrelativa.toString());

                //SI NO ES BOOLEAN, SOLO REGRESO EL TEMPORAL DONDE GUARDE EL VALOR QUE OBTUVE DEL STACK
                if (sim.tipodato != tipo_dato.BOOLEAN) {
                    return new traduccionexp(tmp_guardado, true, sim.tipodato, false, sim);
                } else {
                    const retorno_boolean = new traduccionexp("", false, sim.tipodato, true, sim);
                    let etqtrue = generador.generarEtiqueta();
                    let etqfalse = generador.generarEtiqueta();
                    generador.sacarTemporal(tmp_guardado);
                    generador.agregarIf(tmp_guardado, "==", "1", etqtrue);
                    generador.agregarGoTo(etqfalse);
                    retorno_boolean.etiquetastrue = etqtrue;
                    retorno_boolean.etiquetasfalse = etqfalse;
                    return retorno_boolean;
                }

            } else {
                //SIGNIFICA QUE EL IDENTIFICADOR ES UN VALOR LOCAL, POR LO QUE HAY QUE UTILIZAR
                //UN PUNTERO P PARA QUE ESTE SE MUEVA LA POSICION RELATIVA QUE TIENE EL ID
                let tmp_acceso = generador.generarTemporal();
                generador.sacarTemporal(tmp_acceso);

                generador.agregarExpresion(tmp_acceso, "p", "+", sim.direccionrelativa);
                generador.getValorStack(tmp_guardado, tmp_acceso);
                if (sim.tipodato != tipo_dato.BOOLEAN) {
                    return new traduccionexp(tmp_guardado, true, sim.tipodato, false, sim);
                } else {
                    const retorno_boolean = new traduccionexp("", false, sim.tipodato, true, sim);
                    let etqtrue = generador.generarEtiqueta();
                    let etqfalse = generador.generarEtiqueta();
                    generador.sacarTemporal(tmp_guardado);
                    generador.agregarIf(tmp_guardado, "==", "1", etqtrue);
                    generador.agregarGoTo(etqfalse);
                    retorno_boolean.etiquetastrue = etqtrue;
                    retorno_boolean.etiquetasfalse = etqfalse;
                    return retorno_boolean;
                }
            }


        } else {
            almacen.dispatch(errores({
                tipo: 'SEMANTICO',
                descripcion: 'IDENTIFICADOR ' + this.id + ' NO EXISTE',
                ambito: ambito.nombre,
                linea: this.linea,
                columna: this.columna
            }));
            //console.log("ERROR- IDENTIFICADOR "+ this.id+" NO EXISTE");
        }


        return new traduccionexp("", false, tipo_dato.UNDEFINED, false);
    }

}