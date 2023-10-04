/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vinilo } from 'src/modelo/anuncio/Vinilo';
import { ViniloDb } from 'src/modelo/anuncio/viniloDb';
import { Mensaje } from 'src/modelo/mensaje/Mensaje';
import { MensajeDb } from 'src/modelo/mensaje/mensajeDb';
import { Usuario } from 'src/modelo/usuario/Usuario';
import { UsuarioDb } from 'src/modelo/usuario/usuarioDb';
import { Repository } from 'typeorm';



@Injectable()
export class VerificarUsuario {
  constructor(
    @InjectRepository(UsuarioDb)
    private readonly userRepository: Repository<UsuarioDb>,
  ) {}




  async execute(email: string): Promise<Usuario> {
    const usuarioDb: UsuarioDb = await this.userRepository.findOne({  where: { email: email }, relations: ['vinilos','mensajes'],});

  

    const { id, pass, telefono, abatar, nombre, apellidos, vinilos ,mensajes } = usuarioDb;

    const vinilosModelo: Vinilo[] = vinilos
      ? vinilos.map((viniloDb: ViniloDb) => {
          const { id, titulo, contenido, foto, precio, created_at, estado, tras, tipo ,estilo,lugar,} = viniloDb;
          return new Vinilo(
            id,
            titulo,
            contenido,
            foto,
            precio,
            new Date(created_at),
            estado,
            tras,
            tipo,
            null,
            estilo,
            lugar,
            [],
            
          );
        })
      : [];

      const mensajesModelo: Mensaje[] = mensajes
      ? mensajes.map((mensajeDb: MensajeDb) => {
          const { id, mensaje ,receptor} = mensajeDb;
        
          return new Mensaje(
            id, 
            mensaje,
            null, //les pongo null por que no me hacen falta stos datos
            null,
            receptor,
          )
        })
      : [];
    

    const user = new Usuario(id, email, pass, telefono, abatar, nombre, apellidos, vinilosModelo, mensajesModelo);

    return user;
  
      }}