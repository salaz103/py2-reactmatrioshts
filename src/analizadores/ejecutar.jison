/* lexical grammar */
%lex
%options case-insensitive
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
";"                   return 'RPUNTOCOMA';
"++"                  return 'RMASMAS';
"+"                   return 'RMAS';
"--"                  return 'RMENOSMENOS';
"-"                   return 'RMENOS';
"**"                  return 'REXPONENTE';
"*"                   return 'RPOR';
"/"                   return 'RDIVISION';
"||"                  return 'ROR';
"&&"                  return 'RAND';
"%"                   return 'RMODULO';
//OPERACIONES RELACIONALES
"<="                  return 'RMENORIGUALQUE';
">="                  return 'RMAYORIGUALQUE';
"<"                   return 'RMENORQUE';
">"                   return 'RMAYORQUE';
"=="                  return 'RIGUALQUE';
"!="                  return 'RDIFERENTEQUE';
"="                   return 'RIGUAL';
//OPERACIONES LOGICAS
"!"                 return 'RNOT';
//OPERADOR TERNARIO
"?"                   return 'RINTERROGACION';
":"                   return 'RDOSPUNTOS';

"("                   return 'RPARA';
")"                   return 'RPARC';
"["                   return 'RCORCHETEA';
"]"                   return 'RCORCHETEC';
"{"                   return 'RLLAVEA';
"}"                   return 'RLLAVEC';
"."                   return 'RPUNTO';
","                   return 'RCOMA';

\'[^\']*\'            { yytext = yytext.substr(1,yyleng-2).replace("\\n", "\n").replace("\\t", "\t").replace("\\r", "\r").replace("\\\\", "\\").replace("\\\"", "\""); 
                        return 'CADENACOMILLASIMPLE'; }

\"[^\"]*\"            { yytext = yytext.substr(1,yyleng-2).replace("\\n", "\n").replace("\\t", "\t").replace("\\r", "\r").replace("\\\\", "\\").replace("\\\"", "\""); 
                        return 'CADENACOMILLADOBLE'; }



[0-9]+("."[0-9]+)?\b          return 'NUM';
([a-zA-Z])[a-zA-Z0-9_]*       return 'IDENTIFICADOR';

<<EOF>>               return 'EOF';
.					{ 
  const e= new error.error("Léxico","Error lexico con caracter: "+yytext,yylloc.first_line,yylloc.first_column);
  lista.listaerrores.obtenerLista().guardar(e);
          }



/lex

%{
  //ERRORES
  const error= require("../ArchivosTS/entorno/error");
  const lista= require("../ArchivosTS/entorno/listaerrores");

  //******************INSTRUCCIONES***********************************
  const imprimir= require('../ArchivosTS/instrucciones/imprimir');
  const declaracion= require('../ArchivosTS/instrucciones/declaracion'); 
  const incremento_decremento= require('../ArchivosTS/instrucciones/incremento_decremento');
  const instruccionif= require('../ArchivosTS/instrucciones/instruccionif');
  const instruccionfor= require('../ArchivosTS/instrucciones/instruccionfor');
  const instruccionwhile= require('../ArchivosTS/instrucciones/instruccionwhile');
  const instrucciondowhile= require('../ArchivosTS/instrucciones/instrucciondowhile');
  const declaracionfuncion= require('../ArchivosTS/instrucciones/declaracionfuncion');
  const instruccionreturn= require('../ArchivosTS/instrucciones/instruccionreturn');
  const llamarfuncion= require('../ArchivosTS/instrucciones/llamarfuncion');
  const instruccionllamarfuncion= require('../ArchivosTS/instrucciones/instruccionllamarfuncion');
  const instruccionswitch= require('../ArchivosTS/instrucciones/instruccionswitch');
  const instruccionbreak= require('../ArchivosTS/instrucciones/instruccionBreak');
  const instruccioncontinue= require('../ArchivosTS/instrucciones/instruccioncontinue');

  //******************EXPRESIONES*************************************
  const numero= require('../ArchivosTS/expresiones/numero');
  const valorLogico= require('../ArchivosTS/expresiones/valorLogico');
  const cadena= require('../ArchivosTS/expresiones/cadena');
  const aritmetica= require('../ArchivosTS/expresiones/operaciones/aritmetica');
  const identificador= require('../ArchivosTS/expresiones/identificador');
  const unaria= require('../ArchivosTS/expresiones/operaciones/unaria');
  const relacional= require('../ArchivosTS/expresiones/operaciones/relacional');
  const igualdad= require('../ArchivosTS/expresiones/operaciones/igualdad');
  const diferenteque= require('../ArchivosTS/expresiones/operaciones/diferenteque');
  const logica= require('../ArchivosTS/expresiones/operaciones/logica');
  const operadorternario= require('../ArchivosTS/expresiones/operadorternario');
  const nativastring= require('../ArchivosTS/expresiones/nativastring');
  const stringmetodos= require('../ArchivosTS/expresiones/stringmetodos');

  //******************INTERMEDIOS************************************
  const variable= require('../ArchivosTS/expresiones/variable');
  const parametro= require('../ArchivosTS/instrucciones/parametro');
  const caso= require('../ArchivosTS/instrucciones/caso');


  //****************OTROS***********************************
  const tipo_dato= require('../ArchivosTS/entorno/tipo').tipo_dato;
  const tipo_variable= require('../ArchivosTS/entorno/tipo').tipo_variable;
  const tipo_instruccion= require('../ArchivosTS/entorno/tipo').tipo_instruccion;
  const operador= require('../ArchivosTS/entorno/tipo').operador;
  const tipo_metodo= require('../ArchivosTS/entorno/tipo').tipo_metodo;

  parser.yy.parseError= function(error,hash){
    console.log(error);
  }

%}


/* operator associations and precedence */
%left 'RPUNTO'
%left 'RINTERROGACION'
%left 'ROR'
%left 'RAND'
%right 'RNOT'
%left  'RDIFERENTEQUE' 'RIGUALQUE'
%left  'RMENORQUE' 'RMAYORQUE' 'RMENORIGUALQUE' 'RMAYORIGUALQUE' 

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
            | llamarfuncion RPUNTOCOMA 
              {$$= new instruccionllamarfuncion.instruccionllamarfuncion($1,@1.first_line,@1.first_column);}
            //| nativa RPUNTOCOMA {$$=$1;}
            | masmenos RPUNTOCOMA {$$=$1;}
            | RGRAFICAR RPARA RPARC RPUNTOCOMA
            | RBREAK RPUNTOCOMA
             {$$= new instruccionbreak.instruccionbreak(@1.first_line,@1.first_column);} 
            | RCONTINUE RPUNTOCOMA
             {$$= new instruccioncontinue.instruccioncontinue(@1.first_line,@1.first_column);} 
            | instruccionreturn {$$=$1;}
            | asignacion  RPUNTOCOMA {$$=$1;}
            | error RPUNTOCOMA
            {  
              const e= new error.error("SINTACTICO","Revisar error Sintactico: "+yytext,this._$.first_line,this._$.first_column);
              lista.listaerrores.obtenerLista().guardar(e);
            }
            | error RLLAVEC
            {  
              const e= new error.error("SINTACTICO","Revisar error Sintactico: "+yytext,this._$.first_line,this._$.first_column);
              lista.listaerrores.obtenerLista().guardar(e);
            }
            ;

masmenos: IDENTIFICADOR RMASMAS
          {$$= new incremento_decremento.incremento_decremento($1,operador.INCREMENTO,@1.first_line,@1.first_column);}  
         |IDENTIFICADOR RMENOSMENOS
         {$$= new incremento_decremento.incremento_decremento($1,operador.DECREMENTO,@1.first_line,@1.first_column);}
         ;

//nativa: IDENTIFICADOR RPUNTO RLENGTH ;

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
               {$$= new instruccionif.instruccionif($3,$6,null,@1.first_line,@1.first_column);} 
             | RIF RPARA expresion RPARC RLLAVEA lista RLLAVEC RELSE RLLAVEA lista RLLAVEC
               {$$= new instruccionif.instruccionif($3,$6,$10,@1.first_line,@1.first_column);}
             | RIF RPARA expresion RPARC RLLAVEA lista RLLAVEC RELSE instruccionif
               {$$= new instruccionif.instruccionif($3,$6,$9,@1.first_line,@1.first_column);} 
             ;



instruccionswitch: RSWITCH RPARA expresion RPARC RLLAVEA casos RLLAVEC
                    {$$= new instruccionswitch.instruccionswitch($3,$6,@1.first_line,@1.first_column);}
                   ;

casos: casos caso {$1.push($2); $$=$1;}
      | caso {$$=[$1];}
      ; 

caso:   RCASE expresion RDOSPUNTOS lista
        {$$= new caso.caso($2,$4,@1.first_line,@1.first_column);}
      | RDEFAULT RDOSPUNTOS lista
        {$$= new caso.caso(null,$3,@1.first_line,@1.first_column);} 
        ;

instruccionfor: RFOR RPARA declaraciones RPUNTOCOMA expresion RPUNTOCOMA masmenos RPARC RLLAVEA lista RLLAVEC
                 {$$= new instruccionfor.instruccionfor($3,$5,$7,$10,@1.first_line,@1.first_column);}
              | RFOR RPARA asignacion RPUNTOCOMA expresion RPUNTOCOMA masmenos RPARC RLLAVEA lista RLLAVEC
                 {$$= new instruccionfor.instruccionfor($3,$5,$7,$10,@1.first_line,@1.first_column);}
              | RFOR RPARA tipovariable IDENTIFICADOR ROF IDENTIFICADOR RPARC RLLAVEA lista RLLAVEC

              | RFOR RPARA tipovariable IDENTIFICADOR RIN IDENTIFICADOR RPARC RLLAVEC lista RLLAVEC
              ;

instruccionwhile:  RWHILE RPARA expresion RPARC RLLAVEA lista RLLAVEC
                   {$$= new instruccionwhile.instruccionwhile($3,$6,@1.first_line,@1.first_column);}
                 | RDO RLLAVEA lista RLLAVEC RWHILE RPARA expresion RPARC
                   {$$= new instrucciondowhile.instrucciondowhile($3,$7,@1.first_line,@1.first_column);} 
                  ;


                //FUNCION CON TIPO DE DATO Y PARAMETROS
declararfuncion: RFUNCTION IDENTIFICADOR RPARA parametros RPARC RDOSPUNTOS tipodato RLLAVEA lista RLLAVEC
                 {$$= new declaracionfuncion.declaracionfuncion($2,$4,$7,$9,@1.first_line,@1.first_column);}
               //FUNCION CON TIPO DE DATO Y SIN PARAMETROS
               | RFUNCTION IDENTIFICADOR RPARA RPARC RDOSPUNTOS tipodato RLLAVEA lista RLLAVEC
               {$$= new declaracionfuncion.declaracionfuncion($2,null,$6,$8,@1.first_line,@1.first_column);}
               //PENDIENTE, FALTA AGREGAR FUNCIONES CON TIPO DE DATO [][], ES DECIR, FUNCIONES QUE REGRESAN
               //ARREGLOS
                 ;

llamarfuncion:  IDENTIFICADOR RPARA RPARC
                {$$= new llamarfuncion.llamarfuncion($1,undefined,@1.first_line,@1.first_column);}
               |IDENTIFICADOR RPARA listaexpresiones RPARC
                {$$= new llamarfuncion.llamarfuncion($1,$3,@1.first_line,@1.first_column);}
               ;

parametros: parametros RCOMA parametro {$1.push($3); $$=$1;}
          | parametro {$$=[$1];}  
          ;


parametro: IDENTIFICADOR RDOSPUNTOS tipodato
            {$$= new parametro.parametro($1,$3,false,@1.first_line,@1.first_column);}
          |IDENTIFICADOR RDOSPUNTOS tipodato dimensiones
            {$$= new parametro.parametro($1,$3,true,@1.first_line,@1.first_column);}
           ;


tipodato:  
           RSTRING {$$=tipo_dato.STRING;}
          |RNUMBER {$$=tipo_dato.NUMBER;}
          |RBOOLEAN {$$=tipo_dato.BOOLEAN;} 
          |RVOID   {$$=tipo_dato.VOID;}
          |RARRAY  {$$=tipo_dato.ARRAY;}
          ;


imprimir  : RCONSOLE RPUNTO RLOG RPARA listaexpresiones RPARC RPUNTOCOMA
            {$$=new imprimir.imprimir($5,@1.first_line,@1.first_column);}
            ;  

instruccionreturn: RRETURN RPUNTOCOMA
                   {$$= new instruccionreturn.instruccionreturn(null,@1.first_line,@1.first_column);}     
                  |RRETURN expresion RPUNTOCOMA
                   {$$= new instruccionreturn.instruccionreturn($2,@1.first_line,@1.first_column);}
                  ; 

listaexpresiones: listaexpresiones RCOMA expresion {$1.push($3); $$=$1;}
                | expresion {$$=[$1]}
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
          {$$= new aritmetica.aritmetica($1,operador.EXPONENTE,$3,@1.first_line,@1.first_column);} 
          |IDENTIFICADOR RMASMAS
          {$$= new incremento_decremento.incremento_decremento($1,operador.INCREMENTO,@1.first_line,@1.first_column);}          
          |IDENTIFICADOR RMENOSMENOS
          {$$= new incremento_decremento.incremento_decremento($1,operador.DECREMENTO,@1.first_line,@1.first_column);}      

          /*EXPRESIONES RELACIONALES*/
          |expresion RMAYORQUE expresion
          {$$= new relacional.relacional($1,operador.MAYORQUE,$3,@1.first_line,@1.first_column);}       
          |expresion RMENORQUE expresion
          {$$= new relacional.relacional($1,operador.MENORQUE,$3,@1.first_line,@1.first_column);}      
          |expresion RMAYORIGUALQUE expresion 
          {$$= new relacional.relacional($1,operador.MAYORIGUALQUE,$3,@1.first_line,@1.first_column);} 
          |expresion RMENORIGUALQUE expresion 
          {$$= new relacional.relacional($1,operador.MENORIGUALQUE,$3,@1.first_line,@1.first_column);} 
          |expresion RIGUALQUE expresion 
          {$$= new igualdad.igualdad($1,operador.IGUALQUE,$3,@1.first_line,@1.first_column);}      
          |expresion RDIFERENTEQUE expresion   
          {$$= new diferenteque.diferenteque($1,operador.DIFERENTEQUE,$3,@1.first_line,@1.first_column);}
          /*EXPRESIONES LOGICAS*/
          |expresion RAND expresion
          {$$= new logica.logica($1,operador.AND,$3,@1.first_line,@1.first_column);}       
          |expresion ROR expresion
           {$$= new logica.logica($1,operador.OR,$3,@1.first_line,@1.first_column);}            
          |RNOT expresion
          {$$= new unaria.unaria(operador.NOT,$2,@1.first_line,@1.first_column);}                      
          /*RESTANTES*/
          |RPARA expresion RPARC  {$$=$2;}
          |expresion RINTERROGACION expresion RDOSPUNTOS expresion
           {$$= new operadorternario.operadorternario($1,$3,$5,@1.first_line,@1.first_column);}
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
          //| nativa              {$$=$1;}
          | expresion RPUNTO listametodos
          {$$= new nativastring.nativastring($1,$3,@1.first_line,@1.first_column);}
          ;




listametodos:   listametodos RPUNTO metodos {$1.push($3); $$=$1;}
              |  metodos {$$=[$1]};

metodos:  RCHARAT RPARA expresion RPARC
         {$$= new stringmetodos.stringmetodos(tipo_metodo.CHARAT,$3,@1.first_line,@1.first_column);}
        |RTOUPPERCASE RPARA RPARC
        {$$= new stringmetodos.stringmetodos(tipo_metodo.TOUPPERCASE,null,@1.first_line,@1.first_column);}
        |RTOLOWERCASE RPARA RPARC
        {$$= new stringmetodos.stringmetodos(tipo_metodo.TOLOWERCASE,null,@1.first_line,@1.first_column);}
        |RCONCAT RPARA expresion RPARC
         {$$= new stringmetodos.stringmetodos(tipo_metodo.CONCAT,$3,@1.first_line,@1.first_column);}
        |RLENGTH
         {$$= new stringmetodos.stringmetodos(tipo_metodo.LENGTH,null,@1.first_line,@1.first_column);}
        ;
