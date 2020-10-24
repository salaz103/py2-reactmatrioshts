import entorno from "../entorno/entorno";
import simbolo from "../entorno/simbolo";
import { tipo_dato } from "../entorno/tipo";
import expresion from "./expresion";
import { traduccionexp } from "./traduccionexp";
import {almacen} from '../../../src/app';
import {errores} from '../../actions/ts.js';
import { generacion } from "../helpers/generacion";

export class identificador implements expresion{


    id:string;
    tipo:tipo_dato;
    linea:number;
    columna:number;

    constructor(identificador:string,linea:number,columna:number){
        this.id=identificador;
        this.linea=linea;
        this.columna=columna;
    }


    traducir(ambito: entorno): traduccionexp {
        const generador= generacion.getGenerador();
        let sim:simbolo;
        //1. PUEDE QUE EL ID SEA LOCAL O VENGA DE UN AMBITO SUPERIOR
        ///  LO QUE HAY QUE HACER ES IR RECORRIENDO LOS AMBITOS, INICIANDO POR EL ACTUAL, DONDE ESTOY (ambito)
        if(ambito.existe(this.id)){
            //console.log("SI ENCONTRE EL ID: "+this.id);
            sim=ambito.getSimbolo(this.id);
        }

         //AQUI COMIENZAN LAS OPERACIONES PARA VER SI ENCONTRO O NO EL SIMBOLO
    if(sim){
        let tmp_acceso= generador.generarTemporal();
        generador.sacarTemporal(tmp_acceso);
        let tmp_guardado= generador.generarTemporal();
        generador.agregarExpresion(tmp_acceso,"p","+",sim.direccionrelativa);
        generador.getValorStack(tmp_guardado,tmp_acceso);

        return new traduccionexp(tmp_guardado,true,sim.getTipoDato(),false);


    }else{
        almacen.dispatch(errores({
            tipo:'SEMANTICO',
            descripcion:'IDENTIFICADOR '+ this.id+' NO EXISTE',
            ambito:ambito.nombre,
            linea:this.linea,
            columna: this.columna
        }));
        console.log("ERROR- IDENTIFICADOR "+ this.id+" NO EXISTE");
    }


       return new traduccionexp("",false,tipo_dato.UNDEFINED,false);
    }
    
}