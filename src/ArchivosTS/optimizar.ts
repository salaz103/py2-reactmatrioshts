import { generacion } from './helpers/generacion';
import instruccion from './optimizacion/instruccion';
import {almacen} from '../../src/app';
import {limpiarOptimizaciones} from '../actions/ts.js';


function inicioOptimizacion(arbolInstrucciones: any) {
    
    almacen.dispatch(limpiarOptimizaciones());
    console.log("Recibiendo el ARBOL DEL CODIGO 3D para OPTIMIZAR:");
    console.log(arbolInstrucciones);
    optimizar(arbolInstrucciones);


}


function optimizar(ast: any) {
    let salida:string="";
    ast.forEach((ins:instruccion) => {
        salida=salida+ins.optimizar();
    });

   //console.log("CODIGO SALIDA, DESPUES DE OPTIMIZAR"); 
   //console.log(salida);
}

export default inicioOptimizacion;