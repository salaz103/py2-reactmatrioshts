import entorno from "../entorno/entorno";
import { tipo_dato } from "../entorno/tipo";
import { generacion } from "../helpers/generacion";
import expresion from "./expresion";
import { traduccionexp } from "./traduccionexp";

export class newArray implements expresion{

    tamaño:expresion;
    linea:number;
    columna:number;

    constructor(tamaño:expresion,linea:number,columna:number){
        this.tamaño=tamaño;
        this.linea=linea;
        this.columna=columna;
    }

    traducir(ambito: entorno): traduccionexp {
        const generador= generacion.getGenerador();
        let retorno_tamaño= this.tamaño.traducir(ambito);

        const temp_inicio_arreglo= generador.generarTemporal();
        generador.agregarExpresion(temp_inicio_arreglo,"h","","");
        //AHORA VAMOS A SETEAR EN LA PRIMERA POSICION, EL TAMAÑO
        generador.heap("h",retorno_tamaño.obtenerValor());
        //AHORA MOVEMOS EL APUNTADOR H EL TAMAÑO QUE NECESITAMOS
        generador.agregarExpresion("h","h","+",retorno_tamaño.obtenerValor());
        //SUMAMOS UNO MÁS, YA QUE EN LA PRIMERA POS, SE ESTA GUARDANDO EL TAMAÑO
        generador.siguienteHeap();
        //RETORNO CON DIMENSIONES
        return new traduccionexp(temp_inicio_arreglo,true,tipo_dato.ARRAY,false,null,1);

    }
    
}