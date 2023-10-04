/* eslint-disable prettier/prettier */
import { Mensaje } from "../mensaje/Mensaje";
import { Usuario } from "../usuario/Usuario";



export class Vinilo{
    constructor(

     private id: number,
     private titulo: string,
     private contenido: string,
     private foto: string,
     private precio: number,
     private createdAt: Date,
     private estado: string,
     private tras: string,
     private tipo: string,
     private owner: Usuario,
     private estilo: string,
     private lugar: string,
     private mensajes:Mensaje[]
    


    ){}
    getId():number {
        return this.id;
    }
    getTitulo():string {
        return this.titulo;
    }
    getContenido(): string {
        return this.contenido;
    }
    getFoto(): string {
        return this.foto;
    }
    getPrecio():number {
        return this.precio;
    }
    getCreatedAt():Date {
        return this.createdAt;
    }
    getEstado(): string {
        return this.estado;
    }
    getTras(): string {
        return this.tras;
    }
    getTipo(): string {
        return this.tipo;
    }
    getOwner():Usuario {
        return this.owner;
    }
    getEstilo():string {
        return this.estilo;
    }
    getLugar(): string {
        return this.lugar;
    
    }
    getMensajes(): Mensaje[] {
        return this.mensajes
      }

    setMensajes(mensajes: Mensaje[]) {
        this.mensajes= mensajes;
      }
    
}

  
