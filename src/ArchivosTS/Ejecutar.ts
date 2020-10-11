import entorno from './entorno/entorno';
import {almacen} from '../../src/app';
import {limpiarconsola,tsfinal} from '../actions/ts.js';
import { declaracionfuncion } from './instrucciones/declaracionfuncion';



function inicioEjecucion(ast:any){
    //ANTES DE EJECUTAR, LIMPIAR LA CONSOLA
    almacen.dispatch(limpiarconsola());

//CADA ENTORNO TIENE UNA TABLA DE SIMBOLOS COMO UN VALOR
const entornoGlobal= new entorno("global",);

console.log("Recibiendo el AST para EJECUTAR:");
console.log(ast);
ejecutar(ast,entornoGlobal);
//console.log("MI ENTORNO FINAL, CON TODAS LAS VARIABLES");
//console.log(entornoGlobal.tablasimbolos);
let ts= entornoGlobal.tablasimbolos;
let tf= entornoGlobal.tablaf;
let simbolosfinales=[];
let funcionesfinales=[];

ts.forEach(element => {
    simbolosfinales.push(element);
});

tf.forEach(funcion => {
    funcionesfinales.push(funcion);
});

//console.log(simbolosfinales);
//console.log(funcionesfinales);

almacen.dispatch(tsfinal(simbolosfinales,funcionesfinales));


}


function ejecutar(ast:any,entorno:entorno){

    //PRIMERA PASADA, GUARDAR TODAS LAS FUNCIONES
    for (let i = 0; i < ast.length; i++) {
        if(ast[i] instanceof declaracionfuncion){
            entorno.agregarFuncion(ast[i]);
        }
    }

    //AHORA YA EJECUTO A EXCEPCION DE LAS FUNCIONES

    for (let a = 0; a < ast.length; a++) {
        if(ast[a] instanceof declaracionfuncion){
            continue;
        }
        ast[a].ejecutar(entorno);     
    }

}

export default inicioEjecucion;