import entorno from "../entorno/entorno";
import { tipo_ambito, tipo_rol, tipo_variable } from "../entorno/tipo";
import instruccion from "./instruccion";
import {almacen} from '../../../src/app';
import {agregarcodigo3d} from '../../actions/ts.js';
import {errores} from '../../actions/ts.js';
import { variable } from "../expresiones/variable";
import simbolo from "../entorno/simbolo";
import { traduccionexp } from "../expresiones/traduccionexp";
import { generacion } from "../helpers/generacion";


export class declaracion implements instruccion{

    tipovariable:tipo_variable;
    variables:variable[];


    constructor(tipov:tipo_variable,vars:variable[]){
        this.tipovariable=tipov;
        this.variables= vars;
    }


    traducir(ambito: entorno) {
        const generador= generacion.getGenerador();
        //1. Recorrer el arreglo de variables
        //2. Revisar si la variable ya existe SOLO EN ESTE AMBITO, YA SEA NUEVO O GLOBAL

        for (let i = 0; i < this.variables.length; i++) {

            if(ambito.existeLocal(this.variables[i].id)){
                //SI EXISTE LOCALMENTE ENTONCES NO LA PODEMOS DECLARAR
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'IDENTIFICADOR '+ this.variables[i].id+' YA EXISTE EN AMBITO '+ ambito.nombre,
                    ambito:ambito.nombre,
                    linea: this.variables[i].linea,
                    columna: this.variables[i].columna
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
                        //SIGNIFICA QUE LA VARIABLE LET TRAE UNA EXPRESION
                          let retornoexpresion:traduccionexp= this.variables[i].exp.traducir(ambito);
                          //VALIDAMOS QUE EL TIPO DE DATO ENTRANTE ES SIMILAR A LA DE LA EXPRESION
                          if(this.variables[i].tipodato==retornoexpresion.tipodato){
                              //SI SON IGUALES ENTONCES GUARDAMOS LA VARIABLE EN LA TS Y COMIENZA 
                              //LA TRADUCCION
                              let nuevosim:simbolo= ambito.agregarSimbolo(this.variables[i].id,retornoexpresion.tipodato,ambito.nombre,this.variables[i].linea,this.variables[i].columna,true);
                              //SIEMPRE QUE AGREGAMOS UN NUEVO SIMBOLO, DEVUELVE EL SIMBOLO CREADO
                              //AQUI PREGUNTAMOS SI ES VARIABLE GLOBAL O LOCAL, ESTO PARA VER SI MOVEMOS O NO
                              //EL APUNTADOR "P"
                              if(nuevosim.esGlobal){
                                  let tmp= generador.generarTemporal();
                                  generador.sacarTemporal(tmp);
                                  generador.agregarExpresion(tmp,"p","+",nuevosim.direccionrelativa);
                                  generador.stack(tmp,retornoexpresion.obtenerValor());
                                
                              }else{
                                let tmp= generador.generarTemporal();
                                generador.sacarTemporal(tmp);
                                generador.agregarExpresion(tmp,"p","+",nuevosim.direccionrelativa);
                                generador.stack(tmp,retornoexpresion.obtenerValor());
                              }


                          }else{
                              //ERROR - SEMANTICO - TIPO DATO VARIABLE NO COMPATIBLE CON TIPO DATO DE EXPRESION


                          }

                    }else{
                        //SIGNIFICA QUE LA VARIABLE LET NO TRAE EXPRESION, SE DEBE RESERVAR EL ESPACIO Y PONER VALORES POR DEFECTO
                        /**
                         NUMBER-> 0 
                         BOOLEAN-> FALSE
                         STRING-> NULL
                         TYPE-> NULL
                         ARRAY-> NULL
                         */

                    }


                    }else{
                        //SIGNIFICA QUE ES UN ARREGLO, YA TENDRIA QUE VER YO AQUI OTRAS COSAS
                    }



                }else if(this.tipovariable==tipo_variable.CONST){
                    //SI ENTRO AQUI ES POR QUE ES UNA VARIABLE CONST

                }





            }//FINALIZACION DE GUARDAR VARIABLE
            
        }//FINALIZACION DEL FOR DE RECORRIDO DE VARIABLES

    }

}