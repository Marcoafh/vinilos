/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vinilo } from 'src/modelo/anuncio/Vinilo';
import { Repository } from 'typeorm';

import { Usuario } from 'src/modelo/usuario/Usuario';
import { ViniloDb } from 'src/modelo/anuncio/viniloDb';
import { UsuarioDb } from 'src/modelo/usuario/usuarioDb';


@Injectable()
export class ViniloService {

  constructor(
    @InjectRepository(ViniloDb)
    private anuncioRepository: Repository<ViniloDb>,
  ) {}

  async create(titulo: string, contenido: string, fotoPath:string ,precio: number, estado:string, tras: string, tipo: string , owner: Usuario, estilo: string, lugar:string,id:string){

   

    const usuarioDb: UsuarioDb ={
      id: owner.getId(),
      email: owner.getEmail(),
      pass: owner.getPass(),
      telefono: owner.getTelefono(),
      abatar: owner.getAbatar(),
      nombre: owner.getNombre(),
      apellidos: owner.getApellidos(),
      vinilos:[],
      mensajes:[]
  
     }

   

    
  const  vinilosDb:ViniloDb[] = owner.getVinilos().map((vinilo: Vinilo)=>{
    return{
      id: vinilo.getId(),
      titulo: vinilo.getTitulo(),
      contenido: vinilo.getContenido(),
      foto: vinilo.getFoto(),
      precio: vinilo.getPrecio(),
      created_at: vinilo.getCreatedAt().getTime(),
      estado: vinilo.getEstado(),
      tras: vinilo.getTras(),
      tipo: vinilo.getTipo(),
      owner: usuarioDb,
      estilo: vinilo.getEstilo(),
      lugar: vinilo.getLugar(),
    } as ViniloDb
  });
  
  usuarioDb.vinilos = vinilosDb;

  const viniloDb: ViniloDb =  {
    id: id ? parseInt(id) : null,  //lo parsemaos a int para la base de datos
    titulo: titulo ,
    contenido: contenido,
    foto: fotoPath,
    precio : precio,
    
    estado : estado,
    tras : tras,
    tipo : tipo,
    owner: usuarioDb,
    estilo: estilo,
    lugar: lugar,
  }as ViniloDb;
  
   
console.log(viniloDb.id)

    
if (viniloDb.id !== null && !isNaN(viniloDb.id)) {  // si el id tiene valor y no es NaN
  await this.anuncioRepository.update(viniloDb.id, viniloDb);
} else {
  viniloDb.id = null;
  await this.anuncioRepository.save(viniloDb); //guardamos si id es null o NaN
}

}
}