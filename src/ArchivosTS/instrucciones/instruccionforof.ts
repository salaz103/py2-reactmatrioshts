import entorno from "../entorno/entorno";
import simbolo from "../entorno/simbolo";
import { tipo_valor, tipo_variable } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";

export class instruccionforof implements instruccion{


    tipo:tipo_variable;
    id:string;
    iterado:string;
    lista:instruccion[];

    constructor(t:tipo_variable,nombre1:string,objeto:string,instrucciones:instruccion[]){
        this.tipo=t;
        this.id=nombre1;
        this.iterado=objeto;
        this.lista=instrucciones;

    }


    ejecutar(ambito: entorno): object {

      //PRIMERO VAMOS A VERIFICAR QUE EL ITERABLE EXISTA
      if(ambito.existe(this.iterado)){
          //SI EXISTE EL ITERADO ENTONCES SI PODEMOS PROCEDER A REALIZAR EL FOR OF
          let iterado= ambito.getSimbolo(this.iterado);
          let arreglo= Object.values(iterado.valor);
          let valores:expresion[]= [];
          arreglo.forEach(element => {
              valores.push(element);
          });
          
          
          let entornodeclaracion= new entorno("for-of",ambito);
          //AHORA SE AGREGA EL SIMBOLO QUE SERA EL ITERADOR
          let iterador= new simbolo(this.id,this.tipo=='LET'?true:false,iterado.tipovalor,undefined);
          entornodeclaracion.agregarSimbolo(iterador);
          
          for (let i = 0; i < valores.length; i++) {
             //console.log(valores[i].obtenerValor(ambito).valueOf());
            entornodeclaracion.asignarValor(this.id,valores[i].obtenerValor(ambito),iterado.tipovalor)
            //console.log(entornodeclaracion)
             for (let a = 0; a < this.lista.length; a++) {
                 this.lista[a].ejecutar(entornodeclaracion);
              }
          }


      }else{
          //ERROR- VARIABLE this.iterado no existe
      }  

     



        return null;
    }


}