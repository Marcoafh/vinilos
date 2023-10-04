/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/modelo/usuario/Usuario';
import { ViniloDb } from 'src/modelo/anuncio/viniloDb';
import { MensajeDb } from 'src/modelo/mensaje/mensajeDb';
import { UsuarioMapped } from 'src/mapped/mappedUsuario';
import { UsuarioDb } from 'src/modelo/usuario/usuarioDb';
import { MensajeMapped } from 'src/mapped/mappedMensajes';
import { ViniloMapped } from 'src/mapped/mappedVinilo';
import { Mensaje } from 'src/modelo/mensaje/Mensaje';



@Injectable()
export class MensajeService {

  constructor(
    @InjectRepository(MensajeDb)
    private mensajeRepository: Repository<MensajeDb>,
    @InjectRepository(ViniloDb)
    private viniloRepository: Repository<ViniloDb>,
    @InjectRepository(UsuarioDb)
    private usuarioRepository: Repository<UsuarioDb>,
  ) {}
  
  async create(mensaje: string, id: number, user: Usuario) {//la unica diferencia es el usuario
    try {
      // Buscamos vinilodb
      const viniloDb = await this.viniloRepository.findOne({ where: { id: id },relations: ['owner'] });
  
      if (!viniloDb) {
        throw new Error('No se encontró ningún vinilo con el ID proporcionado');
      }
       
      // Obtenemos usuriodb que es el usuario que está introduciendo el mensaje
      const usuarioDb = UsuarioMapped.toModel(user);
  
      const mensajeDb = new MensajeDb();
      mensajeDb.mensaje = mensaje;
      mensajeDb.viniloid = viniloDb;
      mensajeDb.usuarioid = usuarioDb; // Asignamos al usuario del mensaje
      mensajeDb.receptor = viniloDb.owner.id;
      
  
      await this.mensajeRepository.save(mensajeDb);  // Insertamos en la base de datos
    } catch (error) {
      console.error('Error al crear el mensaje:', error);
      throw new Error('Hubo un problema al crear el mensaje');
    }
  }

  



 

  async save(mensaje: string, id: number, user: Usuario, idr:number) {
    try {
      // Buscamos vinilodb
      const viniloDb = await this.viniloRepository.findOne({ where: { id: id }, relations: ['owner', 'mensajes', 'mensajes.usuarioid'] });

if (!viniloDb) {
  throw new Error('No se encontró ningún vinilo con el ID proporcionado');
}

const usuarioDb = UsuarioMapped.toModel(user);

const mensajeDb = new MensajeDb();

 mensajeDb.mensaje = mensaje;
 mensajeDb.viniloid = viniloDb;
 mensajeDb.usuarioid = usuarioDb;
 mensajeDb.receptor = idr;

await this.mensajeRepository.save(mensajeDb);
    } catch (error) {
      console.error('Error al crear el mensaje:', error);
      throw new Error('Hubo un problema al crear el mensaje');
    }
  }

 

  
  async eliminarMensaje(id: number): Promise<{ borrar: boolean }> {  //boolen para que me respoda si lo a eliminado
        
    const mensajeEliminar = await this.mensajeRepository.findBy({
        id:id,})

    if (!mensajeEliminar) {
        return { borrar: false }; // no se encuntra en vinilo
    }

    await this.mensajeRepository.delete(id);

    return { borrar: true }; // se borra


}


  



  

  async verMensaje(email: string): Promise<{ mensajes: Mensaje[] }> {
    try {
      const usuarioDb = await this.usuarioRepository.findOne({ where: { email } }); // buscamos el usuario por email
  
      if (!usuarioDb) {
        throw new Error(`No se encontró ningún usuario con el correo electrónico`);
      }

      

      const mensajesDb = await this.mensajeRepository.find({
        where: { receptor: usuarioDb.id },
        relations: ['usuarioid', 'viniloid'],
        order: {
          
          id: 'DESC',//ordeno pa ordenar los mensajes
        }

      });
  
      // Crear remitente
      const mensajesMapeados: Mensaje[] = [];
  
      for (const mensajeDb of mensajesDb) {
        const entityUsuario = UsuarioMapped.toEntity(mensajeDb.usuarioid);
        const entityVinilo = ViniloMapped.toEntity(mensajeDb.viniloid, entityUsuario);
        const entityMensaje = MensajeMapped.toEntity(mensajeDb, entityUsuario, entityVinilo);
  
        mensajesMapeados.push(entityMensaje);

        
      }
  
      return { mensajes: mensajesMapeados };
    } catch (error) {
      console.error('Error al obtener los mensajes:', error);
      throw new Error('Hubo un problema al obtener los mensajes');
    }
  }}