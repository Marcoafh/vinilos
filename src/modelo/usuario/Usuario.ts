/* eslint-disable prettier/prettier */
import { Vinilo } from "../anuncio/Vinilo";
import { Mensaje } from "../mensaje/Mensaje";

/* eslint-disable prettier/prettier */
export class Usuario{

    constructor(

     private id: number,
     private email: string,
     private pass: string,
     private telefono: number,
     private abatar: string,
     private nombre: string,
     private apellidos: string,
     private vinilos: Vinilo[],
     private mensajes:Mensaje[],
    
    


    ){}

    getId():number {
        return this.id;
    }
    getEmail(): string {
        return this.email;
    }
    getPass(): string {
        return this.pass;
    }
    getTelefono():number {
        return this.telefono;
    }
    getAbatar(): string {
        return this.abatar;
    }
    getNombre(): string {
        return this.nombre;
    }
    getApellidos(): string {
        return this.apellidos;
    }
    getVinilos(): Vinilo[] {
        return this.vinilos
      }

    setVinilos(vinilos: Vinilo[]) {
        this.vinilos= vinilos;
      }
    getMensajes(): Mensaje[] {
        return this.mensajes
      }

    setMensajes(mensajes: Mensaje[]) {
        this.mensajes= mensajes;
      }
   
    
   
    
}