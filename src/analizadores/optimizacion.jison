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
"include"             return 'RINCLUDE';
"double"              return 'RDOUBLE';


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
"#"                   return 'RNUMERAL';  
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

  //CLASES QUE SOLO DEVUELVEN CODIGO
  const asignaciondirecta= require('../ArchivosTS/optimizacion/asignaciondirecta');
  const heap_stack= require('../ArchivosTS/optimizacion/heap_stack');
  const lector= require('../ArchivosTS/optimizacion/lector');
  const instrucciongoto= require('../ArchivosTS/optimizacion/goto');
  const instruccionif= require('../ArchivosTS/optimizacion/instruccionif');
  const printf= require('../ArchivosTS/optimizacion/printf');
  const fmod= require('../ArchivosTS/optimizacion/fmod');

%}


/* operator associations and precedence */
%left  'RDIFERENTEQUE' 'RIGUALQUE'
%left  'RMENORQUE' 'RMAYORQUE' 'RMENORIGUALQUE' 'RMAYORIGUALQUE' 

//OPERACIONES ARITMETICAS
%left 'RMAS' 'RMENOS'
%left 'RPOR' 'RDIVISION'


%start s

%% /* language grammar */



s : c3d EOF { return $1; }               
  ;

c3d: encabezado voids {$$=$1.concat($2);};

encabezado: includes estructuras temporales  {$$=$1.concat($2).concat($3);};

includes: includes include {$1.push($2); $$=$1;}
          |include {$$=[$1];};

include: RNUMERAL RINCLUDE RMENORQUE IDENTIFICADOR RPUNTO IDENTIFICADOR RMAYORQUE
         {$$= new lector.lector(`${$1}${$2} ${$3}${$4}${$5}${$6}${$7}`,yylineno);}
         ;

estructuras: estructuras estructura {$1.push($2); $$=$1;}
            |estructura {$$=[$1];};

estructura: RDOUBLE RHEAP RCORCHETEA NUM RCORCHETEC RPUNTOCOMA
           {$$= new lector.lector(`${$1} ${$2}${$3}${$4}${$5}${$6}`,yylineno);}
           |RDOUBLE RSTACK RCORCHETEA NUM RCORCHETEC RPUNTOCOMA
           {$$= new lector.lector(`${$1} ${$2}${$3}${$4}${$5}${$6}`,yylineno);} 
            ;

temporales: temporales temporal {$1.push($2); $$=$1;}
           |temporal {$$=[$1];}
            ;

temporal: RDOUBLE listatemporales RPUNTOCOMA
          {$$= new lector.lector(`${$1} ${$2}${$3}`,yylineno);}
          ;

listatemporales: listatemporales RCOMA IDENTIFICADOR {$$=`${$1}${$2}${$3}`;}
                | IDENTIFICADOR {$$=$1;};

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
          {$$= new heap_stack.heap_stack($1,$3,yylineno);}
          |IDENTIFICADOR RIGUAL heap_stack RPUNTOCOMA
          {$$= new lector.lector(`${$1}${$2}${$3}${$4}`,yylineno);}
          |IDENTIFICADOR RIGUAL RFMOD RPARA literal RCOMA literal RPARC RPUNTOCOMA
          {$$= new fmod.fmod($1,$5,$7,yylineno);}      
          ;

printf: RPRINTF RPARA CADENA RCOMA RPARA casteo RPARC literal RPARC RPUNTOCOMA
        {$$= new printf.printf($3,$6,$8,yylineno);}
        ;

casteo: RINT {$$=$1;}
       |RCHAR {$$=$1;} 
       |RFLOAT {$$=$1;}
       ;

if: RIF RPARA literal relacional literal RPARC RGOTO IDENTIFICADOR RPUNTOCOMA
    {$$= new instruccionif.instruccionif($3,$4,$5,$8,yylineno);}   
    ;

goto: RGOTO IDENTIFICADOR RPUNTOCOMA
      {$$= new instrucciongoto.goto(`${$1} ${$2}${$3}`,yylineno);}
      ; 

etiqueta: IDENTIFICADOR RDOSPUNTOS
          {$$= new lector.lector(`${$1}${$2}`,yylineno);}
          ;

return: RRETURN RPUNTOCOMA 
        {$$= new lector.lector(`${$1} ${$2}`,yylineno);}
        ;

llamada_funcion: IDENTIFICADOR RPARA RPARC RPUNTOCOMA
                 {$$= new lector.lector(`${$1}${$2}${$3}${$4}`,yylineno);}
                 ;

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