import entorno from "../entorno/entorno";
import { generacion } from "../helpers/generacion";
import expresion from "./expresion";
import { traduccionexp } from "./traduccionexp";

export class accesoarray implements expresion {

    arreglo: expresion;
    indice: expresion;
    linea: number;
    columna: number;

    constructor(arreglo: expresion, indice: expresion, linea: number, columna: number) {
        this.arreglo = arreglo;
        this.indice = indice;
        this.linea = linea;
        this.columna = columna;
    }


    traducir(ambito: entorno): traduccionexp {
        const generador = generacion.getGenerador();
        const retorno_arreglo = this.arreglo.traducir(ambito);
        const retorno_indice = this.indice.traducir(ambito);

        console.log(retorno_arreglo);
        //VALIDAMOS SI EL RETORNO ES UN ARREGLO
        if (retorno_arreglo.dimensiones == 0) {
            console.log("ERROR, DE ACCESO EN ARREGLO")
            return;
        }

        const temporal_regreso = generador.generarTemporal();
        const temporal_acceso = generador.generarTemporal();
        generador.sacarTemporal(temporal_acceso);

        //PRIMERO SETEAMOS EL TEMPORAL DE ACCESO EN LA POSICION DEL INDICE
        generador.agregarExpresion(temporal_acceso, retorno_arreglo.obtenerValor(), "+", retorno_indice.obtenerValor());
        //AHORA SUMAMOS UNO A ESE VALOR, YA QUE LA POSICIÓN CERO ESTA RESERVADA PARA EL LENGTH
        generador.agregarExpresion(temporal_acceso,temporal_acceso,"+","1");
        //AHORA YA PODEMOS IR A LEER EL VALOR DEL HEAP
        generador.getValorHeap(temporal_regreso,temporal_acceso);
        return new traduccionexp(temporal_regreso,true,retorno_arreglo.tipodato,false,null,retorno_arreglo.dimensiones-1);
    }

}