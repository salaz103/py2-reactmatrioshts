import { entorno } from "./desanidamiento/entorno";
import { funcion } from "./desanidamiento/funcion";
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

function desanidar(ast:typeof nodobase, ambito:entorno):string{
    //PRIMERO RECIBIMOS LA RAIZ DEL AST
    if(ast.tipo=='INSTRUCCIONES'){
        let recolector='';
        ast.hijos.forEach(instruccion => {
            recolector += desanidar(instruccion,ambito);
        });

        return recolector;
    }
//*******************INSTRUCCIONES*******************************
    else if(ast.tipo=='IMPRIMIR'){
        let recolector='';
        let expresion= desanidar(ast.hijos[4],ambito);
        recolector= "console.log(" + expresion + "); \n"
        return recolector;
    }else if(ast.tipo=='DECLARACION_VARIABLE'){
        let recolector='';
        let tipovariable= desanidar(ast.hijos[0],ambito);
        let listavariables= desanidar(ast.hijos[1],ambito);
        recolector= tipovariable+" " + listavariables ;
        return recolector;
    }else if(ast.tipo=='IDECLARACIONES'){
        let recolector=desanidar(ast.hijos[0],ambito)+";\n";
        return recolector;
    }else if(ast.tipo=='ASIGNACION'){
        let recolector='';
        let id= ast.hijos[0];
        let expresion= desanidar(ast.hijos[2],ambito);
        recolector= id+"="+expresion;
        return recolector;
    }else if(ast.tipo=='WHILE'){
        let recolector='';
        let expresion= desanidar(ast.hijos[2],ambito);
        let lista= desanidar(ast.hijos[5],ambito);
        recolector= "while("+expresion+"){\n"+lista+"}\n";
        return recolector;        
    }else if(ast.tipo=='DO_WHILE'){
        let recolector='';
        let lista= desanidar(ast.hijos[2],ambito);
        let expresion= desanidar(ast.hijos[6],ambito);
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
            let nombrefuncion= ast.hijos[1];
            let id= ambito.getNombrePadre(nombrefuncion);
            let fn= new funcion(nombrefuncion);
            
            if(nombrefuncion!=id){
                fn.setNuevoNombre(id);
            }
            ambito.guardarFuncion(fn);

            if(!vieneFuncion(instrucciones)){
                //SI NO VIENE UNA FUNCION, ENTONCES SOLO RECORREMOS ESA FUNCION
                let ins= desanidar(ast.hijos[5],new entorno(ambito));
                recolector="function "+id+"(){\n"+ins+"}\n";
                return recolector;
            }else{
                //SIGNIFICA QUE SI VIENEN FUNCIONES
                let nuevoe= new entorno(ambito,nombrefuncion);
                console.log(nuevoe);
                instrucciones.forEach(instruccion => {
                    if(instruccion.tipo=='FUNCION'){
                        recolector2+= desanidar(instruccion,nuevoe); 
                    }
                });
                
                //TOCA IMPRIMIR LA FUNCION PADRE, ES DECIR LA FUNCION ACTUAL
                instrucciones.forEach(instruccion => {
                    if(instruccion.tipo!='FUNCION'){
                        instruccionesPadre+= desanidar(instruccion,ambito);
                    }
                });

                recolector= "function "+id+"(){\n"+ instruccionesPadre+"}\n"+ recolector2;
                return recolector;
            }


         
            
            //function id (parametros) {lista}
        }else if(ast.hijos.length==8){
            const instrucciones= ast.hijos[6].hijos;
            const parametros= desanidar(ast.hijos[3],ambito);
            let nombrefuncion= ast.hijos[1];
            let id= ambito.getNombrePadre(nombrefuncion);
            let fn= new funcion(nombrefuncion);
            
            if(nombrefuncion!=id){
                fn.setNuevoNombre(id);
            }
            ambito.guardarFuncion(fn);

            if(!vieneFuncion(instrucciones)){
                //SI NO VIENE UNA FUNCION, ENTONCES SOLO RECORREMOS ESA FUNCION
                let ins= desanidar(ast.hijos[6],new entorno(ambito));
                recolector="function "+id+"("+parametros+"){\n"+ins+"}\n";
                return recolector;
            }else{
                //SIGNIFICA QUE SI VIENEN FUNCIONES
                let nuevoe= new entorno(ambito,nombrefuncion);
                console.log(nuevoe);
                instrucciones.forEach(instruccion => {
                    if(instruccion.tipo=='FUNCION'){
                        recolector2+= desanidar(instruccion,nuevoe); 
                    }
                });
                
                //TOCA IMPRIMIR LA FUNCION PADRE, ES DECIR LA FUNCION ACTUAL
                instrucciones.forEach(instruccion => {
                    if(instruccion.tipo!='FUNCION'){
                        instruccionesPadre+= desanidar(instruccion,ambito);
                    }
                });

                recolector= "function "+id+"("+parametros+"){\n"+ instruccionesPadre+"}\n"+ recolector2;
                return recolector;
            }


            


            //function id ( ) : tipodato {lista}
        }else if(ast.hijos.length==9){

            const instrucciones= ast.hijos[7].hijos;
            const tipodato= desanidar(ast.hijos[5],ambito);
            
            let nombrefuncion= ast.hijos[1];
            let id= ambito.getNombrePadre(nombrefuncion);
            let fn= new funcion(nombrefuncion);
            
            if(nombrefuncion!=id){
                fn.setNuevoNombre(id);
            }
            ambito.guardarFuncion(fn);

            if(!vieneFuncion(instrucciones)){
                //SI NO VIENE UNA FUNCION, ENTONCES SOLO RECORREMOS ESA FUNCION
                let ins= desanidar(ast.hijos[7],new entorno(ambito));
                recolector="function "+id+"():"+tipodato+"{\n"+ins+"}\n";
                return recolector;
            }else{
                //SIGNIFICA QUE SI VIENEN FUNCIONES
                let nuevoe= new entorno(ambito,nombrefuncion);
                console.log(nuevoe);
                instrucciones.forEach(instruccion => {
                    if(instruccion.tipo=='FUNCION'){
                        recolector2+= desanidar(instruccion,nuevoe); 
                    }
                });
                
                //TOCA IMPRIMIR LA FUNCION PADRE, ES DECIR LA FUNCION ACTUAL
                instrucciones.forEach(instruccion => {
                    if(instruccion.tipo!='FUNCION'){
                        instruccionesPadre+= desanidar(instruccion,ambito);
                    }
                });

                recolector= "function "+id+"():"+tipodato+"{\n"+ instruccionesPadre+"}\n"+ recolector2;
                return recolector;
            }

            


            //function id (parametros) : tipodato {lista}
        }else if(ast.hijos.length==10){

            const instrucciones= ast.hijos[8].hijos;
            const parametros= desanidar(ast.hijos[3],ambito);
            const tipodato= desanidar(ast.hijos[6],ambito);

            let nombrefuncion= ast.hijos[1];
            let id= ambito.getNombrePadre(nombrefuncion);
            let fn= new funcion(nombrefuncion);
            
            if(nombrefuncion!=id){
                fn.setNuevoNombre(id);
            }
            ambito.guardarFuncion(fn);

            if(!vieneFuncion(instrucciones)){
                //SI NO VIENE UNA FUNCION, ENTONCES SOLO RECORREMOS ESA FUNCION
                let ins= desanidar(ast.hijos[8],new entorno(ambito));
                recolector="function "+id+"("+parametros+"):"+tipodato+"{\n"+ins+"}\n";
                return recolector;
            }else{
                //SIGNIFICA QUE SI VIENEN FUNCIONES
                let nuevoe= new entorno(ambito,nombrefuncion);
                console.log(nuevoe);
                instrucciones.forEach(instruccion => {
                    if(instruccion.tipo=='FUNCION'){
                        recolector2+= desanidar(instruccion,nuevoe); 
                    }
                });
                
                //TOCA IMPRIMIR LA FUNCION PADRE, ES DECIR LA FUNCION ACTUAL
                instrucciones.forEach(instruccion => {
                    if(instruccion.tipo!='FUNCION'){
                        instruccionesPadre+= desanidar(instruccion,ambito);
                    }
                });

                recolector= "function "+id+"("+parametros+"):"+tipodato+"{\n"+ instruccionesPadre+"}\n"+ recolector2;
                return recolector;
            }

            
        }
        
    }else if(ast.tipo=='RETURN'){
        let recolector='';

        if(ast.hijos.length==2){
            recolector= "return ;"
        }else if(ast.hijos.length==3){
            let expresion= desanidar(ast.hijos[1],ambito);
            recolector= "return "+expresion+";\n"
        }

        return recolector;
    }else if(ast.tipo=='IF_SIMPLE'){
        let recolector='';
        let expresion= desanidar(ast.hijos[2],ambito);
        let lista= desanidar(ast.hijos[5],ambito);
        recolector= "if ("+ expresion+"){ \n          "+lista+" }\n";
        return recolector;
    }else if(ast.tipo=='IF_ELSE'){
        let recolector='';
        let expresion= desanidar(ast.hijos[2],ambito);
        let lista = desanidar(ast.hijos[5],ambito);
        let instruccionelse= desanidar(ast.hijos[7],ambito);
        recolector= "if ("+expresion+"){ \n        "+lista+"}"+instruccionelse;

        return recolector;
    }else if(ast.tipo=='ELSE_IF'){
        let recolector='';
        let instruccionif= desanidar(ast.hijos[1],ambito);
        recolector="else "+ instruccionif;

        return recolector;

    }else if(ast.tipo=='ELSE'){
        let recolector='';
        let lista= desanidar(ast.hijos[2],ambito);
        recolector="else { \n        "+lista+"}";

        return recolector;

    }else if(ast.tipo=='IMAS_MAS'){
        let recolector= desanidar(ast.hijos[0],ambito)+";\n";
        return recolector;
    }else if(ast.tipo=='MAS_MAS'){
        let recolector= ast.hijos[0]+"++";
        return recolector;
    }else if(ast.tipo=='MENOS_MENOS'){
        let recolector= ast.hijos[0]+"--";
        return recolector;
    }else if(ast.tipo=='FOR'){
        let recolector='';
        let declaraciones= desanidar(ast.hijos[2],ambito);
        let expresion= desanidar(ast.hijos[4],ambito);
        let masmenos= desanidar(ast.hijos[6],ambito);
        let lista= desanidar(ast.hijos[9],ambito);

        recolector= "for("+declaraciones+";"+expresion+";"+masmenos+"){\n       "+lista+"} \n   ";
        return recolector;

    }else if(ast.tipo=='FOR_OF'){
        let recolector='';
        let tipovariable= desanidar(ast.hijos[2],ambito);
        let lista = desanidar(ast.hijos[8],ambito);
        let iterador= ast.hijos[3];
        let iterado= ast.hijos[5];
        recolector= "for ("+ tipovariable+" "+ iterador+" of "+ iterado+ " ){\n"+lista+"} \n";
        return recolector;

    }else if(ast.tipo=='SWITCH'){
        let recolector='';
        let expresion= desanidar(ast.hijos[2],ambito);
        let casos= desanidar(ast.hijos[5],ambito);
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
        let fn= ambito.getFuncion(id);
        if(fn.getNuevoNombre()!=""){
            id=fn.getNuevoNombre();
        }
        recolector= id+"()";
        return recolector;
    }else if(ast.tipo=='LLAMADA_FUNCION2'){
        let recolector= '';
        let id= ast.hijos[0];
        let lista= desanidar(ast.hijos[2],ambito);
        let fn= ambito.getFuncion(id);
        if(fn.getNuevoNombre()!=""){
            id=fn.getNuevoNombre();
        }
        recolector= id+"("+lista+")";
        return recolector;
    }else if(ast.tipo=='LFUNCION'){
        let recolector='';
        let funcion = desanidar(ast.hijos[0],ambito);
        recolector= funcion+";\n";
        return recolector;
    }else if(ast.tipo=='NATIVA'){
        let recolector='';
        let nativa = desanidar(ast.hijos[0],ambito);
        recolector= nativa+";\n";
        return recolector;
    }
    
//****************************EXPRESIONES***********************/
    else if(ast.tipo=='NEGATIVO'){
        let recolector='';
        let expresion= desanidar(ast.hijos[1],ambito);
        recolector='-'+expresion;
        return recolector;
    
    }else if(ast.tipo=='MAS'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0],ambito);
        let operder= desanidar(ast.hijos[2],ambito);

        recolector= operizq+"+"+operder;
        return recolector;
    }else if(ast.tipo=='MENOS'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0],ambito);
        let operder= desanidar(ast.hijos[2],ambito);

        recolector= operizq+"-"+operder;
        return recolector;

    }else if(ast.tipo=='POR'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0],ambito);
        let operder= desanidar(ast.hijos[2],ambito);

        recolector= operizq+"*"+operder;
        return recolector;

    }else if(ast.tipo=='DIVISION'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0],ambito);
        let operder= desanidar(ast.hijos[2],ambito);

        recolector= operizq+"/"+operder;
        return recolector;

    }else if(ast.tipo=='MODULO'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0],ambito);
        let operder= desanidar(ast.hijos[2],ambito);

        recolector= operizq+"%"+operder;
        return recolector;

    }else if(ast.tipo=='EXPONENTE'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0],ambito);
        let operder= desanidar(ast.hijos[2],ambito);

        recolector= operizq+"**"+operder;
        return recolector;

    }else if(ast.tipo=='MAYORQUE'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0],ambito);
        let operder= desanidar(ast.hijos[2],ambito);

        recolector= operizq+">"+operder;
        return recolector;

    }else if(ast.tipo=='MENORQUE'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0],ambito);
        let operder= desanidar(ast.hijos[2],ambito);

        recolector= operizq+"<"+operder;
        return recolector;

    }else if(ast.tipo=='MAYORIGUALQUE'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0],ambito);
        let operder= desanidar(ast.hijos[2],ambito);

        recolector= operizq+">="+operder;
        return recolector;

    }else if(ast.tipo=='MENORIGUALQUE'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0],ambito);
        let operder= desanidar(ast.hijos[2],ambito);

        recolector= operizq+"<="+operder;
        return recolector;

    }else if(ast.tipo=='IGUALQUE'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0],ambito);
        let operder= desanidar(ast.hijos[2],ambito);

        recolector= operizq+"=="+operder;
        return recolector;

    }else if(ast.tipo=='DIFERENTEQUE'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0],ambito);
        let operder= desanidar(ast.hijos[2],ambito);

        recolector= operizq+"!="+operder;
        return recolector;

    }else if(ast.tipo=='AND'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0],ambito);
        let operder= desanidar(ast.hijos[2],ambito);

        recolector= operizq+"&&"+operder;
        return recolector;

    }else if(ast.tipo=='OR'){
        let recolector='';
        let operizq= desanidar(ast.hijos[0],ambito);
        let operder= desanidar(ast.hijos[2],ambito);

        recolector= operizq+"||"+operder;
        return recolector;

    }else if(ast.tipo=='NOT'){
        let recolector='';
        let operando= desanidar(ast.hijos[1],ambito);

        recolector= "!"+operando;
        return recolector;

    }else if(ast.tipo=='PAREXPRESION'){
        let recolector='';
        let expresion= desanidar(ast.hijos[1],ambito);
        recolector= "("+expresion+")";

        return recolector;

    }else if(ast.tipo=='TERNARIO'){
        let recolector='';
        let condicion= desanidar(ast.hijos[0],ambito);
        let expt= desanidar(ast.hijos[2],ambito);
        let expf= desanidar(ast.hijos[4],ambito);
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
                recolector+= desanidar(variable,ambito)+"\n";
            });
        }else{
        //SI LA LISTA DE CASOS TRAE MAS DE UN HIJO
        //SIGNIFICA QUE LA LISTA VIENE SEPARADA POR SALTOS DE LINEA
        let contador:number= 0;
        let hijos:number= ast.hijos.length;
        ast.hijos.forEach(variable => {
            contador++;
            if(contador==hijos){
                recolector+= desanidar(variable,ambito)+"\n";
            }else{
                recolector+= desanidar(variable,ambito)+"\n";
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
                recolector+= desanidar(variable,ambito);
            });
        }else{
        //SI LA LISTA DE VARIABLES TRAE MAS DE UN HIJO
        //SIGNIFICA QUE LA LISTA VIENE SEPARADA POR COMAS
        let contador:number= 0;
        let hijos:number= ast.hijos.length;
        ast.hijos.forEach(variable => {
            contador++;
            if(contador==hijos){
                recolector+= desanidar(variable,ambito);
            }else{
                recolector+= desanidar(variable,ambito)+",";
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
                recolector+= desanidar(variable,ambito);
            });
        }else{
        //SI LA LISTA DE PARAMETROS TRAE MAS DE UN HIJO
        //SIGNIFICA QUE LA LISTA VIENE SEPARADA POR COMAS
        let contador:number= 0;
        let hijos:number= ast.hijos.length;
        ast.hijos.forEach(variable => {
            contador++;
            if(contador==hijos){
                recolector+= desanidar(variable,ambito);
            }else{
                recolector+= desanidar(variable,ambito)+",";
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
                recolector+= desanidar(variable,ambito);
            });
        }else{
        //SI LA LISTA DE VARIABLES TRAE MAS DE UN HIJO
        //SIGNIFICA QUE LA LISTA VIENE SEPARADA POR COMAS
        let contador:number= 0;
        let hijos:number= ast.hijos.length;
        ast.hijos.forEach(variable => {
            contador++;
            if(contador==hijos){
                recolector+= desanidar(variable,ambito);
            }else{
                recolector+= desanidar(variable,ambito)+",";
            }
        });
        }
        return recolector;

    }else if(ast.tipo=='VARIABLE_FULL'){
        let recolector='';
        let id= ast.hijos[0];
        let tipodato= desanidar(ast.hijos[2],ambito);
        let expresion= desanidar(ast.hijos[4],ambito);
        
        recolector= id +":"+tipodato+"="+expresion;
        return recolector;
    }else if(ast.tipo=='VARIABLE_CON_EXPRESION'){
        let recolector='';
        let id= ast.hijos[0];
        let expresion= desanidar(ast.hijos[2],ambito);

        recolector= id+"="+expresion;
        return recolector;

    }else if(ast.tipo=='VARIABLE_SIN_EXPRESION'){
        let recolector='';
        let id= ast.hijos[0];
        let tipodato= desanidar(ast.hijos[2],ambito);
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
        let tipodato= desanidar(ast.hijos[2],ambito);
        recolector= id+":"+tipodato;
        return recolector;
    }else if(ast.tipo=='CASE'){
        let recolector='';
        let expresion= desanidar(ast.hijos[1],ambito);
        let lista= desanidar(ast.hijos[3],ambito);
        recolector= 'case '+expresion+":\n"+lista;
        return recolector;
    }else if(ast.tipo=='CASE_DEFAULT'){
        let recolector='';
        let lista= desanidar(ast.hijos[2],ambito);
        recolector= 'default:\n   '+lista;
        return recolector;
    }else if(ast.tipo=='ARREGLO_COMPLETO1'){
        let recolector='';
        let id= ast.hijos[0];
        let tipodato= desanidar(ast.hijos[2],ambito);
        let lista= desanidar(ast.hijos[5],ambito);
        recolector= id+":"+tipodato+" = ["+lista+"]";
        return recolector;
    }else if(ast.tipo=='ARREGLO_COMPLETO2'){
        let recolector='';
        let id= ast.hijos[0];
        let tipodato= desanidar(ast.hijos[2],ambito);
        recolector= id+":"+tipodato+" = [ ]";
        return recolector;
    }else if(ast.tipo=='ARREGLO'){
        let recolector='';
        let id= ast.hijos[0];
        let lista= desanidar(ast.hijos[3],ambito);
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
        let lista= desanidar(ast.hijos[4],ambito);
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