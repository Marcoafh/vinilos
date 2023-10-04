/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioDb } from "src/modelo/usuario/usuarioDb";
import { Repository } from "typeorm";
import * as argon2 from "argon2";

@Injectable()
 export class signService{

    constructor(
        @InjectRepository(UsuarioDb)
        private readonly userRepository: Repository<UsuarioDb>
    ){}
 
    async execute(email:string, pass:string): Promise<{papa: boolean; abatar?: string}> {

        
       
        const validacion: UsuarioDb[] = await this.userRepository.findBy({
            email:email,
            
        });

        console.log(validacion[0].pass,pass)
        console.log(validacion[0].abatar)


      const papa = await argon2.verify(validacion[0].pass,pass);
      
    
      return { papa: papa, abatar: validacion[0].abatar };
    }
      
 }

 