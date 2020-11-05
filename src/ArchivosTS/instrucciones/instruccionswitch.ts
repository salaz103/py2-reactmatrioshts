import entorno from "../entorno/entorno";
import { tipo_ambito } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import { traduccionexp } from "../expresiones/traduccionexp";
import { generacion } from "../helpers/generacion";
import { caso } from "./caso";
import instruccion from "./instruccion";

export class instruccionswitch implements instruccion{

    exp:expresion;
    casos:caso[];
    linea:number;
    columna:number;

    constructor(ex:expresion,casos:caso[],linea:number,columna:number){
        this.exp=ex;
        this.casos=casos;
        this.linea=linea;
        this.columna=columna;
    }


    traducir(ambito: entorno) {
        const generador= generacion.getGenerador();
        generador.agregarComentarios("INICIO - SWITCH");
        let retorno_expresion= this.exp.traducir(ambito);
        const ambito_switch= new entorno("SWITCH",tipo_ambito.LOCAL,ambito);
        let etiqueta_prueba=generador.generarEtiqueta();
        let etiqueta_break= generador.generarEtiqueta();
        ambito_switch.etq_break=etiqueta_break;
        let tmp_evaluar= generador.generarTemporal()
        generador.sacarTemporal(tmp_evaluar);
        generador.agregarExpresion(tmp_evaluar,retorno_expresion.obtenerValor(),"","");
        generador.agregarGoTo(etiqueta_prueba);

        const casos_etiquetas= [];
        for (let i = 0; i < this.casos.length; i++) {
            let etiqueta= generador.generarEtiqueta();
            generador.agregarEtiqueta(etiqueta);
            for (let a = 0; a < this.casos[i].listainstrucciones.length; a++) {
                this.casos[i].listainstrucciones[a].traducir(ambito_switch);
            }
            let caso_etiqueta={
                "caso":this.casos[i],
                "etiqueta":etiqueta
            }
            casos_etiquetas.push(caso_etiqueta);
        }
        generador.agregarGoTo(etiqueta_break);
        generador.agregarEtiqueta(etiqueta_prueba);

        for (let i = 0; i < casos_etiquetas.length; i++) {
          
            let retorno:traduccionexp;
            if(casos_etiquetas[i].caso.exp!=null){
                retorno= casos_etiquetas[i].caso.exp.traducir(ambito_switch);

                //PENDIENTE, VER SI ES UN BOOLEANO
                //IF(RETORNO.TIPODATO==TIPODATOBOOLEAN)

                generador.agregarIf(tmp_evaluar,"==",retorno.obtenerValor(),casos_etiquetas[i].etiqueta);
            }else{
                generador.agregarGoTo(casos_etiquetas[i].etiqueta);
            }
                
            //console.log(casos_etiquetas[i].caso.exp);
        }
        generador.agregarEtiqueta(etiqueta_break);
        generador.agregarComentarios("FIN - SWITCH");



    }

}