/* eslint-disable prettier/prettier */
import { Usuario } from "src/modelo/usuario/Usuario";
import { UsuarioDb } from "src/modelo/usuario/usuarioDb";

export class  UsuarioMapped{   //mapper de el objeto usuario para pasar a clase y al reves

     static toEntity(change: UsuarioDb): Usuario {

        const {id,email,pass,telefono,abatar,nombre,apellidos}=change;

        return new Usuario(id,email,pass,telefono,abatar,nombre,apellidos,[],[]);
     }

     static toModel(usuario:Usuario):UsuarioDb{
        return{
            id:usuario.getId(),
            email:usuario.getEmail(),
            pass:usuario.getPass(),
            telefono:usuario.getTelefono(),
            abatar:usuario.getAbatar(),
            nombre:usuario.getNombre(),
            apellidos:usuario.getApellidos(),

        }as UsuarioDb
     }
}

  
