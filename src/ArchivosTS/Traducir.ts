import entorno from './entorno/entorno';
import {almacen} from '../../src/app';
import {limpiarconsola,tsfinal} from '../actions/ts.js';
import { declaracionfuncion } from './instrucciones/declaracionfuncion';



function inicioTraduccion(ast:any){
    //ANTES DE EJECUTAR, LIMPIAR LA CONSOLA
    almacen.dispatch(limpiarconsola());

//CADA ENTORNO TIENE UNA TABLA DE SIMBOLOS COMO UN VALOR
const entornoGlobal= new entorno("global",);

console.log("Recibiendo el AST para EJECUTAR:");
console.log(ast);
traducir(ast,entornoGlobal);
//console.log("MI ENTORNO FINAL, CON TODAS LAS VARIABLES");
//console.log(entornoGlobal.tablasimbolos);



////**********************  CODIGO DONDE SE GUARDAN LAS FUNCIONES Y SIMBOLOS GLOBALES FINALES**********/
/*let ts= entornoGlobal.tablasimbolos;
let tf= entornoGlobal.tablaf;
let simbolosfinales=[];
let funcionesfinales=[];

ts.forEach(element => {
    simbolosfinales.push(element);
});

tf.forEach(funcion => {
    funcionesfinales.push(funcion);
});
almacen.dispatch(tsfinal(simbolosfinales,funcionesfinales));*/


}


function traducir(ast:any,entorno:entorno){
    
    //PRIMERA PASADA, GUARDAR TODAS LAS FUNCIONES
    /*for (let i = 0; i < ast.length; i++) {
        if(ast[i] instanceof declaracionfuncion){
            entorno.agregarFuncion(ast[i]);
        }
    }*/
    
    
    //COMIENZA LA TRADUCCION
    for (let a = 0; a < ast.length; a++) {
        if(ast[a] instanceof declaracionfuncion){
            continue;
        }
        ast[a].traducir(entorno);
    }

}

export default inicioTraduccion;