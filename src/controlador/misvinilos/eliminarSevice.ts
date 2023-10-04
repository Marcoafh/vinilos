/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ViniloDb } from "src/modelo/anuncio/viniloDb";
import { Repository } from "typeorm";

@Injectable()
export class EliminarService {

    constructor(
        @InjectRepository(ViniloDb)
        private readonly viniloRepository: Repository<ViniloDb>
    ) {}

    async eliminarVinilo(id: number): Promise<{ borrar: boolean }> {  //boolen para que me respoda si lo a eliminado
        
            const viniloAEliminar = await this.viniloRepository.findBy({
                id:id,})

            if (!viniloAEliminar) {
                return { borrar: false }; // no se encuntra en vinilo
            }

            await this.viniloRepository.delete(id);

            return { borrar: true }; // se borra

       
    }
}




