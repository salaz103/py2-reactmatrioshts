import { generacion } from './helpers/generacion';
import instruccion from './optimizacion/instruccion';
import {almacen} from '../../src/app';
import {limpiarOptimizaciones,codigoconsola} from '../actions/ts.js';


function inicioOptimizacion(arbolInstrucciones: any) {
    
    almacen.dispatch(limpiarOptimizaciones());
    console.log("Recibiendo el ARBOL DEL CODIGO 3D para OPTIMIZAR:");
    console.log(arbolInstrucciones);
    optimizar(arbolInstrucciones);
    almacen.dispatch(codigoconsola("CODIGO OPTIMIZADO\n"));

}


function optimizar(ast: any) {
    const generador= generacion.getGenerador();
    let salida:string="";
    ast.forEach((ins:instruccion) => {
        salida=salida+ins.optimizar();
    });

    generador.setearCodigoOptimizado(salida);
   //console.log("CODIGO SALIDA, DESPUES DE OPTIMIZAR"); 
   //console.log(salida);
}

export default inicioOptimizacion;