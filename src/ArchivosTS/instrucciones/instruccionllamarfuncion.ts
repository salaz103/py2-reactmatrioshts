import { funcion } from "../desanidamiento/funcion";
import entorno from "../entorno/entorno";
import { numero } from "../expresiones/numero";
import { traduccionexp } from "../expresiones/traduccionexp";
import instruccion from "./instruccion";
import { llamarfuncion } from "./llamarfuncion";

export class instruccionllamarfuncion implements instruccion{

    funcion:instruccion;
    linea:number;
    columna:number;

    constructor(f:instruccion,linea:number,columna:number){
        this.funcion=f;
        this.linea=linea;
        this.columna=columna;
    }


    //ESTA CLASE ES PARA CUANDO LA LLAMADA DE LA FUNCION SE HACE COMO UNA INSTRUCCION
    //SIRVE SOLO COMO "PROXY"
    traducir(ambito: entorno) {
        let valor_ins:traduccionexp= this.funcion.traducir(ambito);
        //ESTO LO HACEMOS YA QUE CUANDO UNA FUNCION ES LLAMADA COMO UNA INSTRUCCION
        //PUEDE QUE EL VALOR LO UTILICEN Ó NO, ENTONCES ES NECESARIO SACARLO DEL 
        //STORE DE TEMPORALES
        valor_ins.obtenerValor();
    }
    
}