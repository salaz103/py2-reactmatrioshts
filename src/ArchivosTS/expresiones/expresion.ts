import entorno from "../entorno/entorno";

export default interface expresion extends nodoast{

    traducir(ambito:entorno);
   
}