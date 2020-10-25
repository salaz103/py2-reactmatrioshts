/* lexical grammar */
%lex
%options case-sensitive
%locations

%%
///COMENTARIOS SIMPLES, MULTIPLE LINEA Y ESPACIOS EN BLANCO
\s+											// se ignoran espacios en blanco
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas		



//SENTENCIAS DE TRANSFERENCIA
"break"               return 'RBREAK';
"continue"            return 'RCONTINUE';
"return"              return 'RRETURN';
//////TIPO DE DATO
"string"              return 'RSTRING';
"number"              return 'RNUMBER';
"boolean"             return 'RBOOLEAN';
"true"                return 'RTRUE';
"false"               return 'RFALSE';
"void"                return 'RVOID';
"Array"               return 'RARRAY';
//FUNCIONES
"graficar_ts"         return 'RGRAFICAR';
"function"            return 'RFUNCTION';
"console"             return 'RCONSOLE';
"log"                 return 'RLOG';
"push"                return 'RPUSH';
"pop"                 return 'RPOP';
"length"              return 'RLENGTH';
"charAt"              return 'RCHARAT';
"toLowerCase"         return 'RTOLOWERCASE';
"toUpperCase"         return 'RTOUPPERCASE';
"concat"              return 'RCONCAT';
//DECLARACION DE VARIABLES
"let"                 return 'RLET';
"const"               return 'RCONST';

//ESTRUCTURAS DE CONTROL
"if"                  return 'RIF';
"else"                return 'RELSE';
"while"               return 'RWHILE';
"do"                  return 'RDO';
"switch"              return 'RSWITCH';
"case"                return 'RCASE';
"default"             return 'RDEFAULT';
"for"                 return 'RFOR';
"in"                  return 'RIN';
"of"                  return 'ROF';  

//OPERACIONES ARITMETICAS
"+"                   return 'RMAS';
"-"                   return 'RMENOS';
"*"                   return 'RPOR';
"/"                   return 'RDIVISION';
"**"                  return 'REXPONENTE';
"%"                   return 'RMODULO';
"++"                  return 'RMASMAS';
"--"                  return 'RMENOSMENOS';
//OPERACIONES RELACIONALES
">"                   return 'RMAYORQUE';
"<"                   return 'RMENORQUE';
">="                  return 'RMAYORIGUALQUE';
"<="                  return 'RMENORIGUALQUE';
"=="                  return 'RIGUALQUE';
"!="                  return 'RDIFERENTEQUE';
//OPERACIONES LOGICAS
"&&"                 return 'RAND';
"||"                  return 'ROR';
"!"                 return 'RNOT';

//OPERADOR TERNARIO
"?"                   return 'RINTERROGACION';
":"                   return 'RDOSPUNTOS';


"."                   return 'RPUNTO';
","                   return 'RCOMA';
";"                   return 'RPUNTOCOMA';
"="                   return 'RIGUAL';

"["                   return 'RCORCHETEA';
"]"                   return 'RCORCHETEC';
"{"                   return 'RLLAVEA';
"}"                   return 'RLLAVEC';
"("                   return 'RPARA';
")"                   return 'RPARC';

//\"[^\"]*\"            { yytext = yytext.substr(1,yyleng-2); return 'CADENACOMILLADOBLE'; }
\"[^"]+\" { yytext = yytext.slice(1,-1).replace("\\n", "\n").replace("\\t", "\t").replace("\\r", "\r").replace("\\\\", "\\").replace("\\\"", "\""); 
            return 'CADENACOMILLADOBLE'; 
            }

\'[^"]+\' { yytext = yytext.slice(1,-1).replace("\\n", "\n").replace("\\t", "\t").replace("\\r", "\r").replace("\\\\", "\\").replace("\\\"", "\""); 
            return 'CADENACOMILLASIMPLE'; 
            }
//\'[^\']*\'            { yytext = yytext.substr(1,yyleng-2); return 'CADENACOMILLASIMPLE'; }

[0-9]+("."[0-9]+)?\b          return 'NUM';
([a-zA-Z])[a-zA-Z0-9_]*       return 'IDENTIFICADOR';

<<EOF>>               return 'EOF';
.					{ 
  const e= new error.error("Léxico","El caracter "+yytext+" no pertenece al lenguaje",yylloc.first_line,yylloc.first_column);
  lista.listaerrores.obtenerLista().guardar(e);
  //console.log('Error Lexico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
          }



/lex

%{
  //ERRORES
  const error= require("../ArchivosTS/entorno/error");
  const lista= require("../ArchivosTS/entorno/listaerrores");

  //******************INSTRUCCIONES***********************************
  const imprimir= require('../ArchivosTS/instrucciones/imprimir');
  const declaracion= require('../ArchivosTS/instrucciones/declaracion'); 


  //******************EXPRESIONES*************************************
  const numero= require('../ArchivosTS/expresiones/numero');
  const valorLogico= require('../ArchivosTS/expresiones/valorLogico');
  const cadena= require('../ArchivosTS/expresiones/cadena');
  const aritmetica= require('../ArchivosTS/expresiones/operaciones/aritmetica');
  const identificador= require('../ArchivosTS/expresiones/identificador');
  const unaria= require('../ArchivosTS/expresiones/operaciones/unaria');

  //******************INTERMEDIOS************************************
  const variable= require('../ArchivosTS/expresiones/variable');


  //****************OTROS***********************************
  const tipo_dato= require('../ArchivosTS/entorno/tipo').tipo_dato;
  const tipo_variable= require('../ArchivosTS/entorno/tipo').tipo_variable;
  const tipo_instruccion= require('../ArchivosTS/entorno/tipo').tipo_instruccion;
  const operador= require('../ArchivosTS/entorno/tipo').operador;

%}


/* operator associations and precedence */
%left 'RINTERROGACION'
%left 'ROR'
%left 'RAND'
%right 'RNOT'
%left  'RMENORQUE' 'RMAYORQUE' 'RMENORIGUALQUE' 'RMAYORIGUALQUE' 'RDIFERENTEQUE' 'RIGUALQUE'

//OPERACIONES ARITMETICAS
%left 'RMAS' 'RMENOS'
%left 'RPOR' 'RDIVISION' 'RMODULO'
%left 'REXPONENTE'
%left  UMENOS


%start s

%% /* language grammar */


s : lista EOF { return $1; }               
  ;


lista : lista instruccion {$1.push($2); $$=$1;}
      | instruccion  {$$=[$1];}
      ;

instruccion:  declaraciones RPUNTOCOMA{$$=$1;}
            | instruccionif     {$$=$1;}
            | instruccionswitch {$$=$1;}
            | instruccionfor    {$$=$1;}
            | instruccionwhile {$$=$1;}
            | imprimir         {$$=$1;}
            | declararfuncion  {$$=$1;}
            | llamarfuncion RPUNTOCOMA {$$=$1;}
            | nativa RPUNTOCOMA {$$=$1;}
            | masmenos RPUNTOCOMA {$$=$1;}
            | RGRAFICAR RPARA RPARC RPUNTOCOMA
            | RBREAK RPUNTOCOMA 
            | RCONTINUE RPUNTOCOMA 
            | instruccionreturn {$$=$1;}
            | asignacion  RPUNTOCOMA {$$=$1;}
            | error RPUNTOCOMA
            | error RLLAVEC
            ;

masmenos: IDENTIFICADOR RMASMAS  
         |IDENTIFICADOR RMENOSMENOS
         ;

nativa: IDENTIFICADOR RPUNTO RLENGTH
       |IDENTIFICADOR RPUNTO RCHARAT RPARA NUM RPARC 
       |IDENTIFICADOR RPUNTO RTOLOWERCASE RPARA RPARC
       |IDENTIFICADOR RPUNTO RTOUPPERCASE RPARA RPARC
       |IDENTIFICADOR RPUNTO RCONCAT RPARA listaexpresiones RPARC
       ;

declaraciones: tipovariable listavariables {$$=new declaracion.declaracion($1,$2);};



listavariables:   listavariables RCOMA variable {$1.push($3); $$=$1;}
                | variable {$$=[$1];}
                ;


variable:  IDENTIFICADOR RDOSPUNTOS tipodato RIGUAL expresion
          {$$=new variable.variable($1,$3,@1.first_line,@1.first_column,$5);} 
         | IDENTIFICADOR RDOSPUNTOS tipodato
          {$$=new variable.variable($1,$3,@1.first_line,@1.first_column,null);}
         ///*****ARREGLOS****////
         | IDENTIFICADOR RDOSPUNTOS tipodato dimensiones  RIGUAL expresion
         | IDENTIFICADOR RIGUAL expresion
         ;

dimensiones: dimensiones RCORCHETEA RCORCHETEC
            | RCORCHETEA RCORCHETEC ;

tipovariable: RLET  {$$=tipo_variable.LET;}  
            | RCONST {$$=tipo_variable.CONST;} 
            ;

asignacion: IDENTIFICADOR RIGUAL expresion;


instruccionif: RIF RPARA expresion RPARC RLLAVEA lista RLLAVEC
             | RIF RPARA expresion RPARC RLLAVEA lista RLLAVEC instruccionelseif
               ;

instruccionelseif:  RELSE RIF RPARA expresion RPARC RLLAVEA lista RLLAVEC
                  | RELSE RIF RPARA expresion RPARC RLLAVEA lista RLLAVEC instruccionelseif
                  | instruccionelse
                  ;

instruccionelse: RELSE RLLAVEA lista RLLAVEC;

instruccionswitch: RSWITCH RPARA expresion RPARC RLLAVEA casos RLLAVEC
                   ;

casos: casos caso 
      | caso 
      ; 

caso:   RCASE expresion RDOSPUNTOS lista
      | RDEFAULT RDOSPUNTOS lista 
        ;

instruccionfor: RFOR RPARA declaraciones RPUNTOCOMA expresion RPUNTOCOMA masmenos RPARC RLLAVEA lista RLLAVEC
              
              | RFOR RPARA asignacion RPUNTOCOMA expresion RPUNTOCOMA masmenos RPARC RLLAVEA lista RLLAVEC
                 
              | RFOR RPARA tipovariable IDENTIFICADOR ROF IDENTIFICADOR RPARC RLLAVEA lista RLLAVEC

              | RFOR RPARA tipovariable IDENTIFICADOR RIN IDENTIFICADOR RPARC RLLAVEC lista RLLAVEC
              ;

instruccionwhile:  RWHILE RPARA expresion RPARC RLLAVEA lista RLLAVEC 
                 | RDO RLLAVEA lista RLLAVEC RWHILE RPARA expresion RPARC
                  ;

                //FUNCION SIN TIPO DATO Y SIN PARAMETROS
declararfuncion: RFUNCTION IDENTIFICADOR RPARA RPARC RLLAVEA lista RLLAVEC
               //FUNCION CON TIPO DE DATO Y PARAMETROS
               | RFUNCTION IDENTIFICADOR RPARA parametros RPARC RDOSPUNTOS tipodato RLLAVEA lista RLLAVEC
               //FUNCION SIN TIPO DE DATO Y CON PARAMETROS
               | RFUNCTION IDENTIFICADOR RPARA parametros RPARC  RLLAVEA lista RLLAVEC
               //FUNCION CON TIPO DE DATO Y SIN PARAMETROS
               | RFUNCTION IDENTIFICADOR RPARA RPARC RDOSPUNTOS tipodato RLLAVEA lista RLLAVEC
                 ;

llamarfuncion: IDENTIFICADOR RPARA RPARC 
               |IDENTIFICADOR RPARA listaexpresiones RPARC
               ;

parametros: parametros RCOMA parametro 
          | parametro 
          ;


parametro: IDENTIFICADOR RDOSPUNTOS tipodato 
           ;


tipodato:  
           RSTRING {$$=tipo_dato.STRING;}
          |RNUMBER {$$=tipo_dato.NUMBER;}
          |RBOOLEAN {$$=tipo_dato.BOOLEAN;} 
          |RVOID   {$$=tipo_dato.VOID;}
          |RARRAY  {$$=tipo_dato.ARRAY;}
          ;


imprimir  : RCONSOLE RPUNTO RLOG RPARA expresion RPARC RPUNTOCOMA
            {$$=new imprimir.imprimir($5);}
            ;  

instruccionreturn: RRETURN RPUNTOCOMA
                  |RRETURN expresion RPUNTOCOMA
                  ; 

listaexpresiones: listaexpresiones RCOMA expresion 
                | expresion 
                ;

expresion: 
           /*EXPRESIONES ARITMETICAS*/
           RMENOS expresion %prec UMENOS
           {$$= new unaria.unaria(operador.MENOS,$2,@1.first_line,@1.first_column);}    
          | expresion RMAS expresion
          {$$= new aritmetica.aritmetica($1,operador.MAS,$3,@1.first_line,@1.first_column);}      
          |expresion RMENOS expresion
          {$$= new aritmetica.aritmetica($1,operador.MENOS,$3,@1.first_line,@1.first_column);}     
          |expresion RPOR expresion
          {$$= new aritmetica.aritmetica($1,operador.POR,$3,@1.first_line,@1.first_column);}        
          |expresion RDIVISION expresion  
          {$$= new aritmetica.aritmetica($1,operador.DIVISION,$3,@1.first_line,@1.first_column);}
          |expresion RMODULO expresion 
          {$$= new aritmetica.aritmetica($1,operador.MODULO,$3,@1.first_line,@1.first_column);}   
          |expresion REXPONENTE expresion 
          |IDENTIFICADOR RMASMAS          
          |IDENTIFICADOR RMENOSMENOS      

          /*EXPRESIONES RELACIONALES*/
          |expresion RMAYORQUE expresion       
          |expresion RMENORQUE expresion       
          |expresion RMAYORIGUALQUE expresion  
          |expresion RMENORIGUALQUE expresion  
          |expresion RIGUALQUE expresion       
          |expresion RDIFERENTEQUE expresion   
          /*EXPRESIONES LOGICAS*/
          |expresion RAND expresion       
          |expresion ROR expresion           
          |RNOT expresion                      
          /*RESTANTES*/
          |RPARA expresion RPARC  {$$=$2;}
          |expresion RINTERROGACION expresion RDOSPUNTOS expresion
          |NUM              {$$=new numero.numero(Number($1),tipo_dato.NUMBER,@1.first_line,@1.first_column);}      
          |RTRUE            {$$=new valorLogico.valorLogico("TRUE",tipo_dato.BOOLEAN,@1.first_line,@1.first_column);}     
          |RFALSE           {$$=new valorLogico.valorLogico("FALSE",tipo_dato.BOOLEAN,@1.first_line,@1.first_column);}      
          |CADENACOMILLADOBLE {$$=new cadena.cadena($1,tipo_dato.STRING,@1.first_line,@1.first_column);}     
          |CADENACOMILLASIMPLE {$$=new cadena.cadena($1,tipo_dato.STRING,@1.first_line,@1.first_column);}      
          |IDENTIFICADOR      {$$=new identificador.identificador($1,@1.first_line,@1.first_column);}
          /*ARREGLOS*/
          /*|RCORCHETEA listaerrores RCORCHETEC
          |RCORCHETEA RCORCHETEC */         
          //LLAMADA A FUNCIONES 
          | llamarfuncion       {$$=$1;}
          | nativa              {$$=$1;}
          ;