/* eslint-disable prettier/prettier */
import { Usuario } from "../usuario/Usuario";
import { Vinilo } from "../anuncio/Vinilo";

export class Mensaje{
    
    constructor(
        
     private id: number,
     private mensaje: string,
     private usuarioid: Usuario,
     private viniloid: Vinilo,
     private receptor: number,
    
     
     ){}
     getId():number {
        return this.id;
    }
    getMensaje():string {
        return this.mensaje;
    }
    getUsuarioid():Usuario {
        return this.usuarioid;
    }
    getViniloid(): Vinilo {
        return this.viniloid;
    }
    getReceptor():number {
        return this.receptor;
    }
   
 
}
