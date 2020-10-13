import {funcion} from './funcion';

export class entorno{
    nombre:string;
    apuntadorPadre:entorno;
    funciones: Map<String,funcion>;

    constructor(apuntadorpadre?:entorno,nombre?:string){
        this.apuntadorPadre=apuntadorpadre!=null? apuntadorpadre:null;
        this.nombre=nombre!=null ? nombre:null;
        this.funciones= new Map();
    }

    esPadre(){
        return this.nombre!=null;
    }

    guardarFuncion(fn:funcion){
        let ambito:entorno= this;
        if(ambito.apuntadorPadre!=null){
            ambito=ambito.apuntadorPadre;
        }
        ambito.funciones.set(fn.nombre,fn);
    }
    
    getNombrePadre(id:string):string{
        let n= id;

        for(let ambito:entorno=this; ambito!=null; ambito=ambito.apuntadorPadre){
            console.log("NOMBRE AMBITO ACTUAL: "+ambito.getNombre());
            if(ambito.esPadre()){
                n = ambito.getNombre()+"_"+n;
            }
        }

        return n;
    }

    getNombre():string{
        return this.nombre;
    }

    getFuncion(id: string):funcion{
        for(let ambito : entorno = this; ambito != null; ambito = ambito.apuntadorPadre){
          const fn = ambito.funciones.get(id);
          if( fn != null){
            return fn;
          } 
        }
        return null;
      }
    

}