/* eslint-disable prettier/prettier */
import { Vinilo } from "src/modelo/anuncio/Vinilo";
import { ViniloDb } from "src/modelo/anuncio/viniloDb";

import { Usuario } from "src/modelo/usuario/Usuario";


export class  ViniloMapped{   //mapper de el objeto vinilo para pasar a clase y al reves

     static toEntity(change: ViniloDb,ownerEntity:Usuario,): Vinilo {

        const {id,titulo,contenido,foto,precio,created_at,estado,tras,tipo,estilo,lugar}=change;//meter aqui los emnsajes

        return new Vinilo(id,titulo,contenido,foto,precio,new Date(created_at),estado,tras,tipo,ownerEntity,estilo,lugar,[]);
     
}


static toModel(vinilo: Vinilo): ViniloDb {
   return {
     id: vinilo.getId(),
   titulo: vinilo.getTitulo(),
   contenido: vinilo.getContenido(),
   foto: vinilo.getFoto(),
   precio: vinilo.getPrecio(),
   created_at: vinilo.getCreatedAt().getTime(),
   estado: vinilo.getEstado(),
   tras: vinilo.getTras(),
   tipo: vinilo.getTipo(),
   estilo:  vinilo.getEstilo(),
   lugar: vinilo.getLugar(),
   } as ViniloDb;
 }

}



