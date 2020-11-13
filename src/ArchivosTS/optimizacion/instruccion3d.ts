import instruccion from "./instruccion";
import { literal } from "./literal";

export class instruccion3d implements instruccion {

    codigoAnterior: string;
    objetivo: string;
    ladoizquierdo: literal;
    operador: string;
    ladoderecho: literal;
    linea: number;

    constructor(codigoAnterior: string, objetivo: string, izquierdo: literal, op: string, derecho: literal, linea: number) {
        this.codigoAnterior = codigoAnterior;
        this.objetivo = objetivo;
        this.ladoizquierdo = izquierdo;
        this.operador = op;
        this.ladoderecho = derecho;
        this.linea = linea;
    }

    optimizar(): string {
        let codigo_nuevo:string;
        let codigoizquierda = this.ladoizquierdo.obtenercodigo();
        let codigoderecha = this.ladoderecho.obtenercodigo();
        let regla_aplicada = 0;
        let cambio = false;
        let codigo_anterior= this.objetivo+"="+codigoizquierda.valor+this.operador+codigoderecha.valor+";\n";
        codigo_nuevo=codigo_anterior;
        //EL CODIGO TRAE UN TIPO, 
        //1 --> ES UN ID
        //2 --> ES UN NUMERO
        if (codigoizquierda.tipo == 1 && codigoderecha.tipo == 2) {

            if (this.operador == '+') {
                //A LA SUMA LE CORRESPONDE LA REGLA 6 Y 10
                if (this.objetivo == codigoizquierda.valor && codigoderecha.valor == '0') {
                    //REGLA 6 /// t1=t1+0 SALIDA: ""
                    codigo_nuevo = "";
                    cambio = true;
                    regla_aplicada = 6;
                } else if (this.objetivo != codigoizquierda.valor && codigoderecha.valor == '0') {
                    //REGLA 10 /// y= x+0 SALIDA: y=x
                    codigo_nuevo = this.objetivo + "=" + codigoizquierda.valor+";";
                    cambio = true;
                    regla_aplicada = 10;
                }
            } else if (this.operador == '-') {
                //A LA RESTA LE CORRESPONDE LA REGLA 7 Y 11
                if (this.objetivo == codigoizquierda.valor && codigoderecha.valor == '0') {
                    //REGLA 7 //// t2=t2-0 SALIDA: ""
                    codigo_nuevo = "";
                    cambio = true;
                    regla_aplicada = 7;
                } else if (this.objetivo != codigoizquierda.valor && codigoderecha.valor == '0') {
                    //REGLA 11 /// y= x-0 SALIDA: y=x
                    codigo_nuevo = this.objetivo + "=" + codigoizquierda.valor+";";
                    cambio = true;
                    regla_aplicada = 11;
                }

            } else if (this.operador == '*') {
                //A LA MULTIPLICACION LE CORRESPONDEN LAS REGLAS 8, 12, 14 y 15
                if (this.objetivo == codigoizquierda.valor && codigoderecha.valor == '1') {
                    //REGLA 8 /// t3=t3*1 SALIDA: ""
                    codigo_nuevo = "";
                    cambio = true;
                    regla_aplicada = 8;
                } else if (this.objetivo != codigoizquierda.valor && codigoderecha.valor == '1') {
                    //REGLA 12 /// y=x*1 SALIDA y=x
                    codigo_nuevo = this.objetivo + "=" + codigoizquierda.valor+";";
                    cambio = true;
                    regla_aplicada = 12;
                } else if (this.objetivo != codigoizquierda.valor && codigoderecha.valor == '2') {
                    //REGLA 14 // x=y*2  SALIDA x= y+y
                    codigo_nuevo = this.objetivo + "=" + codigoizquierda.valor + "+" + codigoizquierda.valor+";";
                    cambio = true;
                    regla_aplicada = 14;
                } else if (codigoderecha.valor == '0') {
                    //REGLA 15 // x=y*0 SALIDA x=0
                    codigo_nuevo = this.objetivo + "=0;";
                    cambio = true;
                    regla_aplicada = 15;
                }


            } else if (this.operador == '/') {
                // A LA DIVISION LE CORRESPONDEN LAS REGLAS 9,13
                if (this.objetivo == codigoizquierda.valor && codigoderecha.valor == '1') {
                    //REGLA 9 /// t4=t4/1 SALIDA: ""
                    codigo_nuevo = "";
                    cambio = true;
                    regla_aplicada = 9;
                } else if (this.objetivo != codigoizquierda.valor && codigoderecha.valor == '1') {
                    //REGLA 13 /// y=x/1 SALIDA y=x
                    codigo_nuevo = this.objetivo + "=" + codigoizquierda.valor+";";
                    cambio = true;
                    regla_aplicada = 13;
                }
            }

        } else if (codigoizquierda.tipo == 2 && codigoderecha.tipo == 1) {
            //SON LAS MISMAS REGLAS SOLO QUE AL "REVES"
            if (this.operador == '+') {
                if (this.objetivo == codigoderecha.valor && codigoizquierda.valor == '0') {
                    //REGLA 6 /// t1=t1+0 SALIDA: ""
                    codigo_nuevo = "";
                    cambio = true;
                    regla_aplicada = 6;
                } else if (this.objetivo != codigoderecha.valor && codigoizquierda.valor == '0') {
                    //REGLA 10 /// y= x+0 SALIDA: y=x
                    codigo_nuevo = this.objetivo + "=" + codigoderecha.valor+";";
                    cambio = true;
                    regla_aplicada = 10;
                }

            } else if (this.operador == '*') {

                if (this.objetivo == codigoderecha.valor && codigoizquierda.valor == '1') {
                    //REGLA 8 /// t3=1*t3 SALIDA: ""
                    codigo_nuevo = "";
                    cambio = true;
                    regla_aplicada = 8;
                } else if (this.objetivo != codigoderecha.valor && codigoizquierda.valor == '1') {
                    //REGLA 12 /// y=1*x SALIDA y=x
                    codigo_nuevo = this.objetivo + "=" + codigoderecha.valor+";";
                    cambio = true;
                    regla_aplicada = 12;
                } else if (this.objetivo != codigoderecha.valor && codigoizquierda.valor == '2') {
                    //REGLA 14 // x=2*y  SALIDA x= y+y
                    codigo_nuevo = this.objetivo + "=" + codigoderecha.valor + "+" + codigoderecha.valor+";";
                    cambio = true;
                    regla_aplicada = 14;
                } else if (codigoizquierda.valor == '0') {
                    //REGLA 15 // x=0*y SALIDA x=0
                    codigo_nuevo = this.objetivo + "=0;";
                    cambio = true;
                    regla_aplicada = 15;
                }

            } else if (this.operador == '/') {
                //REGLA 16 // x=0/y SALIDA x=0
                if (codigoizquierda.valor == '0') {
                    codigo_nuevo = this.objetivo + "=0;";
                    cambio = true;
                    regla_aplicada = 16;
                }

            }
        }

        //UNA VEZ QUE YA TERMINAMOS DE VALIDAR Y CAMBIAR SI ES QUE FUE NECESARIO EL CODIGO
        //AHORA PREGUNTAMOS SI HUBO UN CAMBIO PARA PODER ENVIAR EL CAMBIO A REPORTAR
        if (cambio) {
            codigo_nuevo = codigo_nuevo + '\n';
            //AQUI VAN LOS REPORTES
        }

        return codigo_nuevo;
    }

}