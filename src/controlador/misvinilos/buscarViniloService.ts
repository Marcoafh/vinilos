/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioMapped } from "src/mapped/mappedUsuario";
import { ViniloMapped } from "src/mapped/mappedVinilo";
import { Vinilo } from "src/modelo/anuncio/Vinilo";
import { ViniloDb } from "src/modelo/anuncio/viniloDb";
import { UsuarioDb } from "src/modelo/usuario/usuarioDb";
import { Repository } from "typeorm";

@Injectable()
export class BuscarViniloService {

    constructor(
        @InjectRepository(ViniloDb)
        private readonly viniloRepository: Repository<ViniloDb>,
        @InjectRepository(UsuarioDb)
        private readonly usuarioRepository: Repository<UsuarioDb>
    ) {}

    async create(email: string): Promise<Vinilo[]> {

        const usuario = await this.usuarioRepository.findOne({ where: { email } });

        const vinilosDb = await this.viniloRepository.find({ where: { owner: usuario }, relations: { owner: true } });

        const vinilosMapeados = vinilosDb.map((viniloDb) => {
            const entityVinilo = UsuarioMapped.toEntity(viniloDb.owner);
            const entityV = ViniloMapped.toEntity(viniloDb, entityVinilo);
            return entityV;
        });

        return vinilosMapeados;
    }
}


 

   




