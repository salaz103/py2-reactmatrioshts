import entorno from "../entorno/entorno";
import { tipo_ambito } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import { generacion } from "../helpers/generacion";
import instruccion from "./instruccion";

export class instruccionfor implements instruccion{

    primerainstruccion:instruccion;
    expresion:expresion;
    tercerainstruccion:instruccion;
    listainstrucciones:instruccion[];
    linea:number;
    columna:number;

    constructor(i1:instruccion,i2:expresion,i3:instruccion,lista:instruccion[],linea:number,columna:number){
        this.primerainstruccion=i1;
        this.expresion=i2;
        this.tercerainstruccion=i3;
        this.listainstrucciones=lista;
        this.linea=linea;
        this.columna=columna;
    }



    traducir(ambito: entorno) {
        const generador= generacion.getGenerador();
        const ambitofor= new entorno("For",tipo_ambito.LOCAL,ambito);

        //ESTA PRIMERA INSTRUCCION, PUEDE SER UNA DECLARACION O ASIGNACION
        generador.agregarComentarios("INICIO - FOR");
        let retorno_1= this.primerainstruccion.traducir(ambitofor);
        let etiquetaInicio= generador.generarEtiqueta();
        generador.agregarEtiqueta(etiquetaInicio);
        //LA EXPRESION 2 ES UNA CONDICIONAL
        let retorno_2= this.expresion.traducir(ambitofor);
        generador.agregarEtiqueta(retorno_2.etiquetastrue);
        for (let i = 0; i < this.listainstrucciones.length; i++) {
            ///AQUI HAY QUE "CACHAR LOS ERRORES"

            if(!(typeof(this.listainstrucciones[i])=="string")){
                this.listainstrucciones[i].traducir(ambitofor);
            }
        }
        //EN ESTE PUNTO YA SE TRADUJERON LAS INSTRUCCIONES
        //TOCA TRADUCIR LA 3ERA EXPRESION
        let retorno_3= this.tercerainstruccion.traducir(ambitofor);
        //AHORA PONEMOS EL GOTO AL INICIO
        generador.agregarGoTo(etiquetaInicio);
        //AQUI PONEMOS LA ETIQUETA FALSA, CUANDO LA SEGUNDA CONDICION YA NO SE CUMPLA
        generador.agregarEtiqueta(retorno_2.etiquetasfalse);
    }
    
}