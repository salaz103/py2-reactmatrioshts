import entorno from "../entorno/entorno";
import simbolo from "../entorno/simbolo";
import { operador, tipo_dato } from "../entorno/tipo";
import instruccion from "./instruccion";
import { almacen } from '../../../src/app';
import { errores } from '../../actions/ts.js';
import { generacion } from "../helpers/generacion";
import { traduccionexp } from "../expresiones/traduccionexp";
import expresion from "../expresiones/expresion";

export class incremento_decremento implements expresion {

    id: string;
    tipooperador: operador;
    linea: number;
    columna: number;

    constructor(id: string, op: operador, linea: number, columna: number) {
        this.id = id;
        this.tipooperador = op;
        this.linea = linea;
        this.columna = columna;
    }


    traducir(ambito: entorno) {
        //LO PRIMERO QUE HAY QUE HACER ES BUSCAR EL ID
        //SI EXISTE LO GUARDAMOS PARA PODER REVISAR SUS PROPIEDADES
        let sim: simbolo;
        const generador = generacion.getGenerador();

        if (ambito.existe(this.id)) {
            //console.log("SI EXISTE EL ID: "+ this.id);
            sim = ambito.getSimbolo(this.id);
            console.log(sim);
            //AHORA QUE YA SABEMOS QUE EXISTE, HAY QUE HACER 3 VALIDACIONES
            //1. VERIFICAR SI ES CONST O NO 
            //2. VERIFICAR SI ES NUMBER O NO

            //VALIDACION 1)
            if (sim.getReasignable()) {

                //VALIDACION 2)
                if (sim.getTipo() == tipo_dato.DECIMAL || tipo_dato.ENTERO) {

                    let tmp_guardado = generador.generarTemporal();
                    let tmp_retorno = generador.generarTemporal();
                    if (sim.esGlobal) {
                        generador.getValorStack(tmp_guardado, sim.direccionrelativa.toString())
                        generador.agregarExpresion(tmp_retorno, tmp_guardado, "", "");
                        generador.sacarTemporal(tmp_guardado);
                        if (this.tipooperador == operador.INCREMENTO) {
                            generador.agregarExpresion(tmp_guardado, tmp_guardado, "+", "1");
                        } else {
                            generador.agregarExpresion(tmp_guardado, tmp_guardado, "-", "1");
                        }
                        generador.stack(sim.direccionrelativa, tmp_guardado);
                        return new traduccionexp(tmp_retorno, true, sim.tipodato, false);
                    } else {

                        let tmp_acceso = generador.generarTemporal();
                        generador.sacarTemporal(tmp_acceso);
                        generador.agregarExpresion(tmp_acceso, "p", "+", sim.direccionrelativa);
                        generador.getValorStack(tmp_guardado, tmp_acceso);
                        generador.agregarExpresion(tmp_retorno, tmp_guardado, "", "");
                        generador.sacarTemporal(tmp_guardado);
                        if (this.tipooperador == operador.INCREMENTO) {
                            generador.agregarExpresion(tmp_guardado, tmp_guardado, "+", "1");
                        } else {
                            generador.agregarExpresion(tmp_guardado, tmp_guardado, "-", "1");
                        }
                        generador.stack(tmp_acceso, tmp_guardado);
                        return new traduccionexp(tmp_retorno, true, sim.tipodato, false);
                    }


                } else {
                    almacen.dispatch(errores({
                        tipo: 'SEMANTICO',
                        descripcion: 'IDENTIFICADOR ' + this.id + ' NO ES DE TIPO NUMBER, NO SE APLICARA INCREMENTO',
                        ambito: ambito.nombre,
                        linea: this.linea,
                        columna: this.columna
                    }));
                    console.log("ERROR - ID: " + this.id + " NO ES DE TIPO NUMBER");
                    return new traduccionexp("", false, tipo_dato.UNDEFINED, false);
                }

            } else {

                almacen.dispatch(errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'NO SE PUEDE MODIFICAR: ' + this.id + ' ES UNA VARIABLE CONST',
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
                //SIGNIFICA QUE NO ES DE TIPO NUMBER O QUE ES UNA CONSTANTE, POR QUE NO SE PUEDE REASIGNAR
                console.log("ERROR - NO SE PUEDE MODIFICAR: " + this.id + " ES UNA VARIABLE CONST");
                return new traduccionexp("", false, tipo_dato.UNDEFINED, false);
            }

        } else {

            almacen.dispatch(errores({
                tipo: 'SEMANTICO',
                descripcion: 'VARIABLE: ' + this.id + ' NO ESTA DEFINIDA',
                ambito: ambito.nombre,
                linea: this.linea,
                columna: this.columna
            }));
            console.log("ERROR - VARIABLE: " + this.id + " NO ESTA DEFINIDA");
            return new traduccionexp("", false, tipo_dato.UNDEFINED, false);
        }

    }

}