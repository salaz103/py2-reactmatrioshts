import entorno from "../entorno/entorno";
import { tipo_instruccion, tipo_valor } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";
import {almacen} from '../../../src/app';
import {errores} from '../../actions/ts.js';

export class nativa implements instruccion{

    id:string;
    instruccion:tipo_instruccion;
    listaexpresiones:expresion[];
    tipo:tipo_valor;

    constructor(nombre:string,i:tipo_instruccion,lista:expresion[]){
        this.id=nombre;
        this.instruccion=i;
        this.listaexpresiones=lista;
    }



    ejecutar(ambito: entorno): object {

        //LO PRIMERO ES VER SI DICHO ARREGLO, EXISTE
        if(ambito.existe(this.id)){
            //SI EXISTE AHORA HAY QUE VER SI ES UN ARRAY
            let arreglo= ambito.getSimbolo(this.id);
            if(Array.isArray(arreglo.valor)){
                //SI ES UN ARREGLO ENTONCE SI SE LE PUEDEN APLICAR LAS FUNCIONES

                //LUEGO EVALUAR QUE TIPO DE INSTRUCION ES
                if(this.instruccion==tipo_instruccion.PUSH){

                    //SI EL TIPO DE DATO ES ANY, SOLO LOS AGREGO
                    if(arreglo.tipovalor==tipo_valor.ANY){
                        for (let i = 0; i < this.listaexpresiones.length; i++) {
                            arreglo.valor.push(this.listaexpresiones[i]);
                        }
                        //REGRESO EL NUEVO LENGTH 
                        return new Number(arreglo.valor.length);
                    }else{
                        //SI EL TIPO DE DATO NO ES ANY, HAY QUE REVISAR QUE TODOS LOS TIPO
                        //DE DATO ENTRANTES SEAN IGUALES PARA IGUALARLO CON EL DEL ARREGLO
                        let tipo:tipo_valor= arreglo.tipovalor;
                        let iguales:boolean= true;
                        for (let i = 0; i < this.listaexpresiones.length; i++) {
                            if(this.listaexpresiones[i].obtenerTipo(ambito)==tipo){
                                iguales=true
                            }else{
                                iguales=false
                                break;
                            }
                        }

                        if(iguales){
                            //SI SON IGUALES ENTONCES YA LOS GUARDO
                            for (let a = 0; a < this.listaexpresiones.length; a++) {
                                arreglo.valor.push(this.listaexpresiones[a]);
                            }
                            //DEVULEVO EL NUEVO LENGTH
                            this.tipo=tipo_valor.NUMBER;
                            return new Number(arreglo.valor.length);
                        }else{
                            //ERROR, LOS VALORES QUE QUIERE INGRESAR NO SON DEL MISMO TIPO QUE EL ARREGLO
                            almacen.dispatch(errores({
                                tipo:'SEMANTICO',
                                descripcion:'ARREGLO '+arreglo.id+' ES DE OTRO TIPO, NO SE GUARDARAN VALORES',
                                ambito:ambito.nombre
                            }));
                        }

                    }



                 }else if(this.instruccion==tipo_instruccion.POP){
                     if(arreglo.valor.length==0){
                         return undefined;
                     }
                    let a:expresion=arreglo.valor.pop();
                    let valor= a.obtenerValor(ambito);
                    let tipo= a.obtenerTipo(ambito);
                    this.tipo=tipo;
                    return valor;
                }else if(this.instruccion==tipo_instruccion.LENGTH){
                    this.tipo=tipo_valor.NUMBER;
                    return new Number(arreglo.valor.length);
                 }
            }

        }else{
            //ERROR - VARIABLE this.id NO EXISTE
            almacen.dispatch(errores({
                tipo:'SEMANTICO',
                descripcion: this.id+' NO EXISTE, NO SE HARA PUSH',
                ambito:ambito.nombre
            }));
        }



        return null;
    }

    obtenerValor(ambito:entorno):object{
        return this.ejecutar(ambito);
    }

    obtenerTipo(ambito:entorno):tipo_valor{
        return this.tipo;
    }

}