import entorno from "../entorno/entorno";
import { tipo_dato, tipo_metodo } from "../entorno/tipo";
import { generacion } from "../helpers/generacion";
import expresion from "./expresion";
import { stringmetodos } from "./stringmetodos";
import { traduccionexp } from "./traduccionexp";
import { almacen } from '../../../src/app';
import { errores } from '../../actions/ts.js';


export class nativastring implements expresion {

    id_string: expresion;
    metodos: stringmetodos[];
    linea: number;
    columna: number;

    constructor(id: expresion, metodos: stringmetodos[], linea: number, columna: number) {
        this.id_string = id;
        this.metodos = metodos;
        this.linea = linea;
        this.columna = columna;
    }


    traducir(ambito: entorno): traduccionexp {
        const generador = generacion.getGenerador();
        

        //PRIMERO TRADUCIR LA CADENA O IDENTIFICADOR
        let retorno_id = this.id_string.traducir(ambito);

        const tmp = generador.generarTemporal();
        generador.sacarTemporal(tmp);

        
        if (retorno_id.tipodato == tipo_dato.STRING && retorno_id.dimensiones==0) {
            let retorno_final = new traduccionexp("", true, tipo_dato.STRING, false);
            const tmp_resultado = generador.generarTemporal();
            generador.sacarTemporal(tmp_resultado);


            //INICIA LA MAGIA
            //REVISAMOS SOLO LA PRIMERA POSICION, YA QUE COMO MINIMO DEBE VENIR UNO

            switch (this.metodos[0].metodo) {
                case tipo_metodo.CHARAT:
                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_id.obtenerValor());
                    //TRADUCIMOS EL INDICE
                    let retorno_indice = this.metodos[0].exp.traducir(ambito);
                    generador.agregarExpresion(tmp, tmp, "+", "1");
                    generador.stack(tmp, retorno_indice.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("caracter_cadena();")
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.valor = tmp_resultado;
                    break;

                case tipo_metodo.CONCAT:
                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_id.obtenerValor());
                    let retorno_expresion= this.metodos[0].exp.traducir(ambito);
                    generador.agregarExpresion(tmp, tmp, "+", "1");
                    generador.stack(tmp, retorno_expresion.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("concatenacion();")
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.valor = tmp_resultado;
                    break;

                case tipo_metodo.LENGTH:
                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_id.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("largo_cadena();")
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.tipodato = tipo_dato.ENTERO;
                    retorno_final.valor = tmp_resultado;
                    return retorno_final;

                case tipo_metodo.TOLOWERCASE:
                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_id.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("minusculas();")
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.valor = tmp_resultado;
                    break;

                case tipo_metodo.TOUPPERCASE:
                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_id.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("mayusculas();")
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.valor = tmp_resultado;
                    break;
                default:
                    break;
            }



            //EL RECORRIDO COMIENZA EN EL METODO 1, YA QUE EL 0 FUE EL PRIMER LEÍDO
            //AQUI YA REALICE EL PRIMER METODO, 
            //EL RESULTADO ESTA EN RETORNO_FINAL.VALOR
            
            for (let i = 1; i < this.metodos.length; i++) {

                if (this.metodos[i].metodo == tipo_metodo.CHARAT) {
                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_final.obtenerValor());
                    let retorno_indice = this.metodos[i].exp.traducir(ambito);
                    generador.agregarExpresion(tmp, tmp, "+", "1");
                    generador.stack(tmp, retorno_indice.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("caracter_cadena();")
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.valor = tmp_resultado;
                } else if (this.metodos[i].metodo == tipo_metodo.CONCAT) {

                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_final.obtenerValor());
                    let retorno_ex = this.metodos[i].exp.traducir(ambito);
                    generador.agregarExpresion(tmp, tmp, "+", "1");
                    generador.stack(tmp, retorno_ex.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("concatenacion();")
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.valor = tmp_resultado;

                } else if (this.metodos[i].metodo == tipo_metodo.LENGTH) {
                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_final.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("largo_cadena();")
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.tipodato = tipo_dato.ENTERO;
                    retorno_final.valor = tmp_resultado;
                    return retorno_final;
                }else if(this.metodos[i].metodo==tipo_metodo.TOLOWERCASE){
                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_final.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("minusculas();")
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.valor = tmp_resultado;
                }else if(this.metodos[i].metodo==tipo_metodo.TOUPPERCASE){
                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_final.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("mayusculas();")
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.valor = tmp_resultado;
                }


            }

            return retorno_final;

        } else if(retorno_id.dimensiones>0) {
            //SIGNIFICA QUE ES UN ARREGLO Y EL LARGO ESTA GUARDADO EN LA PRIMERA POSICION
            //ES DECIR EN EL STACK QUE TIENE EL INICIO DEL ARREGLO EN EL HEAP
            const largo_arreglo= generador.generarTemporal();
            generador.getValorHeap(largo_arreglo,retorno_id.obtenerValor());
            return new traduccionexp(largo_arreglo,true,tipo_dato.ENTERO,false,null,retorno_id.dimensiones);

        }else{

            almacen.dispatch(errores({
                tipo: 'SEMANTICO',
                descripcion: "NATIVAS, NO SON APLICABLES A :" + retorno_id.tipodato,
                ambito: ambito.nombre,
                linea: this.linea,
                columna: this.columna
            }));
            return new traduccionexp("", false, tipo_dato.UNDEFINED, false);

        }



        
    }

}