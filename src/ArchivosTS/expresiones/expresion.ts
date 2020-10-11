import entorno from '../entorno/entorno';
import {tipo_valor} from '../entorno/tipo';


export default interface expresion extends nodoast{

    obtenerValor(ambito:entorno):object;

    obtenerTipo(ambito:entorno):tipo_valor;

}