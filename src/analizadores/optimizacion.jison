/* lexical grammar */
%lex
%options case-insensitive
%option yylineno
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
          }



/lex

%{
  const literal= require('../ArchivosTS/optimizacion/literal');
  const funcion= require('../ArchivosTS/optimizacion/funcion');
  const instruccion3d= require('../ArchivosTS/optimizacion/instruccion3d');
  const asignaciondirecta= require('../ArchivosTS/optimizacion/asignaciondirecta');
  

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


voids: voids funcion {$1.push($2); $$=$1;}
      |funcion {$$=[$1];};


funcion: RVOID IDENTIFICADOR RPARA RPARC RLLAVEA lista RLLAVEC
        {$$=new funcion.funcion(`${$1} ${$2}`,$6,yylineno);}
        |IDENTIFICADOR RPARA RPARC RLLAVEA lista RLLAVEC
        {$$=new funcion.funcion($1,$5,yylineno);}
        ;

lista : lista instruccion {$1.push($2); $$=$1;}
      | instruccion  {$$=[$1];}
      ;


instruccion: principal {$$=$1;}
            |printf    {$$=$1;} 
            |if        {$$=$1;}
            |goto      {$$=$1;}
            |etiqueta  {$$=$1;}
            |return    {$$=$1;}
            |llamada_funcion {$$=$1;}
            ;

principal: IDENTIFICADOR RIGUAL literal operador literal RPUNTOCOMA
          {$$= new instruccion3d.instruccion3d(`${$1}${$2}${$3}${$4}${$5}${$6}\n`,$1,$3,$4,$5,yylineno);}
          |IDENTIFICADOR RIGUAL literal RPUNTOCOMA
          {$$= new asignaciondirecta.asignaciondirecta($1,$3,yylineno);}
          |heap_stack RIGUAL literal RPUNTOCOMA
          |IDENTIFICADOR RIGUAL heap_stack RPUNTOCOMA
          |IDENTIFICADOR RIGUAL RFMOD RPARA literal RCOMA literal RPARC RPUNTOCOMA
          ;

printf: RPRINTF RPARA CADENA RCOMA RPARA casteo RPARC literal RPARC RPUNTOCOMA;

casteo: RINT {$$=$1;}
       |RCHAR {$$=$1;} 
       |RFLOAT {$$=$1;}
       ;

if: RIF RPARA literal relacional literal RPARC RGOTO IDENTIFICADOR RPUNTOCOMA
    ;

goto: RGOTO IDENTIFICADOR RPUNTOCOMA; 

etiqueta: IDENTIFICADOR RDOSPUNTOS;

return: RRETURN RPUNTOCOMA ;

llamada_funcion: IDENTIFICADOR RPARA RPARC RPUNTOCOMA;

operador: RMAS {$$=$1;}
         |RMENOS {$$=$1;}
         |RPOR {$$=$1;}
         |RDIVISION {$$=$1;}
         ;

relacional: RMENORQUE {$$=$1;}
           |RMAYORQUE {$$=$1;}
           |RMENORIGUALQUE {$$=$1;}
           |RMAYORIGUALQUE {$$=$1;}
           |RDIFERENTEQUE {$$=$1;}
           |RIGUALQUE {$$=$1;}
           ;

literal: IDENTIFICADOR
        {$$=new literal.literal(1,$1);}
        |NUM
        {$$=new literal.literal(2,$1);}
        |RMENOS NUM
        {$$=new literal.literal(2,`${$1}${$2}`);}
        ;



heap_stack: RHEAP RCORCHETEA RPARA RINT RPARC IDENTIFICADOR RCORCHETEC
            {$$ = `${$1}${$2}${$3}${$4}${$5}${$6}${$7}`;}
            |RHEAP RCORCHETEA RPARA RINT RPARC NUM RCORCHETEC
            {$$ = `${$1}${$2}${$3}${$4}${$5}${$6}${$7}`;}
            |RSTACK RCORCHETEA RPARA RINT RPARC IDENTIFICADOR RCORCHETEC
            {$$ = `${$1}${$2}${$3}${$4}${$5}${$6}${$7}`;}
            |RSTACK RCORCHETEA RPARA RINT RPARC NUM RCORCHETEC
            {$$ = `${$1}${$2}${$3}${$4}${$5}${$6}${$7}`;};