import entorno from "../entorno/entorno";
import simbolo from "../entorno/simbolo";
import { tipo_valor, tipo_variable } from "../entorno/tipo";
import instruccion from "./instruccion";
import { variable } from "./variable";
import {almacen} from '../../../src/app';
import {errores} from '../../actions/ts.js';

export class declaracion implements instruccion{

    tipovariable:tipo_variable;
    variables:variable[];
    /*linea:number;
    columna:number;*/


    constructor(tipov:tipo_variable,vars:variable[]/*,l:number,c:number*/){
        this.tipovariable=tipov;
        this.variables= vars;
        /*this.linea=l;
        this.columna=c;*/
    }
    

    ejecutar(ambito:entorno){
        //1. Recorrer el arreglo de variables
        //2. Revisar si la variable ya existe SOLO EN ESTE AMBITO, YA SEA NUEVO O GLOBAL

        for (let i = 0; i < this.variables.length; i++) {
            //AQUI VOY RECORRIENDO EL ARREGLO DE VARIABLES

            //TOCA REVISAR SI LA VARIABLE EXISTE PERO SOLO EN ESTE AMBITO
            //POR QUE SI EXISTE EN UN AMBITO SUPERIOR ESO NO NOS IMPORTA
            if(ambito.existeLocal(this.variables[i].id)){
                //SI EXISTE LOCALMENTE ENTONCES NO LA PODEMOS DECLARAR
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'IDENTIFICADOR '+ this.variables[i].id+' YA EXISTE EN AMBITO '+ ambito.nombre,
                    ambito:ambito.nombre
                }));
                console.log("ERROR- ID: "+this.variables[i].id+" YA EXISTE EN ESTE AMBITO "+ ambito.nombre);    
            }else{

                //SI NO EXISTE, ENTONCES PODEMOS DECLARAR LA NUEVA VARIABLE PERO TENEMOS 2 TIPOS DE VARIABLES
                //CONST Y LET, ENTONCES LO PRIMERO ES VER QUE TIPO DE VARIABLE ES

                if(this.tipovariable==tipo_variable.CONST){
                    //SI ENTRO AQUI ES POR QUE LAS VARIABLES O VARIABLE SON CONST
                    //LAS VARIABLES CONST TIENEN QUE VENIR CON UN VALOR OBLIGATORIO

                    //ANTES VOY A PREGUNTAR SI ES UN ARREGLO O NO
                    if(this.variables[i].arreglo){
                        //SI ENTRO AQUI ES POR QUE ES UN ARREGLO CONST
                        //AQUI COMIENZO A VALIDAR LO QUE TENGA QUE VALIDAR SI ES UN ARREGLO

                        if(this.variables[i].tipodato==undefined){
                            //SI EL TIPO DE DATO ES UNDEFINED ENTONCES SOLO TRAE ID Y PUEDE QUE TRAIGA O NO VALORES
                            //SIGNIFICA QUE EL ARREGLO SERA DE CUALQUIER TIPO
                            
                            
                            let arreglovalores=[];
                            if(this.variables[i].listae!=undefined){
                                for (let a = 0; a < this.variables[i].listae.length; a++) {
                                    arreglovalores.push(this.variables[i].listae[a]);
                                }
                            }
                            

                            const nuevosimbolo= new simbolo(this.variables[i].id,false,tipo_valor.ANY,new Object(arreglovalores));
                            ambito.agregarSimbolo(nuevosimbolo);
                            //console.log(nuevosimbolo);
                            /*ambito.agregarSimbolo(nuevosimbolo);
                            console.log("VARIABLE CONST: "+this.variables[i].id+" GUARDADA");*/
                        }else{
                            //SI TRAE UN TIPO DE DATO
                            //HAY 2 TIPOS DE OPCIONES
                            //1. TRAIGA EXPRESIONES
                            //2. NO TRAIGA EXPRESIONES

                            //SI TRAE EXPRESIONES HAY QUE VALIDAR QUE TODAS SEAN DEL MISMO TIPO
                            if(this.variables[i].listae!=undefined){

                                let iguales=true;
                            for (let a = 0; a < this.variables[i].listae.length; a++) {
                                if(this.variables[i].listae[a].obtenerTipo(ambito)==this.variables[i].tipodato){
                                    iguales=true
                                }else{
                                    iguales=false;
                                    break;
                                }
                            }
                            if(iguales){
                                //SI SON TODOS IGUALES ENTONCES LO GUARDO
                                let arreglovalores=[];
                            for (let a = 0; a < this.variables[i].listae.length; a++) {
                                arreglovalores.push(this.variables[i].listae[a]);
                            }

                            const nuevosimbolo= new simbolo(this.variables[i].id,false,this.variables[i].tipodato,new Object(arreglovalores));
                            ambito.agregarSimbolo(nuevosimbolo);
                            //console.log(nuevosimbolo);
                            }else{
                                //ERROR
                                almacen.dispatch(errores({
                                    tipo:'SEMANTICO',
                                    descripcion:'ARREGLO '+this.variables[i].id +' NO TODAS SUS ENTRADAS SON DEL MISMO TIPO',
                                    ambito:ambito.nombre
                                }));
                            }

                            }else{
                                //SI NO TRAE EXPRESIONES ENTONCES SOLO GUARDAMOS EL TIPO DE DATO
                                 let arreglovalores=[];
                                 const nuevosimbolo= new simbolo(this.variables[i].id,false,this.variables[i].tipodato,new Object(arreglovalores));
                                 ambito.agregarSimbolo(nuevosimbolo);
                            }
                            
                            

                        }


                    }else{
                        //SI ENTRO AQUI ES POR QUE ES UNA VARIABLE CONST "PLANA"
                        
                        if(this.variables[i].exp!=undefined){
                            //SI SON DIFERENTES DE UNDEFINED, SIGNIFICA QUE SI TRAEN UN VALOR
                            //EN LAS CONST HAY DOS FORMAS DE DECLARAR
                            //1. const id=expresion
                            //2. const id:tipodato=expresion
                            if(this.variables[i].tipodato==undefined){
                                //SI EL TIPO DE DATO ES UNDEFINED ENTONCES SOLO TRAE ID Y VALOR
                                //HAY QUE PONERLE EL TIPO DE DATO DE LA EXPRESION
                                const valor= this.variables[i].exp.obtenerValor(ambito);
                                const tipo= this.variables[i].exp.obtenerTipo(ambito);
                                const nuevosimbolo= new simbolo(this.variables[i].id,false,tipo,valor);
                                ambito.agregarSimbolo(nuevosimbolo);
                                console.log("VARIABLE CONST: "+this.variables[i].id+" GUARDADA");
                            }else{
                                //DE LO CONTRARIO SIGNIFICA QUE VIENE UN TIPO DE DATO
                                //ENTONCES AQUI LO QUE TOCA HACER ES VERIFICAR SI EL TIPO DE DATO ENTRANTE
                                //ES IGUAL AL TIPO DE DATO DE LA EXPRESION
                                const valor= this.variables[i].exp.obtenerValor(ambito);
                                const tipo= this.variables[i].exp.obtenerTipo(ambito);
                                if(this.variables[i].tipodato==tipo){
                                    //SI SON LOS MISMOS TIPOS DE DATO ENTONCES GUARDAMOS EL SIMBOLO
                                const nuevosimbolo= new simbolo(this.variables[i].id,false,tipo,valor);
                                ambito.agregarSimbolo(nuevosimbolo);
                                console.log("VARIABLE CONST: "+this.variables[i].id+" GUARDADA");
                                }else{
                                    almacen.dispatch(errores({
                                        tipo:'SEMANTICO',
                                        descripcion:'CONST '+ this.variables[i].id+' TIPO DATO Y VALOR NO SON SIMILARES',
                                        ambito:ambito.nombre
                                    }));
                                    console.log("ERROR EN CONST: "+this.variables[i].id+" TIPO DATO Y VALOR NO SON SIMILARES");
                                }
    
                            }
    
    
    
                        }else{
                            almacen.dispatch(errores({
                                tipo:'SEMANTICO',
                                descripcion:'CONST '+ this.variables[i].id+' NO ESTA INICIALIZADA',
                                ambito:ambito.nombre
                            }));
                            console.log("ERROR - CONST "+this.variables[i].id+ " NO ESTA INICIALIZADA");
                        }

                    }


                    


                }else if(this.tipovariable==tipo_variable.LET){
                    //SI ENTRO AQUI ES POR QUE LAS VARIABLES O VARIABLE SON LET
                    //LAS VARIABLES LET SE PUEDEN GUARDAR CON O SIN VALOR
                    //AQUI VAMOS A VERIFICAR LAS COMBINACIONES, LO UNICO QUE SI TIENE QUE VENIR
                    //COMO MINIMO ES EL IDs
                    //LAS POSIBLES COMBINACIONES SON:
                    //1. LET ID;
                    //2. LET ID:TIPODATO;
                    //3. LET ID=EXPRESION; //AQUI HAY QUE PONERLE EL TIPO DE DATO QUE EL MISMO DE LA EXPRESION
                    //4. LET ID:TIPODATO=EXPRESION; AQUI TOCA VALIDAD SI EL TIPO DE DATO ES IGUAL A LA EXPRESION
                
                
                    if(this.variables[i].arreglo){

                        //SI ENTRO AQUI ES POR QUE ES UN ARREGLO LET 


                        if(this.variables[i].tipodato==undefined){
                            //SI EL TIPO DE DATO ES UNDEFINED ENTONCES SOLO TRAE ID Y VALOR
                            //SIGNIFICA QUE EL ARREGLO SERA DE CUALQUIER TIPO
                            //SOLO GUARDO SUS VALORES 

                            let arreglovalores=[];
                            if(this.variables[i].listae!=undefined){
                                for (let a = 0; a < this.variables[i].listae.length; a++) {
                                    arreglovalores.push(this.variables[i].listae[a]);
                                }
                            }

                            const nuevosimbolo= new simbolo(this.variables[i].id,true,tipo_valor.ANY,new Object(arreglovalores));
                            ambito.agregarSimbolo(nuevosimbolo);
                            //console.log(nuevosimbolo);
                            /*ambito.agregarSimbolo(nuevosimbolo);
                            console.log("VARIABLE CONST: "+this.variables[i].id+" GUARDADA");*/
                        }else{
                            //SI TRAE UN TIPO DE DATO, HAY QUE VALIDAR QUE TODOS LOS VALORES EN EL ARREGLO SEAN DEL MISMO TIPO

                            if(this.variables[i].listae!=undefined){
                                let iguales=true;
                            for (let a = 0; a < this.variables[i].listae.length; a++) {
                                if(this.variables[i].listae[a].obtenerTipo(ambito)==this.variables[i].tipodato){
                                    iguales=true
                                }else{
                                    iguales=false;
                                    break;
                                }
                            }
                            if(iguales){
                                //SI SON TODOS IGUALES ENTONCES LO GUARDO
                                let arreglovalores=[];
                            for (let a = 0; a < this.variables[i].listae.length; a++) {
                                arreglovalores.push(this.variables[i].listae[a]);
                            }

                            const nuevosimbolo= new simbolo(this.variables[i].id,true,this.variables[i].tipodato,new Object(arreglovalores));
                            ambito.agregarSimbolo(nuevosimbolo);
                            //console.log(nuevosimbolo);
                            }else{
                                almacen.dispatch(errores({
                                    tipo:'SEMANTICO',
                                    descripcion:'ARREGLO '+this.variables[i].id +' NO TODAS SUS ENTRADAS SON DEL MISMO TIPO',
                                    ambito:ambito.nombre
                                }));
                            }
                        }else{
                            //SI NO TRAE TIPO DE DATO, SOLO GUARDAMOS EL SIMBOLO CON EL TIPO DE DATO
                            let arreglovalores=[];
                            const nuevosimbolo= new simbolo(this.variables[i].id,true,this.variables[i].tipodato,new Object(arreglovalores));
                            ambito.agregarSimbolo(nuevosimbolo);
                        }
                            
                        }


                    }else{
                        ///SI ENTRO AQUI ES POR QUE ES UNA VARIABLE LET "PLANA"



                        if(this.variables[i].tipodato==undefined && this.variables[i].exp==undefined){
                            const nuevosimbolo= new simbolo(this.variables[i].id,true,undefined,undefined);
                            ambito.agregarSimbolo(nuevosimbolo);
                            console.log("VARIABLE LET: "+this.variables[i].id+" GUARDADA");
                        }else if(this.variables[i].tipodato!=undefined && this.variables[i].exp==undefined){
                            const tipodato= this.variables[i].tipodato;
                            const nuevosimbolo= new simbolo(this.variables[i].id,true,tipodato,undefined);
                            ambito.agregarSimbolo(nuevosimbolo);
                            console.log("VARIABLE LET: "+this.variables[i].id+" GUARDADA");
        
                        }else if(this.variables[i].tipodato==undefined && this.variables[i].exp!=undefined){
                            const valor= this.variables[i].exp.obtenerValor(ambito);
                            const tipodato= this.variables[i].exp.obtenerTipo(ambito);
                            const nuevosimbolo= new simbolo(this.variables[i].id,true,tipodato,valor);
                            ambito.agregarSimbolo(nuevosimbolo);
                            console.log("VARIABLE LET: "+this.variables[i].id+" GUARDADA");
        
                        }else if(this.variables[i].tipodato!=undefined && this.variables[i].exp!=undefined){
                            //SOLO HAY QUE VERIFICAR SI EL TIPO DE DATO ENTRANTE ES IGUAL A LA DE LA EXPRESION
                            const valor= this.variables[i].exp.obtenerValor(ambito);
                            const tipodato= this.variables[i].exp.obtenerTipo(ambito);
        
                            if(this.variables[i].tipodato==tipodato){
                            const nuevosimbolo= new simbolo(this.variables[i].id,true,tipodato,valor);
                            ambito.agregarSimbolo(nuevosimbolo);
                            console.log("VARIABLE LET: "+this.variables[i].id+" GUARDADA");
                            }else{
                                almacen.dispatch(errores({
                                    tipo:'SEMANTICO',
                                    descripcion:'VARIABLE LET '+ this.variables[i].id+' NO ES COMPATIBLE CON '+tipodato,
                                    ambito:ambito.nombre
                                }));
                                console.log("ERROR - LET: "+this.variables[i].id+" NO ES COMPATIBLE CON "+tipodato);
                            }
        
                            
                        }



                    }

                    
                }



            }
            
        }




        /*this.variables.forEach(variable => {
            
            if(ambito.existe(variable.id)){
                //ESTA VARIABLE YA EXISTE
                console.log("ERROR - LA VARIABLE " +variable.id+" ya existe en este ambito" + ambito.nombre);
            }else{
                //SIGNIFICA LA VARIABLE NO EXISTE EN ESTE AMBITO, SE PUEDE GUARDAR
                //LO PRIMERO QUE SE HARA ES OBTENER EL VALOR DE LA EXPRESION, SI ES QUE TRAE
                let expresion:object;
                ///VERIFICAR SI TRAE UNA EXPRESION
                if(variable.exp!=undefined){
                    expresion= variable.exp.obtenerValor(ambito);
                }

                //VERIFICAR SI ES CONST O LET- con this.tipovariable
                if(this.tipovariable==tipo_variable.CONST){
                    //SI ENTRO AQUI ES POR QUE ES CONST, HAY QUE VERIFICAR SI TRAE UN VALOR
                    if(variable.exp!=undefined){
                        //SIGNIFICA QUE SI TRAE UN VALOR, LA PODEMOS GUARDAR
                        //ANTES DE GUARDARLA HAY QUE VERIFICAR SI TRAE TIPO DE DATO,
                        let tipodato:tipo_valor;
                        if(variable.tipodato==undefined){
                        //SI NO TRAJERA TIPO DE DATO, SE TOMA EL TIPO DE DATO DE LA EXPRESION
                        // AQUI LA EXPRESION SI ES OBLIGATORIA QUE VENGA
                            tipodato= variable.exp.obtenerTipo(ambito);
                        //AQUI SE GUARDA LA NUEVA CONS CUANDO ESTA NO TRAE TIPO DE DATO
                        //POR LO QUE SE LE ASIGNO EL TIPO DE DATO DE LA EXPRESION
                            const nuevosimbolo= new simbolo(variable.id,false,tipodato,expresion);
                            ambito.agregarSimbolo(nuevosimbolo);
                            console.log("VARIABLE CONST: "+variable.id+" GUARDADA");
                        }else{
                            //SIGNIFICA QUE SI TRAE UN TIPO DE DATO
                             //ANTES DE PODERLA GUARDAR TAMBIEN SE DEBE VERIFICAR QUE EL TIPO DE DATO
                             //Y EL VALOR SEAM COMPATIBLES
                            if(variable.tipodato==variable.exp.obtenerTipo(ambito)){
                            //SI SON COMPATIBLES SE PUEDE GUARDAR LA VARIABLE CONST
                            tipodato= variable.tipodato;
                             //AHORA YA SE PUEDE GUARDAR
                            const nuevosimbolo= new simbolo(variable.id,false,tipodato,expresion);
                            ambito.agregarSimbolo(nuevosimbolo);
                            console.log("VARIABLE CONST: "+variable.id+" GUARDADA");
                            }else{
                                console.log("ERROR- LA VARIABLE CONST: "+ variable.id+" SI TRAE VALOR PERO NO ES DEL MISMO TIPO DE DATO");
                            }
                        }
                            
                    }else{
                    console.log("ERROR - VARIABLE CONST: "+ variable.id+" DEBE DECLARARSE CON VALOR");
                    }

                }else if(this.tipovariable==tipo_variable.LET){
                    //LAS VARIABLES LET SE PUEDEN GUARDAR CON O SIN VALOR
                    //AQUI VAMOS A VERIFICAR LAS COMBINACIONES, LO UNICO QUE SI TIENE QUE VENIR
                    //COMO MINIMO ES EL IDs

                    let tipodato:tipo_valor;
                    
                    if(variable.tipodato== undefined && variable.exp==undefined){
                        //SIGNIFICA QUE SOLO TRAE EL ID
                        tipodato=undefined;
                        const nuevosimbolo= new simbolo(variable.id,true,tipodato,expresion);
                        ambito.agregarSimbolo(nuevosimbolo);
                        console.log("VARIABLE LET: "+variable.id+" GUARDADA");
                    }else if(variable.tipodato== undefined && variable.exp!=undefined){
                        //SIGNIFICA QUE NO TRAE TIPO DE DATO PERO SI VALOR, ENTONCES SE LE PUEDE ASIGNAR 
                        //EL TIPO DE DATO DE LA EXPRESION
                        tipodato= variable.exp.obtenerTipo(ambito);
                        const nuevosimbolo= new simbolo(variable.id,true,tipodato,expresion);
                        ambito.agregarSimbolo(nuevosimbolo);
                        console.log("VARIABLE LET: "+variable.id+" GUARDADA");

                    }else if(variable.tipodato!=undefined && variable.exp==undefined){
                        //SIGNIFICA QUE SI TRAE EL TIPO DE DATO PERO NO TRAE EXPRESION
                        tipodato= variable.tipodato;
                        const nuevosimbolo= new simbolo(variable.id,true,tipodato,expresion);
                        ambito.agregarSimbolo(nuevosimbolo);
                        console.log("VARIABLE LET: "+variable.id+" GUARDADA");

                    }else if(variable.tipodato!=undefined && variable.exp!=undefined){
                        //SIGNIFICA QUE TRAE EL TIPO DE DATO Y LA EXPRESION
                        //AQUI HAY QUE VALIDAR QUE EL 
                        //TIPO DE DATO Y EL TIPO DE DATO DE LA EXPRESION SEAN IGUALES
                        if(variable.tipodato==variable.exp.obtenerTipo(ambito)){
                            //SI LOS TIPOS DE DATOS SON IGUALES ENTONCES PODEMOS GUARDAR LA NUEVA VARIABLE
                        tipodato= variable.tipodato;
                        const nuevosimbolo= new simbolo(variable.id,true,tipodato,expresion);
                        ambito.agregarSimbolo(nuevosimbolo);
                        console.log("VARIABLE LET: "+variable.id+" GUARDADA");

                        }else{
                        console.log("ERROR- LA VARIABLE LET: "+ variable.id+" SI TRAE VALOR PERO NO ES DEL MISMO TIPO DE DATO");
                        }
                    }


                }
                
            }
        });*/

        return null;
    }

}