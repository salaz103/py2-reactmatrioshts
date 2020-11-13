import entorno from "../entorno/entorno";
import { tipo_ambito, tipo_dato } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import { generacion } from "../helpers/generacion";
import instruccion from "./instruccion";
import { almacen } from '../../../src/app';
import { errores } from '../../actions/ts.js';

export class instruccionif implements instruccion{

    condicion:expresion;
    instrucciones:instruccion[];
    elseif_else;
    linea:number;
    columna:number;


    constructor(condicion:expresion,lista_instrucciones:instruccion[],elseif_else,linea:number,columna:number){
        this.condicion=condicion;
        this.instrucciones=lista_instrucciones;
        this.elseif_else=elseif_else;
        this.linea=linea;
        this.columna=columna;
    }



    traducir(ambito: entorno) {
        const generador= generacion.getGenerador();
        generador.agregarComentarios("Inicio de instruccion IF");
        const retornocondicion= this.condicion.traducir(ambito);
        const ambitoif= new entorno("IF",tipo_ambito.LOCAL,ambito);
        if(retornocondicion.tipodato==tipo_dato.BOOLEAN){
            generador.agregarEtiqueta(retornocondicion.etiquetastrue);
            for (let i = 0; i < this.instrucciones.length; i++) {
                try {
                    let retornoinstrucciones= this.instrucciones[i].traducir(ambitoif);
                } catch (error) {
                    console.log(error);
                }
                
            }
            if(this.elseif_else!=null){
                const etiquetasalida= generador.generarEtiqueta();
                generador.agregarGoTo(etiquetasalida);
                generador.agregarEtiqueta(retornocondicion.etiquetasfalse);
                //HAY QUE REVISAR SI EL NODO ES INSTANCIA DE INSTRUCCION IF O UNA LISTA DE INSTRUCCIONES(ELSE),
                if(this.elseif_else instanceof instruccionif){
                    //SI ES UN NODO INSTRUCCION IF ENTONCES NO LO RECORREMOS
                    let retorno_else= this.elseif_else.traducir(ambito);
                }else{
                    //HACER OTRO AMBITO Y RECORRER LA LISTA DEL ELSE
                    const ambitoelse= new entorno("Else",tipo_ambito.LOCAL,ambito);
                    for (let i = 0; i < this.elseif_else.length; i++) {
                        try {
                            let retornoinstrucciones= this.elseif_else[i].traducir(ambitoelse);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
                generador.agregarEtiqueta(etiquetasalida);
            }else{
                generador.agregarEtiqueta(retornocondicion.etiquetasfalse);
            }


        }else{
            //ERROR - CONDICION EN IF NO ES BOOLEAN
            almacen.dispatch(errores({
                tipo: 'SEMANTICO',
                descripcion: 'CONDICION EN IF, NO ES DE TIPO BOOLEAN',
                ambito: ambito.nombre,
                linea: this.linea,
                columna: this.columna
            }));

        }
        
    }
    
}