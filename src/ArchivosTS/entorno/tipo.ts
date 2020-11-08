 enum tipo_dato{
    NUMBER="NUMBER",
    ENTERO="ENTERO",
    DECIMAL="DECIMAL",
    STRING ="STRING",
    BOOLEAN ="BOOLEAN",
    TYPE ="TYPE",
    VOID="VOID",
    ANY="ANY",
    ARRAY= "ARRAY",
    UNDEFINED= "UNDEFINED"
}

enum tipo_ambito{
    GLOBAL="GLOBAL",
    LOCAL="LOCAL"
}

enum tipo_rol{
    CLASE="CLASE",
    VARIABLE="VARIABLE",
    VARCLASE="VARCLASE"
}

enum tipo_variable{
    CONST="CONST",
    LET ="LET"
}

enum tipo_instruccion{
    BREAK= "BREAK",
    CONTINUE="CONTINUE",
    RETURN="RETURN",
    PUSH="PUSH",
    POP="POP",
    LENGTH="LENGTH"
}

enum operador{
    //OPERADORES ARITMETICOS
    MAS="MAS",
    MENOS="MENOS",
    POR="POR",
    DIVISION="DIVISION",
    MODULO= "MODULO",
    EXPONENTE= "EXPONENTE",
    INCREMENTO="INCREMENTO",
    DECREMENTO="DECREMENTO",
    //OPERADORES RELACIONES
    MAYORQUE="MAYORQUE",
    MENORQUE="MENORQUE",
    MAYORIGUALQUE="MAYORIGUALQUE",
    MENORIGUALQUE="MENORIGUALQUE",
    DIFERENTEQUE="DIFERENTEQUE",
    IGUALQUE="IGUALQUE",
    //OPERADORES LOGICOS
    NOT="NOT",
    AND="AND",
    OR="OR"
}

enum tipo_metodo{
    TOUPPERCASE= "TOUPPERCASE",
    TOLOWERCASE="TOLOWERCASE",
    CHARAT="CHARAT",
    CONCAT= "CONCAT",
    LENGTH="LENGTH"
}


export {tipo_dato,operador,tipo_variable,tipo_instruccion,tipo_rol,tipo_ambito,tipo_metodo};