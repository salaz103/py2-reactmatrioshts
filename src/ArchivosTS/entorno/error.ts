
export class error{

    tipo:string;
    valor:string;
    linea:string;
    columna:string;

    constructor(t:string,val:string,l:string,c:string){
        this.tipo=t;
        this.valor=val;
        this.linea=l;
        this.columna=c;
    }


}