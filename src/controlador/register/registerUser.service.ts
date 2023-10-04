/* eslint-disable prettier/prettier */import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as argon2 from "argon2";
import { Usuario } from "src/modelo/usuario/Usuario";
import { UsuarioDb } from "src/modelo/usuario/usuarioDb";
import { Repository } from "typeorm";



@Injectable()
 export class RegisterUserService{

    constructor(
        @InjectRepository(UsuarioDb)
        private readonly userRepository: Repository<UsuarioDb>
    ){}
 
    async execute(email:string,pass:string,telefono:number,abatar:string,nombre:string,apellidos:string){

        const passHasheada = await argon2.hash(pass)
        console.log(passHasheada);

        const usuario = new Usuario(0,email,passHasheada,telefono,abatar,nombre,apellidos,[],[]);

        const usuarioDb: UsuarioDb = {
        id:0,
        email: usuario.getEmail(),
        pass: usuario.getPass(),
        
        telefono: usuario.getTelefono(),
        abatar: usuario.getAbatar(),
        nombre: usuario.getNombre(),
        apellidos: usuario.getApellidos(),
        vinilos: [],
        mensajes: []
       
 

    
    }
    const existeUsuario = await this.userRepository.findOne({ where: { email } });
    if (existeUsuario) {
      throw new HttpException('Este correo ya esta registrado , intenta loguearte', HttpStatus.CONFLICT);
     } else{
     this.userRepository.save(usuarioDb);
    }
}
}
