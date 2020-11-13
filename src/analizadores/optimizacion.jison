/* lexical grammar */
%lex
%options case-insensitive
%locations

%%
///COMENTARIOS SIMPLES, MULTIPLE LINEA Y ESPACIOS EN BLANCO
\s+											// se ignoran espacios en blanco
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas		



//PALABRAS RESERVADAS
"stack"               return 'RSTACK';
"heap"                return 'RHEAP';
"int"                 return 'RINT';
"char"                return 'RCHAR';
"float"               return 'RFLOAT';
"return"              return 'RRETURN';
"if"                  return 'RIF';
"goto"                return 'RGOTO';
"fmod"                return 'RFMOD';
"void"                return 'RVOID';
"printf"              return 'RPRINTF';


//OPERACIONES ARITMETICAS
";"                   return 'RPUNTOCOMA';
"+"                   return 'RMAS';
"-"                   return 'RMENOS';
"*"                   return 'RPOR';
"/"                   return 'RDIVISION';
//OPERACIONES RELACIONALES
"<="                  return 'RMENORIGUALQUE';
">="                  return 'RMAYORIGUALQUE';
"<"                   return 'RMENORQUE';
">"                   return 'RMAYORQUE';
"=="                  return 'RIGUALQUE';
"!="                  return 'RDIFERENTEQUE';
"="                   return 'RIGUAL';
//OPERADOR TERNARIO
":"                   return 'RDOSPUNTOS';
"("                   return 'RPARA';
")"                   return 'RPARC';
"["                   return 'RCORCHETEA';
"]"                   return 'RCORCHETEC';
"{"                   return 'RLLAVEA';
"}"                   return 'RLLAVEC';
"."                   return 'RPUNTO';
","                   return 'RCOMA';


\"[^\"]*\"			{ yytext = yytext.substr(0,yyleng-0); return 'CADENA'; }

[0-9]+("."[0-9]+)?\b          return 'NUM';
([a-zA-Z])[a-zA-Z0-9_]*       return 'IDENTIFICADOR';

<<EOF>>               return 'EOF';
.					{ 
  const e= new error.error("Léxico","Error lexico con caracter: "+yytext,yylloc.first_line,yylloc.first_column);
  lista.listaerrores.obtenerLista().guardar(e);
          }



/lex

%{
  

%}


/* operator associations and precedence */
%left  'RDIFERENTEQUE' 'RIGUALQUE'
%left  'RMENORQUE' 'RMAYORQUE' 'RMENORIGUALQUE' 'RMAYORIGUALQUE' 

//OPERACIONES ARITMETICAS
%left 'RMAS' 'RMENOS'
%left 'RPOR' 'RDIVISION'


%start s

%% /* language grammar */


s : voids EOF { return $1; }               
  ;


voids: voids funcion
      |funcion;


funcion: RVOID IDENTIFICADOR RPARA RPARC RLLAVEA lista RLLAVEC
        | IDENTIFICADOR RPARA RPARC RLLAVEA lista RLLAVEC
        ;

lista : lista instruccion {$1.push($2); $$=$1;}
      | instruccion  {$$=[$1];}
      ;


instruccion: principal 
            |printf
            |if
            |goto
            |etiqueta
            |return
            |llamada_funcion
            ;

principal: IDENTIFICADOR RIGUAL literal operador literal RPUNTOCOMA
          |IDENTIFICADOR RIGUAL literal RPUNTOCOMA
          |stack RIGUAL literal RPUNTOCOMA
          |heap RIGUAL literal RPUNTOCOMA
          |IDENTIFICADOR RIGUAL stack RPUNTOCOMA
          |IDENTIFICADOR RIGUAL heap RPUNTOCOMA
          |IDENTIFICADOR RIGUAL RFMOD RPARA literal RCOMA literal RPARC RPUNTOCOMA
          ;

printf: RPRINTF RPARA CADENA RCOMA RPARA casteo RPARC literal RPARC RPUNTOCOMA;

casteo: RINT
       |RCHAR
       |RFLOAT
       ;

if: RIF RPARA literal relacional literal RPARC RGOTO IDENTIFICADOR RPUNTOCOMA
    ;

goto: RGOTO IDENTIFICADOR RPUNTOCOMA; 

etiqueta: IDENTIFICADOR RDOSPUNTOS;

return: RRETURN RPUNTOCOMA ;

llamada_funcion: IDENTIFICADOR RPARA RPARC RPUNTOCOMA;

operador: RMAS
         |RMENOS
         |RPOR
         |RDIVISION
         ;

relacional: RMENORQUE
           |RMAYORQUE
           |RMENORIGUALQUE
           |RMAYORIGUALQUE
           |RDIFERENTEQUE
           |RIGUALQUE;

literal: IDENTIFICADOR
        {$$=$1;}
        |NUM
        {$$=$1;}
        |RMENOS NUM
        {$$= $1+$2;}
        ;


stack: RSTACK RCORCHETEA RPARA RINT RPARC literal RCORCHETEC
       ;

heap: RHEAP RCORCHETEA RPARA RINT RPARC literal RCORCHETEC
      ;