import entorno from "../entorno/entorno";
import { tipo_instruccion, tipo_valor } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";
import {almacen} from '../../../src/app';
import {errores} from '../../actions/ts.js';
import { instruccionbreak } from "./instruccionBreak";
import { instruccioncontinue } from "./instruccioncontinue";
import { instruccionreturn } from "./instruccionreturn";

export class instruccionifelse implements instruccion{

    condicion:expresion;
    listatrue:instruccion[];
    elseif_else:instruccion;

    constructor(condicion:expresion,listat:instruccion[],elseifoelse:instruccion){
        this.condicion=condicion;
        this.listatrue= listat;
        this.elseif_else=elseifoelse;
    }


    ejecutar(ambito: entorno): object {

        //1. OBTENER EL VALOR Y TIPO DE LA CONDICION
        //YA QUE TIENE QUE SER DE TIPO BOOLEAN
        const valorcondicion= this.condicion.obtenerValor(ambito);
        const tipocondicion= this.condicion.obtenerTipo(ambito);
        /*console.log("VALOR CONDICION");
        console.log(valorcondicion);
        console.log("TIPO");
        console.log(tipocondicion);*/
        if(tipocondicion==tipo_valor.BOOLEAN){
            let valorc= valorcondicion as Boolean;
            //SI ES BOOLEAN LA CONDICION ENTONCES SI SE PUEDE EJECUTAR
            
            if(valorc.valueOf()){
                //SI ENTRO AQUI, SE EJECUTAN LAS INSTRUCCIONES DEL TRUE
                const tsif= new entorno("if",ambito);
                // this.listatrue.forEach(instruccion => {
                //         instruccion.ejecutar(tsif);
                // });

                for (let i = 0; i < this.listatrue.length; i++) {
                    //AQUI TENEMOS QUE IR RECIBIENDO EL "VALOR" DE LAS INSTRUCCIONES
                    //QUE POR SER INSTRUCCIONES NO DEVUELVEN NADA, A EXCEPCION DE LOS BREAK O CONTINUE
                    let valori= this.listatrue[i].ejecutar(tsif);
                    
                    if(valori instanceof instruccionbreak || valori instanceof instruccioncontinue || valori instanceof instruccionreturn){
                        return valori;
                    }
                    /*if(valori && valori.valueOf()==tipo_instruccion.BREAK){
                        return valori;
                    }else if(valori && valori.valueOf()==tipo_instruccion.CONTINUE){
                        return valori;
                    }else if(valori!=null){
                        return valori;
                    }*/
                    
                }


            }else{
                //SI LA CONDICION NO ES VERDADERA SE EJECUTA LO OTRO
                //PERO PUEDE QUE AQUI VENGA UN ELSE IF O SOLO UN ELSE
                //SOLO MANDO A EJECUTAR ESE ELSE O ELSE IF Y QUE ELLOS HAGAN SUS NUEVOS AMBITOS
                 return this.elseif_else.ejecutar(ambito);
            }

        }else{
            almacen.dispatch(errores({
                tipo:'SEMANTICO',
                descripcion:'LA CONDICION '+ String(valorcondicion)+' , NO ES BOOLEANA',
                ambito:ambito.nombre
            }));
            console.log("ERROR - LA CONDICION "+ String(valorcondicion) +"NO ES BOOLEANA");
        }

        return null;
    }

}