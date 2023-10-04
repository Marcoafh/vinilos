/* eslint-disable prettier/prettier */
import { Vinilo } from "src/modelo/anuncio/Vinilo";
import { Mensaje } from "src/modelo/mensaje/Mensaje";
import { MensajeDb } from "src/modelo/mensaje/mensajeDb";
import { Usuario } from "src/modelo/usuario/Usuario";


export class  MensajeMapped{   //cojo mensajedb y retorno una clase mensaje

     static toEntity(change: MensajeDb,usuarioidEntity:Usuario,viniloidEntity:Vinilo): Mensaje {
    

        const {id,mensaje,receptor}=change;//meter aqui los mensajes

    return new Mensaje(id,mensaje,usuarioidEntity,viniloidEntity,receptor);
     
}




static toModel(mensaje: Mensaje): MensajeDb {  //cojo mensaje rtomo mensajedb
   return {
     id: mensaje.getId(),
     mensaje: mensaje.getMensaje(),
 
   } as MensajeDb;
 }

}