import { tipo_valor } from "./entorno/tipo";

const nodobase= require('../arbolBase/nodobase').nodobase;


let grafo:string='';
let contador:number;


function AST_grafo(ast:typeof nodobase): string {
    contador = 0;
    grafo = "digraph AST {\n";
    if (ast != null) {
      graficar(ast);
    }
    grafo += "\n}";
    return grafo;
  }


function graficar(ast:typeof nodobase):void{

    if(ast instanceof Object){
        let padre= contador;
        grafo += "node"+padre+"[label=\""+ast.tipo+"\"];\n";
        if (ast.hasOwnProperty("hijos")){
            ast.hijos.forEach((hijo:any) => {
                let idHijo = ++contador;
                if (hijo instanceof Object){
                    graficar(hijo);
                }else{
                grafo+= "node"+idHijo+"[label=\""+hijo+"\"];\n"
                }
                grafo+= "node"+padre+"->node"+idHijo+";\n";
            });
        }
    }
}

function desanidar(ast:typeof nodobase):string{
    //PRIMERO RECIBIMOS LA RAIZ DEL AST
    if(ast.tipo=='INSTRUCCIONES'){
        let recolector='';
        ast.hijos.forEach(instruccion => {
            recolector += desanidar(instruccion);
        });

        return recolector;
    }
//*******************INSTRUCCIONES*******************************
    else if(ast.tipo=='IMPRIMIR'){
        let recolector='';
        let expresion= desanidar(ast.hijos[4]);
        recolector= "console.log(" + expresion + "); \n"
        return recolector;
    }else if(ast.tipo=='DECLARACION_VARIABLE'){
        let recolector='';
        let tipovariable= desanidar(ast.hijos[0]);
        let listavariables= desanidar(ast.hijos[1]);
        recolector= tipovariable+" " + listavariables ;
        return recolector;
    }else if(ast.tipo=='IDECLARACIONES'){
        let recolector=desanidar(ast.hijos[0])+";\n";
        return recolector;
    }else if(ast.tipo=='ASIGNACION'){
        let recolector='';
        let id= ast.hijos[0];
        let expresion= desanidar(ast.hijos[2]);
        recolector= id+"="+expresion;
        return recolector;
    }else if(ast.tipo=='WHILE'){
        let recolector='';
        let expresion= desanidar(ast.hijos[2]);
        let lista= desanidar(ast.hijos[5]);
        recolector= "while("+expresion+"){\n"+lista+"}\n";
        return recolector;        
    }else if(ast.tipo=='DO_WHILE'){
        let recolector='';
        let lista= desanidar(ast.hijos[2]);
        let expresion= desanidar(ast.hijos[6]);
        recolector= "do{\n"+lista+"}while("+expresion+")\n";
        return recolector;
    }else if(ast.tipo=='FUNCION'){
        //HAY 4 TIPOS DE DECLARACION DE FUNCION
        let recolector='';
        let recolector2='';
        let instruccionesPadre='';
        // function id(){instrucciones}
        if(ast.hijos.length==7){
            const instrucciones= ast.hijos[5].hijos;
            if(vieneFuncion(instrucciones)){
                //SI VIENE UNA FUNCION HAY QUE IMPRIMIR ESA FUNCION Y CAMBIARLE EL NOMBRE
                const nombrePadre= ast.hijos[1];
                instrucciones.forEach(instruccion => {
                    if(instruccion.tipo=='FUNCION'){
                        //AQUI LE CAMBIAMOS EL NOMBRE A LA FUNCION ANIDADA
                        instruccion.hijos[1]=nombrePadre+"_"+instruccion.hijos[1];
                        recolector2+= desanidar(instruccion); 
                    }
                });
                
                //TOCA IMPRIMIR LA FUNCION PADRE, ES DECIR LA FUNCION ACTUAL
                instrucciones.forEach(instruccion => {
                    if(instruccion.tipo!='FUNCION'){
                        instruccionesPadre+= desanidar(instruccion);
                    }
                });
                
                recolector= "function "+nombrePadre+"(){\n"+ instruccionesPadre+"}\n"+ recolector2;
                return recolector;
                
            }else{
              let id= ast.hijos[1];
              let instrucciones= desanidar(ast.hijos[5]);
              recolector="function "+id+"(){\n"+instrucciones+"}\n";
              return recolector;
            }
         
            
            //function id (parametros) {lista}
        }else if(ast.hijos.length==8){
            const instrucciones= ast.hijos[6].hijos;
            const parametros= desanidar(ast.hijos[3]);
            if(vieneFuncion(instrucciones)){
                //SI VIENE UNA FUNCION HAY QUE IMPRIMIR ESA FUNCION Y CAMBIARLE EL NOMBRE
                const nombrePadre= ast.hijos[1];
                instrucciones.forEach(instruccion => {
                    if(instruccion.tipo=='FUNCION'){
                        //AQUI LE CAMBIAMOS EL NOMBRE A LA FUNCION ANIDADA
                        instruccion.hijos[1]=nombrePadre+"_"+instruccion.hijos[1];
                        recolector2+= desanidar(instruccion); 
                    }
                });
               
                //TOCA IMPRIMIR LA FUNCION PADRE, ES DECIR LA FUNCION ACTUAL
                instrucciones.forEach(instruccion => {
                    if(instruccion.tipo!='FUNCION'){
                        instruccionesPadre+= desanidar(instruccion);
                    }
                });
               
                recolector= "function "+nombrePadre+"("+parametros+"){\n"+instruccionesPadre+"}\n"+recolector2;
                return recolector;
                
            }else{
              let id= ast.hijos[1];
              let instrucciones= desanidar(ast.hijos[6]);
              recolector="function "+id+"("+parametros+"){\n"+instrucciones+"}\n";
              return recolector;
            }


            //function id ( ) : tipodato {lista}
        }else if(ast.hijos.length==9){

            const instrucciones= ast.hijos[7].hijos;
            const tipodato= desanidar(ast.hijos[5]);
            if(vieneFuncion(instrucciones)){
                //SI VIENE UNA FUNCION HAY QUE IMPRIMIR ESA FUNCION Y CAMBIARLE EL NOMBRE
                const nombrePadre= ast.hijos[1];
                instrucciones.forEach(instruccion => {
                    if(instruccion.tipo=='FUNCION'){
                        //AQUI LE CAMBIAMOS EL NOMBRE A LA FUNCION ANIDADA
                        instruccion.hijos[1]=nombrePadre+"_"+instruccion.hijos[1];
                        recolector2+= desanidar(instruccion); 
                    }
                });
                
                //TOCA IMPRIMIR LA FUNCION PADRE, ES DECIR LA FUNCION ACTUAL
                instrucciones.forEach(instruccion => {
                    if(instruccion.tipo!='FUNCION'){
                        instruccionesPadre+= desanidar(instruccion);
                    }
                });
                
                recolector= "function "+nombrePadre+"():"+tipodato+"{\n"+instruccionesPadre+"}\n"+recolector2;
                return recolector;
                
            }else{
              let id= ast.hijos[1];
              let instrucciones= desanidar(ast.hijos[7]);
              recolector="function "+id+"():"+tipodato+"{\n"+instrucciones+"}\n";
              return recolector;
            }

            //function id (parametros) : tipodato {lista}
        }else if(ast.hijos.length==10){

            const instrucciones= ast.hijos[8].hijos;
            const parametros= desanidar(ast.hijos[3]);
            const tipodato= desanidar(ast.hijos[6]);
            if(vieneFuncion(instrucciones)){
                //SI VIENE UNA FUNCION HAY QUE IMPRIMIR ESA FUNCION Y CAMBIARLE EL NOMBRE
                const nombrePadre= ast.hijos[1];
                instrucciones.forEach(instruccion => {
                    if(instruccion.tipo=='FUNCION'){
                        //AQUI LE CAMBIAMOS EL NOMBRE A LA FUNCION ANIDADA
                        instruccion.hijos[1]=nombrePadre+"_"+instruccion.hijos[1];
                        recolector2+= desanidar(instruccion); 
                    }
                });
                //TOCA IMPRIMIR LA FUNCION PADRE, ES DECIR LA FUNCION ACTUAL
                instrucciones.forEach(instruccion => {
                    if(instruccion.tipo!='FUNCION'){
                        instruccionesPadre+= desanidar(instruccion);
                    }
                });
               
                recolector= "function "+nombrePadre+"("+parametros+"):"+tipodato+"{\n"+instruccionesPadre+"}\n"+recolector2;
                return recolector;
                
            }else{
              let id= ast.hijos[1];
              let instrucciones= desanidar(ast.hijos[8]);
              recolector="function "+id+"("+parametros+"):"+tipodato+"{\n"+instrucciones+"}\n";
              return recolector;
            }
        }

    }else if(ast.tipo=='RETURN'){
        let recolector='';

        if(ast.hijos.length==2){
            recolector= "return ;"
        }else if(ast.hijos.length==3){
            let expresion= desanidar(ast.hijos[1]);
            recolector= "return "+expresion+";\n"
        }

        return recolector;
    }else if(ast.tipo=='IF_SIMPLE'){
        let recolector='';
        let expresion= desanidar(ast.hijos[2]);
        let lista= desanidar(ast.hijos[5]);
        recolector= "if ("+ expresion+"){ \n          "+lista+" }\n";
        return recolector;
    }else if(ast.tipo=='IF_ELSE'){
        let recolector='';
        let expresion= desanidar(ast.hijos[2]);
        let lista = desanidar(ast.hijos[5]);
        let instruccionelse= desanidar(ast.hijos[7]);
        recolector= "if ("+expresion+"){ \n        "+lista+"}"+instruccionelse;

        return recolector;
    }else if(ast.tipo=='ELSE_IF'){
        let recolector='';
        let instruccionif= desanidar(ast.hijos[1]);
        recolector="else "+ instruccionif;

        return recolector;

    }else if(ast.tipo=='ELSE'){
        let recolector='';
        let lista= desanidar(ast.hijos[2]);
        recolector="else { \n        "+lista+"}";

        return recolector;

    }else if(ast.tipo=='IMAS_MAS'){
        let recolector= desanidar(ast.hijos[0])+";\n";
        return recolector;
    }else if(ast.tipo=='MAS_MAS'){
        let recolector= ast.hijos[0]+"++";
        return recolector;
    }else if(ast.tipo=='MENOS_MENOS'){
        let recolector= ast.hijos[0]+"--";
        return recolector;
    }else if(ast.tipo=='FOR'){
        let recolector='';
        let declaraciones= desanidar(ast.hijos[2]);
        let expresion= desanidar(ast.hijos[4]);
        let masmenos= desanidar(ast.hijos[6]);
        let lista= desanidar(ast.hijos[9]);

        recolector= "for("+declaraciones+";"+expresion+";"+masmenos+"){\n       "+lista+"} \n   ";
        return recolector;

    }else if(ast.tipo=='FOR_OF'){
        let recolector='';
        let tipovariable= desanidar(ast.hijos[2]);
        let lista = desanidar(ast.hijos[8]);
        let iterador= ast.hijos[3];
        let iterado= ast.hijos[5];
        recolector= "for ("+ tipovariable+" "+ iterador+" of "+ iterado+ " ){\n"+lista+"} \n";
        return recolector;

    }else if(ast.tipo=='SWITCH'){
        let recolector='';
        let expresion= desanidar(ast.hijos[2]);
        let casos= desanidar(ast.hijos[5]);
        recolector='switch('+expresion+'){\n'+casos+'}\n';
        return recolector;
    }else if(ast.tipo=='BREAK'){
        let recolector= 'break; \n';
        return recolector;

    }else if(ast.tipo=='CONTINUE'){
        let recolector= 'continue; \n';
        return recolector;

    }else if(ast.tipo=='GRAFICAR'){
        let recolector= 'graficar_ts();\n';
        return recolector;
    }else if(ast.tipo=='LLAMADA_FUNCION1'){
        let recolector= '';
        let id= ast.hijos[0];
        recolector= id+"()";
        return recolector;
    }else if(ast.tipo=='LLAMADA_FUNCION2'){
        let recolector= '';
        let id= ast.hijos[0];
        let lista= desanidar(ast.hijos[2]);
        recolector= id+"("+lista+")";
        return recolector;
    }else if(ast.tipo=='LFUNCION'){
        let recolector='';
        let funcion = desanidar(ast.hijos[0]);
        recolector= funcion+";\n";
        return recolector;
    }else if(ast.tipo=='NATIVA'){
        let recolector='';
        let nativa = desanidar(ast.hijos[0]);
        recolector= nativa+";\n";
        return recolector;
    }
    
//****************************EXPRESIONES***********************/
    else if(ast.tipo=='NEGATIVO'){
        let recolector='';
        let expresion= desanidar(ast.hijos[1]);
        recolector='-'+expresion;
        return recolector;
    
    }else if(ast.tipo=='MAS'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0]);
        let operder= desanidar(ast.hijos[2]);

        recolector= operizq+"+"+operder;
        return recolector;
    }else if(ast.tipo=='MENOS'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0]);
        let operder= desanidar(ast.hijos[2]);

        recolector= operizq+"-"+operder;
        return recolector;

    }else if(ast.tipo=='POR'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0]);
        let operder= desanidar(ast.hijos[2]);

        recolector= operizq+"*"+operder;
        return recolector;

    }else if(ast.tipo=='DIVISION'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0]);
        let operder= desanidar(ast.hijos[2]);

        recolector= operizq+"/"+operder;
        return recolector;

    }else if(ast.tipo=='MODULO'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0]);
        let operder= desanidar(ast.hijos[2]);

        recolector= operizq+"%"+operder;
        return recolector;

    }else if(ast.tipo=='EXPONENTE'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0]);
        let operder= desanidar(ast.hijos[2]);

        recolector= operizq+"**"+operder;
        return recolector;

    }else if(ast.tipo=='MAYORQUE'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0]);
        let operder= desanidar(ast.hijos[2]);

        recolector= operizq+">"+operder;
        return recolector;

    }else if(ast.tipo=='MENORQUE'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0]);
        let operder= desanidar(ast.hijos[2]);

        recolector= operizq+"<"+operder;
        return recolector;

    }else if(ast.tipo=='MAYORIGUALQUE'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0]);
        let operder= desanidar(ast.hijos[2]);

        recolector= operizq+">="+operder;
        return recolector;

    }else if(ast.tipo=='MENORIGUALQUE'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0]);
        let operder= desanidar(ast.hijos[2]);

        recolector= operizq+"<="+operder;
        return recolector;

    }else if(ast.tipo=='IGUALQUE'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0]);
        let operder= desanidar(ast.hijos[2]);

        recolector= operizq+"=="+operder;
        return recolector;

    }else if(ast.tipo=='DIFERENTEQUE'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0]);
        let operder= desanidar(ast.hijos[2]);

        recolector= operizq+"!="+operder;
        return recolector;

    }else if(ast.tipo=='AND'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0]);
        let operder= desanidar(ast.hijos[2]);

        recolector= operizq+"&&"+operder;
        return recolector;

    }else if(ast.tipo=='OR'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0]);
        let operder= desanidar(ast.hijos[2]);

        recolector= operizq+"||"+operder;
        return recolector;

    }else if(ast.tipo=='NOT'){
        let recolector='';
        let operando= desanidar(ast.hijos[1]);

        recolector= "!"+operando;
        return recolector;

    }else if(ast.tipo=='PAREXPRESION'){
        let recolector='';
        let expresion= desanidar(ast.hijos[1]);
        recolector= "("+expresion+")";

        return recolector;

    }else if(ast.tipo=='TERNARIO'){
        let recolector='';
        let condicion= desanidar(ast.hijos[0]);
        let expt= desanidar(ast.hijos[2]);
        let expf= desanidar(ast.hijos[4]);
        recolector= condicion+"?"+expt+":"+expf;
        return recolector;
    }

// ****************LISTAS - NODOS INTERMEDIOS*********************
    else if(ast.tipo=='LISTA_CASOS'){
        let recolector='';

        if(ast.hijos.length==1){
            //SI LA LISTA SOLO TRAE UN HIJO
            //ENTONCES NO LE AGREGAMOS COMAS
            ast.hijos.forEach(variable => {
                recolector+= desanidar(variable)+"\n";
            });
        }else{
        //SI LA LISTA DE CASOS TRAE MAS DE UN HIJO
        //SIGNIFICA QUE LA LISTA VIENE SEPARADA POR SALTOS DE LINEA
        let contador:number= 0;
        let hijos:number= ast.hijos.length;
        ast.hijos.forEach(variable => {
            contador++;
            if(contador==hijos){
                recolector+= desanidar(variable)+"\n";
            }else{
                recolector+= desanidar(variable)+"\n";
            }
        });
        }
        return recolector;

    }else if(ast.tipo=='LISTA_VARIABLES'){
        let recolector='';

        if(ast.hijos.length==1){
            //SI LA LISTA SOLO TRAE UN HIJO
            //ENTONCES NO LE AGREGAMOS COMAS
            ast.hijos.forEach(variable => {
                recolector+= desanidar(variable);
            });
        }else{
        //SI LA LISTA DE VARIABLES TRAE MAS DE UN HIJO
        //SIGNIFICA QUE LA LISTA VIENE SEPARADA POR COMAS
        let contador:number= 0;
        let hijos:number= ast.hijos.length;
        ast.hijos.forEach(variable => {
            contador++;
            if(contador==hijos){
                recolector+= desanidar(variable);
            }else{
                recolector+= desanidar(variable)+",";
            }
        });
        }
        return recolector;
    }else if(ast.tipo=='LISTA_PARAMETROS'){
        let recolector='';

        if(ast.hijos.length==1){
            //SI LA LISTA SOLO TRAE UN HIJO
            //ENTONCES NO LE AGREGAMOS COMAS
            ast.hijos.forEach(variable => {
                recolector+= desanidar(variable);
            });
        }else{
        //SI LA LISTA DE PARAMETROS TRAE MAS DE UN HIJO
        //SIGNIFICA QUE LA LISTA VIENE SEPARADA POR COMAS
        let contador:number= 0;
        let hijos:number= ast.hijos.length;
        ast.hijos.forEach(variable => {
            contador++;
            if(contador==hijos){
                recolector+= desanidar(variable);
            }else{
                recolector+= desanidar(variable)+",";
            }
        });
        }
        return recolector;
    }else if(ast.tipo=='LISTA_EXPRESIONES'){

        let recolector='';

        if(ast.hijos.length==1){
            //SI LA LISTA SOLO TRAE UN HIJO
            //ENTONCES NO LE AGREGAMOS COMAS
            ast.hijos.forEach(variable => {
                recolector+= desanidar(variable);
            });
        }else{
        //SI LA LISTA DE VARIABLES TRAE MAS DE UN HIJO
        //SIGNIFICA QUE LA LISTA VIENE SEPARADA POR COMAS
        let contador:number= 0;
        let hijos:number= ast.hijos.length;
        ast.hijos.forEach(variable => {
            contador++;
            if(contador==hijos){
                recolector+= desanidar(variable);
            }else{
                recolector+= desanidar(variable)+",";
            }
        });
        }
        return recolector;

    }else if(ast.tipo=='VARIABLE_FULL'){
        let recolector='';
        let id= ast.hijos[0];
        let tipodato= desanidar(ast.hijos[2]);
        let expresion= desanidar(ast.hijos[4]);
        
        recolector= id +":"+tipodato+"="+expresion;
        return recolector;
    }else if(ast.tipo=='VARIABLE_CON_EXPRESION'){
        let recolector='';
        let id= ast.hijos[0];
        let expresion= desanidar(ast.hijos[2]);

        recolector= id+"="+expresion;
        return recolector;

    }else if(ast.tipo=='VARIABLE_SIN_EXPRESION'){
        let recolector='';
        let id= ast.hijos[0];
        let tipodato= desanidar(ast.hijos[2]);
        recolector= id+":"+tipodato;
        return recolector;
    }else if(ast.tipo=='VARIABLE_ID'){
        let recolector='';
        let id= ast.hijos[0];
        recolector= id;
        return recolector;
    }else if(ast.tipo=='PARAMETRO'){
        let recolector='';
        let id= ast.hijos[0];
        let tipodato= desanidar(ast.hijos[2]);
        recolector= id+":"+tipodato;
        return recolector;
    }else if(ast.tipo=='CASE'){
        let recolector='';
        let expresion= desanidar(ast.hijos[1]);
        let lista= desanidar(ast.hijos[3]);
        recolector= 'case '+expresion+":\n"+lista;
        return recolector;
    }else if(ast.tipo=='CASE_DEFAULT'){
        let recolector='';
        let lista= desanidar(ast.hijos[2]);
        recolector= 'default:\n   '+lista;
        return recolector;
    }else if(ast.tipo=='ARREGLO_COMPLETO1'){
        let recolector='';
        let id= ast.hijos[0];
        let tipodato= desanidar(ast.hijos[2]);
        let lista= desanidar(ast.hijos[5]);
        recolector= id+":"+tipodato+" = ["+lista+"]";
        return recolector;
    }else if(ast.tipo=='ARREGLO_COMPLETO2'){
        let recolector='';
        let id= ast.hijos[0];
        let tipodato= desanidar(ast.hijos[2]);
        recolector= id+":"+tipodato+" = [ ]";
        return recolector;
    }else if(ast.tipo=='ARREGLO'){
        let recolector='';
        let id= ast.hijos[0];
        let lista= desanidar(ast.hijos[3]);
        recolector= id+"= ["+lista+"]";
        return recolector;
    }else if(ast.tipo=='ARREGLO2'){
        let recolector='';
        let id= ast.hijos[0];
        recolector= id+"= [ ]";
        return recolector;
    }else if(ast.tipo=='PUSH'){
        let recolector='';
        let id= ast.hijos[0];
        let lista= desanidar(ast.hijos[4]);
        recolector= id+".push("+lista+")";
        return recolector;

    }else if(ast.tipo=='POP'){
        let recolector='';
        let id= ast.hijos[0];
        recolector= id+".pop()";
        return recolector;

    }else if(ast.tipo=='LENGTH'){
        let recolector='';
        let id= ast.hijos[0];
        recolector= id+".length";
        return recolector;
    }
//**************NODOS HOJA, SUS HIJOS YA NO TRAEN MAS HIJOS************************
    else if(ast.tipo=='COMILLA_DOBLE'){
        let valor= "\""+ast.hijos[0]+"\"";
        return valor;
    }else if(ast.tipo=='COMILLA_SIMPLE'){
        let valor= "'"+ast.hijos[0]+"'";
        return valor;
    }else if(ast.tipo=='IDENTIFICADOR'){
        let valor= ast.hijos[0];
        return valor;
    }else if(ast.tipo=='NUMERO'){
        let valor= ast.hijos[0];
        return valor;
    }else if(ast.tipo=='LET'){
        let valor= ast.hijos[0];
        return valor;
    }else if(ast.tipo=='CONST'){
        let valor= ast.hijos[0];
        return valor;
    }else if(ast.tipo=='STRING'){
        let valor= ast.hijos[0];
        return valor;
    }else if(ast.tipo=='STRING[]'){
        let valor= ast.hijos[0]+"[]";
        return valor;
    }else if(ast.tipo=='NUMBER'){
        let valor= ast.hijos[0];
        return valor;
    }else if(ast.tipo=='NUMBER[]'){
        let valor= ast.hijos[0]+"[]";
        return valor;
    }else if(ast.tipo=='BOOLEAN'){
        let valor= ast.hijos[0];
        return valor;
    }else if(ast.tipo=='BOOLEAN[]'){
        let valor= ast.hijos[0]+"[]";
        return valor;
    }else if(ast.tipo=='VOID'){
        let valor= ast.hijos[0];
        return valor;
    }else if(ast.tipo=='TRUE'){
        let valor= ast.hijos[0];
        return valor;
    }else if(ast.tipo=='FALSE'){
        let valor= ast.hijos[0];
        return valor;
    }

    return '';

}

function vieneFuncion(instrucciones:any):boolean{
    for (let i = 0; i < instrucciones.length; i++) {
        if(instrucciones[i].tipo=='FUNCION'){
          //SI ES UNA FUNCION REGRESAMOS TRUE
          return true;
        }
      }
      //SI REGRESAMOS FALSE ES POR QUE NO VIENEN FUNCIONES EN LAS INSTRUCCIONES
      return false;
}



export {desanidar,AST_grafo};