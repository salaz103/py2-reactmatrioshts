import entorno from './entorno/entorno';
import {almacen} from '../../src/app';
import {limpiarconsola,tsfinal} from '../actions/ts.js';
import { declaracionfuncion } from './instrucciones/declaracionfuncion';
import { tipo_ambito } from './entorno/tipo';
import instruccion from './instrucciones/instruccion';
import { generacion } from './helpers/generacion';



function inicioTraduccion(ast:any){
    //LIMPIAR LA CONSOLA
    almacen.dispatch(limpiarconsola());

//PRIMERO DECLARAMOS EL ENTORNO GLOBAL
const entornoGlobal= new entorno("global",tipo_ambito.GLOBAL,);


console.log("Recibiendo el AST para EJECUTAR:");
console.log(ast);
traducir(ast,entornoGlobal);
console.log("MI ENTORNO FINAL, CON TODAS LAS VARIABLES");
console.log(entornoGlobal.tablasimbolos);


////**********************  CODIGO DONDE SE GUARDAN LAS FUNCIONES Y SIMBOLOS GLOBALES FINALES**********/
let ts= entornoGlobal.tablasimbolos;
//let tf= entornoGlobal.tablaf;
let simbolosfinales=[];
let funcionesfinales=[];

ts.forEach(element => {
    simbolosfinales.push(element);
});

// tf.forEach(funcion => {
//     funcionesfinales.push(funcion);
// });
almacen.dispatch(tsfinal(simbolosfinales,funcionesfinales));


}


function traducir(ast:any,entorno:entorno){
    
   //EN LA PRIMERA PASADA LO QUE HAREMOS SERA TRADUCIR FUNCIONES Y TYPES
   //FALTA AGREGAR TYPES
   ast.forEach((ins:instruccion) => {
       if(ins instanceof declaracionfuncion){
            ins.traducir(entorno);
       }
   });
    
   //AQUI IRIA EL ESPACIO DONDE TENDRIAMOS QUE INGRESAR LA FUNCIONES NATIVAS


    //AQUI COMIENZA LA SEGUNDA PASADA DONDE TRADUCIREMOS TODO A EXCEPCION DE LAS FUNCIONES Y TYPES
    //PERO AQUI YA ESTAMOS EN EL AMBITO GLOBAL ENTONCES TENEMOS QUE PONER EN EL CODIGO el main()
    let generador= generacion.getGenerador();
    generador.agregarcodigo3d("void main(){");
    ast.forEach((ins:instruccion) => {
        //AQUI TENDRIAMOS QUE LEER EL AST, TODAS LAS INSTRUCCIONES A EXCEPCION DE LOS TYPES, POR QUE ESOS
        //YA FUERON TRADUCIDOS ARRIBA

        if(!(typeof(ins)=="string")){

            //PENDIENTE
        //IF(INSTRUCCION != TYPE ){ ENTONCES TRADUCIMOS}

            ins.traducir(entorno);

            
        }

        


        //console.log(ins);
        //ins.traducir(entorno);
    });
    //UNA VEZ YA TERMINAMOS DE TRADUCIR, TENEMOS QUE "CERRAR" EL AMBITO MAIN
    generador.agregarcodigo3d("return;");
    generador.agregarcodigo3d("}");
}

export default inicioTraduccion;