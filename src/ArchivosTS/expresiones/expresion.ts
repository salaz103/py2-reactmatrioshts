import entorno from "../entorno/entorno";
import { traduccionexp } from "./traduccionexp";

export default interface expresion extends nodoast{

    traducir(ambito:entorno):traduccionexp;
   
}