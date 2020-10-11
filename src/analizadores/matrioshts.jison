/* lexical grammar */
%lex
%options flex case-sensitive
%option yylineno
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

\'[^\']*\'          { yytext = yytext.substr(1,yyleng-2); return 'CADENACOMILLASIMPLE'; }
\"[^\"]*\"            { yytext = yytext.substr(1,yyleng-2); return 'CADENACOMILLADOBLE'; }
[0-9]+("."[0-9]+)?\b          return 'NUM';
([a-zA-Z])[a-zA-Z0-9_]*       return 'IDENTIFICADOR';

<<EOF>>               return 'EOF';
.					{ console.error('Error Lexico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }



/lex

%{
const nodobase= require('../arbolBase/nodobase').nodobase;
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


//DESANIDADO
lista : lista instruccion { $1.hijos.push($2); $$=$1;  /*$1.push($2); $$=$1;*/}
      | instruccion {$$=nodobase.nuevonodo('INSTRUCCIONES',[$1],yylineno);  /*$$=[$1]*/} 
      ;

instruccion: declaraciones RPUNTOCOMA 
              {$$=nodobase.nuevonodo('IDECLARACIONES',[$1,$2],yylineno);}
            | asignacion RPUNTOCOMA  
              {$$=nodobase.nuevonodo('IDECLARACIONES',[$1,$2],yylineno);} //LISTO
            | instruccionif {$$=$1} //LISTO
            | instruccionswitch {$$=$1} //LISTO
            | instruccionfor {$$=$1;} //LISTO
            | instruccionwhile {$$=$1;} //LISTO
            | imprimir {$$=$1;}  //LISTO
            | declararfuncion {$$=$1} //LISTO
            | nativa RPUNTOCOMA //LISTO
             {$$=nodobase.nuevonodo('NATIVA',[$1,$2],yylineno);}
            | llamarfuncion RPUNTOCOMA
             {$$=nodobase.nuevonodo('LFUNCION',[$1,$2],yylineno);}
            | masmenos RPUNTOCOMA 
             {$$=nodobase.nuevonodo('IMAS_MAS',[$1,$2],yylineno);} //LISTO
            | RGRAFICAR RPARA RPARC RPUNTOCOMA
             {$$=nodobase.nuevonodo('GRAFICAR',[$1,$2,$3,$4],yylineno);}
            | RBREAK RPUNTOCOMA
             {$$=nodobase.nuevonodo('BREAK',[$1,$2],yylineno);} 
            | RCONTINUE RPUNTOCOMA
            {$$=nodobase.nuevonodo('CONTINUE',[$1,$2],yylineno);}
            | instruccionreturn {$$=$1}  //LISTO
            ;

masmenos: IDENTIFICADOR RMASMAS
          {$$=nodobase.nuevonodo('MAS_MAS',[$1,$2],yylineno);}  
         |IDENTIFICADOR RMENOSMENOS
         {$$=nodobase.nuevonodo('MENOS_MENOS',[$1,$2],yylineno);}
         ;

nativa: IDENTIFICADOR RPUNTO RPUSH RPARA listaexpresiones RPARC
        {$$=nodobase.nuevonodo('PUSH',[$1,$2,$3,$4,$5,$6],yylineno);}
       |IDENTIFICADOR RPUNTO RPOP RPARA RPARC
        {$$=nodobase.nuevonodo('POP',[$1,$2,$3,$4,$5],yylineno);}
       |IDENTIFICADOR RPUNTO RLENGTH
        {$$=nodobase.nuevonodo('LENGTH',[$1,$2,$3],yylineno);}
       ;

//LISTO
declaraciones: tipovariable listavariables {$$=nodobase.nuevonodo('DECLARACION_VARIABLE',[$1,$2],yylineno);};


//LISTO
listavariables:   listavariables RCOMA variable {$1.hijos.push($3); $$=$1;}
                | variable {$$=nodobase.nuevonodo('LISTA_VARIABLES',[$1],yylineno);};


//LISTO          
variable: IDENTIFICADOR RDOSPUNTOS tipodato RIGUAL expresion {$$= nodobase.nuevonodo('VARIABLE_FULL',[$1,$2,$3,$4,$5],yylineno);}
         | IDENTIFICADOR RIGUAL expresion    {$$= nodobase.nuevonodo('VARIABLE_CON_EXPRESION',[$1,$2,$3],yylineno);}
         | IDENTIFICADOR RDOSPUNTOS tipodato {$$= nodobase.nuevonodo('VARIABLE_SIN_EXPRESION',[$1,$2,$3],yylineno);}
         | IDENTIFICADOR {$$= nodobase.nuevonodo('VARIABLE_ID',[$1],yylineno);}
          //////********ARREGLOS******//////
         | IDENTIFICADOR RDOSPUNTOS tipodato RIGUAL RCORCHETEA listaexpresiones RCORCHETEC
           {$$= nodobase.nuevonodo('ARREGLO_COMPLETO1',[$1,$2,$3,$4,$5,$6,$7],yylineno);}
         | IDENTIFICADOR RDOSPUNTOS tipodato RIGUAL RCORCHETEA  RCORCHETEC
           {$$= nodobase.nuevonodo('ARREGLO_COMPLETO2',[$1,$2,$3,$4,$5,$6],yylineno);}
         | IDENTIFICADOR RIGUAL RCORCHETEA listaexpresiones RCORCHETEC
           {$$= nodobase.nuevonodo('ARREGLO',[$1,$2,$3,$4,$5],yylineno);}
         | IDENTIFICADOR RIGUAL RCORCHETEA  RCORCHETEC
           {$$= nodobase.nuevonodo('ARREGLO2',[$1,$2,$3,$4],yylineno);}
         ;

//LISTO
tipovariable: RLET   {$$= nodobase.nuevonodo('LET',[$1],yylineno);}  //LISTO
            | RCONST {$$= nodobase.nuevonodo('CONST',[$1],yylineno);} //LISTO
            ;

//LISTO
asignacion: IDENTIFICADOR RIGUAL expresion
            {$$=nodobase.nuevonodo('ASIGNACION',[$1,$2,$3],yylineno)};

//LISTO
instruccionif: RIF RPARA expresion RPARC RLLAVEA lista RLLAVEC
               {$$=nodobase.nuevonodo('IF_SIMPLE',[$1,$2,$3,$4,$5,$6,$7],yylineno)}
             | RIF RPARA expresion RPARC RLLAVEA lista RLLAVEC instruccionelse
               {$$=nodobase.nuevonodo('IF_ELSE',[$1,$2,$3,$4,$5,$6,$7,$8],yylineno)};
// LISTO
instruccionelse: RELSE instruccionif {$$=nodobase.nuevonodo('ELSE_IF',[$1,$2],yylineno)}
                | RELSE RLLAVEA lista RLLAVEC  {$$=nodobase.nuevonodo('ELSE',[$1,$2,$3,$4],yylineno)}
                ;
//LISTO
instruccionswitch: RSWITCH RPARA expresion RPARC RLLAVEA casos RLLAVEC
                  {$$=nodobase.nuevonodo('SWITCH',[$1,$2,$3,$4,$5,$6,$7],yylineno);}
                  ;
//LISTO
casos: casos caso {$1.hijos.push($2); $$=$1;}
      | caso {$$=nodobase.nuevonodo('LISTA_CASOS',[$1],yylineno);}; 

caso: RCASE expresion RDOSPUNTOS lista  
      {$$= nodobase.nuevonodo('CASE',[$1,$2,$3,$4],yylineno);}
      | RDEFAULT RDOSPUNTOS lista  
        {$$= nodobase.nuevonodo('CASE_DEFAULT',[$1,$2,$3],yylineno);};

instruccionfor: RFOR RPARA declaraciones RPUNTOCOMA expresion RPUNTOCOMA masmenos RPARC RLLAVEA  lista RLLAVEC
                {$$= nodobase.nuevonodo('FOR',[$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11],yylineno);}
              
              | RFOR RPARA asignacion RPUNTOCOMA expresion RPUNTOCOMA masmenos RPARC RLLAVEA lista RLLAVEC
                {$$= nodobase.nuevonodo('FOR',[$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11],yylineno);}
              | RFOR RPARA tipovariable IDENTIFICADOR ROF IDENTIFICADOR RPARC RLLAVEA lista RLLAVEC
                {$$= nodobase.nuevonodo('FOR_OF',[$1,$2,$3,$4,$5,$6,$7,$8,$9,$10],yylineno);}
              | RFOR RPARA tipovariable IDENTIFICADOR RIN IDENTIFICADOR RPARC RLLAVEC lista RLLAVEC
              ;

//LISTO
instruccionwhile:  RWHILE RPARA expresion RPARC RLLAVEA lista RLLAVEC
                   {$$= nodobase.nuevonodo('WHILE',[$1,$2,$3,$4,$5,$6,$7],yylineno);}
                 | RDO RLLAVEA lista RLLAVEC RWHILE RPARA expresion RPARC 
                   {$$= nodobase.nuevonodo('DO_WHILE',[$1,$2,$3,$4,$5,$6,$7,$8],yylineno);}
                  ;

                 //FUNCION SIN TIPO DATO Y SIN PARAMETROS
declararfuncion: RFUNCTION IDENTIFICADOR RPARA RPARC RLLAVEA lista RLLAVEC
                 {$$= nodobase.nuevonodo('FUNCION',[$1,$2,$3,$4,$5,$6,$7],yylineno);}
               //FUNCION CON TIPO DE DATO Y PARAMETROS
               | RFUNCTION IDENTIFICADOR RPARA parametros RPARC RDOSPUNTOS tipodato RLLAVEA lista RLLAVEC
               {$$= nodobase.nuevonodo('FUNCION',[$1,$2,$3,$4,$5,$6,$7,$8,$9,$10],yylineno);}
               //FUNCION SIN TIPO DE DATO Y CON PARAMETROS
               | RFUNCTION IDENTIFICADOR RPARA parametros RPARC  RLLAVEA lista RLLAVEC
               {$$= nodobase.nuevonodo('FUNCION',[$1,$2,$3,$4,$5,$6,$7,$8],yylineno);}
               //FUNCION CON TIPO DE DATO Y SIN PARAMETROS
               | RFUNCTION IDENTIFICADOR RPARA RPARC RDOSPUNTOS tipodato RLLAVEA lista RLLAVEC
               {$$= nodobase.nuevonodo('FUNCION',[$1,$2,$3,$4,$5,$6,$7,$8,$9],yylineno);}
               ;

llamarfuncion: IDENTIFICADOR RPARA RPARC 
               {$$= nodobase.nuevonodo('LLAMADA_FUNCION1',[$1,$2,$3],yylineno);}
               |IDENTIFICADOR RPARA listaexpresiones RPARC
               {$$= nodobase.nuevonodo('LLAMADA_FUNCION2',[$1,$2,$3,$4],yylineno);}
                ;

//LISTO
parametros: parametros RCOMA parametro {$1.hijos.push($3); $$=$1;}
          | parametro {$$=nodobase.nuevonodo('LISTA_PARAMETROS',[$1],yylineno);};


//LISTO
parametro: IDENTIFICADOR RDOSPUNTOS tipodato {$$= nodobase.nuevonodo('PARAMETRO',[$1,$2,$3],yylineno);};


tipodato:  
          //LISTO
           RSTRING {$$= nodobase.nuevonodo('STRING',[$1],yylineno);}
           //LISTO  
          |RNUMBER {$$= nodobase.nuevonodo('NUMBER',[$1],yylineno);}
          //LISTO
          |RBOOLEAN {$$= nodobase.nuevonodo('BOOLEAN',[$1],yylineno);}
          //LISTO
          |RVOID   {$$= nodobase.nuevonodo('VOID',[$1],yylineno);}

          |RSTRING RCORCHETEA RCORCHETEC
           {$$= nodobase.nuevonodo('STRING[]',[$1],yylineno);}
          |RNUMBER RCORCHETEA RCORCHETEC
           {$$= nodobase.nuevonodo('NUMBER[]',[$1],yylineno);}
          |RBOOLEAN RCORCHETEA RCORCHETEC
           {$$= nodobase.nuevonodo('BOOLEAN[]',[$1],yylineno);}
          ;


//LISTO
imprimir  : RCONSOLE RPUNTO RLOG RPARA expresion RPARC RPUNTOCOMA
            {$$= nodobase.nuevonodo('IMPRIMIR',[$1,$2,$3,$4,$5,$6,$7],yylineno);} ;  

//LISTO
instruccionreturn: RRETURN RPUNTOCOMA {$$= nodobase.nuevonodo('RETURN',[$1,$2],yylineno);}
                  |RRETURN expresion RPUNTOCOMA {$$= nodobase.nuevonodo('RETURN',[$1,$2,$3],yylineno);}
                  ; 

listaexpresiones: listaexpresiones RCOMA expresion {$1.hijos.push($3); $$=$1;}
                | expresion {$$=nodobase.nuevonodo('LISTA_EXPRESIONES',[$1],yylineno);}
                ;

expresion: 
           /*EXPRESIONES ARITMETICAS*/
           RMENOS expresion %prec UMENOS {$$= nodobase.nuevonodo('NEGATIVO',[$1,$2],yylineno);} //LISTO
          |expresion RMAS expresion    {$$= nodobase.nuevonodo('MAS',[$1,$2,$3],yylineno);}  //LISTO
          |expresion RMENOS expresion  {$$= nodobase.nuevonodo('MENOS',[$1,$2,$3],yylineno);} //LISTO
          |expresion RPOR expresion    {$$= nodobase.nuevonodo('POR',[$1,$2,$3],yylineno);} //LISTO
          |expresion RDIVISION expresion {$$= nodobase.nuevonodo('DIVISION',[$1,$2,$3],yylineno);} //LISTO
          |expresion RMODULO expresion   {$$= nodobase.nuevonodo('MODULO',[$1,$2,$3],yylineno);}  //LISTO
          |expresion REXPONENTE expresion {$$= nodobase.nuevonodo('EXPONENTE',[$1,$2,$3],yylineno);} //LISTO
          /*|IDENTIFICADOR RMASMAS
          |IDENTIFICADOR RMENOSMENOS*/

          /*EXPRESIONES RELACIONALES*/
          |expresion RMAYORQUE expresion  {$$= nodobase.nuevonodo('MAYORQUE',[$1,$2,$3],yylineno);}  //LISTO
          |expresion RMENORQUE expresion  {$$= nodobase.nuevonodo('MENORQUE',[$1,$2,$3],yylineno);}  //LISTO
          |expresion RMAYORIGUALQUE expresion {$$= nodobase.nuevonodo('MAYORIGUALQUE',[$1,$2,$3],yylineno);} //LISTO
          |expresion RMENORIGUALQUE expresion {$$= nodobase.nuevonodo('MENORIGUALQUE',[$1,$2,$3],yylineno);} //LISTO
          |expresion RIGUALQUE expresion   {$$= nodobase.nuevonodo('IGUALQUE',[$1,$2,$3],yylineno);}  //LISTO
          |expresion RDIFERENTEQUE expresion  {$$= nodobase.nuevonodo('DIFERENTEQUE',[$1,$2,$3],yylineno);} //LISTO
          /*EXPRESIONES LOGICAS*/
          |expresion RAND expresion        {$$= nodobase.nuevonodo('AND',[$1,$2,$3],yylineno);}   //LISTO
          |expresion ROR expresion         {$$= nodobase.nuevonodo('OR',[$1,$2,$3],yylineno);}   //LISTO
          |RNOT expresion                  {$$= nodobase.nuevonodo('NOT',[$1,$2],yylineno);}     //LISTO
          /*RESTANTES*/
          |RPARA expresion RPARC  {$$= nodobase.nuevonodo('PAREXPRESION',[$1,$2,$3],yylineno);}//LISTO
          |expresion RINTERROGACION expresion RDOSPUNTOS expresion //LISTO
           {$$= nodobase.nuevonodo('TERNARIO',[$1,$2,$3,$4,$5],yylineno);}
          |NUM                    {$$= nodobase.nuevonodo('NUMERO',[$1],yylineno);} //LISTO
          |RTRUE                  {$$= nodobase.nuevonodo('TRUE',[$1],yylineno);}   //LISTO
          |RFALSE                 {$$= nodobase.nuevonodo('FALSE',[$1],yylineno);}  //LISTO
          |CADENACOMILLADOBLE  {$$= nodobase.nuevonodo('COMILLA_DOBLE',[$1],yylineno);} //LISTO
          |CADENACOMILLASIMPLE {$$= nodobase.nuevonodo('COMILLA_SIMPLE',[$1],yylineno);} //LISTO
          |IDENTIFICADOR       {$$= nodobase.nuevonodo('IDENTIFICADOR',[$1],yylineno);}  //LISTO
          //LLAMADA A FUNCIONES 
          //LISTO
          | llamarfuncion {$$=$1;}
          | nativa        {$$=$1;}
          ;