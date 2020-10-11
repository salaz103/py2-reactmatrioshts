import entorno from '../entorno/entorno';

export default interface instruccion extends nodoast{

    ejecutar(ambito:entorno):object;
}