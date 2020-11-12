import entorno from "../entorno/entorno";
import { tipo_dato } from "../entorno/tipo";
import { generacion } from "../helpers/generacion";
import expresion from "./expresion";
import { traduccionexp } from "./traduccionexp";

export class arreglo implements expresion {

    lista_expresiones: expresion[];
    linea: number;
    columna: number;

    constructor(lista: expresion[], linea: number, columna: number) {
        this.lista_expresiones = lista;
        this.linea = linea;
        this.columna = columna;
    }

    traducir(ambito: entorno): traduccionexp {
        const generador = generacion.getGenerador();
        const temporal_inicio_arreglo = generador.generarTemporal();
        const temporal_asignacion = generador.generarTemporal();
        generador.sacarTemporal(temporal_asignacion);
        let dimension: number = 0;
        let tipo_resultante;
        generador.agregarExpresion(temporal_inicio_arreglo, "h", "", "");
        generador.heap("h", this.lista_expresiones.length);
        //AHORA MOVEMOS H 
        generador.agregarExpresion("h", "h", "+", this.lista_expresiones.length + 1);
        generador.agregarExpresion(temporal_asignacion, temporal_inicio_arreglo, "+", "1");
        this.lista_expresiones.forEach((expresion, index) => {
            const retorno_expresion = expresion.traducir(ambito);
            dimension = retorno_expresion.dimensiones + 1;

            if (retorno_expresion.tipodato != tipo_dato.BOOLEAN) {
                generador.heap(temporal_asignacion, retorno_expresion.obtenerValor());
            } else {
                //SIGNIFICA QUE ES BOOLEAN
                const temporal_valor = generador.generarTemporal();
                generador.sacarTemporal(temporal_valor);
                const etiqueta_salida = generador.generarEtiqueta()
                generador.agregarEtiqueta(retorno_expresion.etiquetastrue);
                generador.agregarExpresion(temporal_valor, "1", "", "");
                generador.agregarGoTo(etiqueta_salida);
                generador.agregarEtiqueta(retorno_expresion.etiquetasfalse);
                generador.agregarExpresion(temporal_valor, "0", "", "");
                generador.agregarEtiqueta(etiqueta_salida);
                generador.heap(temporal_asignacion, temporal_valor);
            }

            if (index != this.lista_expresiones.length - 1) {
                generador.agregarExpresion(temporal_asignacion, temporal_asignacion, "+", "1");
            }

            tipo_resultante = retorno_expresion.tipodato;
        });

        if (tipo_resultante == tipo_dato.ENTERO) {
            tipo_resultante = tipo_dato.DECIMAL;
        }
        console.log(dimension);
        return new traduccionexp(temporal_inicio_arreglo, true, tipo_resultante, false, null, dimension);

    }

}