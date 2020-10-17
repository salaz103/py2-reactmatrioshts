import entorno from '../entorno/entorno';

export default interface instruccion extends nodoast{
    traducir(ambito:entorno);
}