import entorno from "../entorno/entorno";
import { tipo_ambito, tipo_rol, tipo_variable } from "../entorno/tipo";
import instruccion from "./instruccion";
import {almacen} from '../../../src/app';
import {agregarcodigo3d} from '../../actions/ts.js';
import {generartmp,getPosicionLibreHeap} from '../helpers/helpers';
import {errores} from '../../actions/ts.js';
import { variable } from "../expresiones/variable";
import simbolo from "../entorno/simbolo";
import { traduccionexp } from "../expresiones/traduccionexp";


export class declaracion implements instruccion{

    tipovariable:tipo_variable;
    //EL ARREGLO NO TIENE UN TIPO ESPECÍFICO POR QUE PUEDE QUE VENGA VARIABLE NORMAL O ARREGLO
    variables;


    constructor(tipov:tipo_variable,vars:[]){
        this.tipovariable=tipov;
        this.variables= vars;
    }


    traducir(ambito: entorno) {
        //console.log("TRADUCCION DE DECLARACION");
        //console.log(almacen.getState().storecodigo.contadortemporales);
        // let tmp= generartmp();
        // let lista= listaTemporales();
        // console.log(tmp);
        // console.log(lista);

        //1. Recorrer el arreglo de variables
        //2. Revisar si la variable ya existe SOLO EN ESTE AMBITO, YA SEA NUEVO O GLOBAL

        for (let i = 0; i < this.variables.length; i++) {

            if(ambito.existeLocal(this.variables[i].id)){
                //SI EXISTE LOCALMENTE ENTONCES NO LA PODEMOS DECLARAR
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'IDENTIFICADOR '+ this.variables[i].id+' YA EXISTE EN AMBITO '+ ambito.nombre,
                    ambito:ambito.nombre
                }));
                console.log("ERROR- ID: "+this.variables[i].id+" YA EXISTE EN ESTE AMBITO "+ ambito.nombre);    
            }else{
                //SI NO EXISTE, ENTONCES PODEMOS TRADUCIR Y GUARDAR LA NUEVA VARIABLE
                
                //PERO TENEMOS 2 TIPOS DE VARIABLES
                //CONST Y LET, ENTONCES LO PRIMERO ES VER QUE TIPO DE VARIABLE ES


                if(this.tipovariable==tipo_variable.LET){
                    //SI ENTRO AQUI ES POR QUE ES UNA VARIABLE LET

                    if(this.variables[i] instanceof variable ){
                        //SIGNIFICA QUE ES UNA VARIABLE LET PLANA
                        //HAY 2 TIPOS:
                        //1. ID:TIPODATO= EXPRESION
                        //2. ID:TIPODATO
                    if(this.variables[i].exp!=null){
                        const valor:traduccionexp= this.variables[i].exp.traducir(ambito);
                        let pos= getPosicionLibreHeap();
                        let tmp_intermedio= generartmp();
                        let c3d= tmp_intermedio+" = "+pos+";\n";
                        c3d += "heap[(int)"+tmp_intermedio+"]= "+valor.temp+";\n";

                        const nuevosimbolo= new simbolo(this.variables[i].id,valor.tipovalor,ambito.nombre,tipo_rol.VARIABLE,this.variables[i].linea,this.variables[i].columna,pos);
                        ambito.agregarSimbolo(nuevosimbolo);
                        almacen.dispatch(agregarcodigo3d(c3d));
                    }


                    }else{
                        //SIGNIFICA QUE ES UN ARREGLO, YA TENDRIA QUE VER YO AQUI OTRAS COSAS
                    }



                }else if(this.tipovariable==tipo_variable.CONST){
                    //SI ENTRO AQUI ES POR QUE ES UNA VARIABLE CONST

                }








                //PERO ANTES DE GUARDAR LA VARIABLE, TENEMOS QUE VERIFICAR
                //SI EL AMBITO ES "GLOBAL" U OTRO(LOCAL), YA QUE SI ES OTRO
                //NO TENEMOS QUE "RESERVAR ESPACIO EN EL HEAP"
                if(ambito.tipoambito=tipo_ambito.GLOBAL){
                    //SI EL AMBITO ES GLOBAL ENTONCES ES EL HEAP EL QUE TENEMOS QUE UTILIZAR

                }else{
                    //SI EL AMBITO ES LOCAL, ES EL STACK EL QUE DEBEMOS UTILIZAR
                }

            }//FINALIZACION DE GUARDAR VARIABLE
            
        }//FINALIZACION DEL FOR DE RECORRIDO DE VARIABLES

    }

}