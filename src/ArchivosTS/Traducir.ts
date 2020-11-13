import entorno from './entorno/entorno';
import { almacen } from '../../src/app';
import { limpiarconsola, tsfinal } from '../actions/ts.js';
import { declaracionfuncion } from './instrucciones/declaracionfuncion';
import { tipo_ambito } from './entorno/tipo';
import instruccion from './instrucciones/instruccion';
import { generacion } from './helpers/generacion';
import { generarFuncionesNativas } from './helpers/nativas';



function inicioTraduccion(ast: any) {
    //LIMPIAR LA CONSOLA
    almacen.dispatch(limpiarconsola());

    //PRIMERO DECLARAMOS EL ENTORNO GLOBAL
    const entornoGlobal = new entorno("global", tipo_ambito.GLOBAL,);


    console.log("Recibiendo el AST para EJECUTAR:");
    console.log(ast);
    traducir(ast, entornoGlobal);
    console.log("MI ENTORNO FINAL, CON TODAS LAS VARIABLES");
    console.log(entornoGlobal.tablasimbolos);
    console.log("MI ENTORNO FINAL, CON TODAS LAS FUNCIONES");
    console.log(entornoGlobal.tablaf);


    ////**********************  CODIGO DONDE SE GUARDAN LAS FUNCIONES Y SIMBOLOS GLOBALES FINALES**********/
    let ts = entornoGlobal.tablasimbolos;
    let tf= entornoGlobal.tablaf;
    let simbolosfinales = [];
    let funcionesfinales = [];

    ts.forEach(element => {
        simbolosfinales.push(element);
    });

    tf.forEach(funcion => {
         funcionesfinales.push(funcion);
     });
    almacen.dispatch(tsfinal(simbolosfinales, funcionesfinales));


}


function traducir(ast: any, entorno: entorno) {

    let generador = generacion.getGenerador();
    //ANTES DE COMENZAR A TRADUCIR, TENGO QUE GUARDAR TYPES Y FUNCIONES, POR QUE 
    //PUEDE QUE DENTRO DE UN FUNCION VENGA OTRA FUNCION Y TENEMOS QUE GUARDARLAS
    //PASO 0
    for (let i = 0; i < ast.length; i++) {
        let funcion: instruccion = ast[i];
        if (funcion instanceof declaracionfuncion) {
            let funcion2 = entorno.existeFuncion(funcion.nombre);
            //SI NO EXISTE
            if (funcion2 == null) {
                entorno.agregarFuncion(funcion);
            } else {
                //SI YA EXISTE ENTONCES NO LA GUARDAMOS Y REPORTAMOS UN ERROR

            }
        }
    }


    //PASO 1 - GUARDAR EL CODIGO DEL MAIN
    generador.agregarcodigo3d("void main(){");
    ast.forEach((ins: instruccion) => {

        if (!(typeof (ins) == "string")) {

            //PENDIENTE
            //IF(INSTRUCCION != TYPE ){ ENTONCES TRADUCIMOS}

            if (ins instanceof declaracionfuncion) {

            } else {
                ins.traducir(entorno);
            }

        }


    });
    //UNA VEZ YA TERMINAMOS DE TRADUCIR, TENEMOS QUE "CERRAR" EL AMBITO MAIN
    generador.agregarcodigo3d("return;");
    generador.agregarcodigo3d("}");
    generador.setearMain();



    //PASO 2
    //TRADUCIR FUNCIONES Y TYPES
    //FALTA AGREGAR TYPES
    ast.forEach((ins: instruccion) => {
        if (ins instanceof declaracionfuncion) {
            ins.traducir(entorno);
        }
    });
    generador.setearFuncionesUsuario();

    //PASO 3
    //AQUI IRIA EL ESPACIO DONDE TENDRIAMOS QUE INGRESAR LA FUNCIONES NATIVAS
    generarFuncionesNativas();
    generador.setearFuncionesNativas();

    console.log(entorno.tablaf);
    console.log(generador);
    return;

}

export default inicioTraduccion;