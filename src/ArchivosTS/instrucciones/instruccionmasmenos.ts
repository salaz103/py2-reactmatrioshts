import { funcion } from "../desanidamiento/funcion";
import entorno from "../entorno/entorno";
import expresion from "../expresiones/expresion";
import { traduccionexp } from "../expresiones/traduccionexp";
import instruccion from "./instruccion";

export class instruccionmasmenos implements instruccion{

    masmenos:expresion;
    linea:number;
    columna:number;

    constructor(e:expresion,linea:number,columna:number){
        this.masmenos=e;
        this.linea=linea;
        this.columna=columna;
    }


    //ESTA CLASE ES PARA CUANDO LA LLAMADA DEL MAS MENOS SE HACE COMO UNA INSTRUCCION
    //SIRVE SOLO COMO "PROXY"
    traducir(ambito: entorno) {
        let valor_ins:traduccionexp= this.masmenos.traducir(ambito);
        //ESTO LO HACEMOS YA QUE CUANDO EL MAS MENOS SE LLAMA COMO INSTRUCCION, SOLO SIRVE PARA ACTUALIZAR
        //EL IDENTIFICADOR, ENTONCES ES NECESARIO SACARLO DEL 
        //STORE DE TEMPORALES
        valor_ins.obtenerValor();
    }
    
}