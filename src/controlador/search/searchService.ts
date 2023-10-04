/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioMapped } from "src/mapped/mappedUsuario";
import { ViniloMapped } from "src/mapped/mappedVinilo";
import { Vinilo } from "src/modelo/anuncio/Vinilo";
import { ViniloDb } from "src/modelo/anuncio/viniloDb";
import { Repository } from "typeorm";

@Injectable()
export class SearchService {
    constructor(
        @InjectRepository(ViniloDb)
        private readonly viniloRepository: Repository<ViniloDb>
    ) {}

    async execute(buscador: string, estilo: string, lugar: string): Promise<Vinilo[]> {

        console.log(buscador, estilo, lugar);
    
        try {

            let query = this.viniloRepository.createQueryBuilder("vinilo")  //llamamos al repositorio

            .leftJoinAndSelect("vinilo.owner", "owner")                  //para poder acceder a la propiedad owner con su relacion con el usuario
            .where("vinilo.estilo = :estilo", { estilo: estilo })


                     if (buscador === '') { // si no buscamos nada en concreto mandamos vacio
            }else{

             query = query.andWhere("vinilo.titulo = :titulo", { titulo: buscador });
            }

                    if (lugar === "Espana") {    //si es espana ya no hacemos buscada especifica de lugar
           
        } else {
            query = query.andWhere("vinilo.lugar = :lugar", { lugar: lugar });
        }
                 query = query.orderBy("vinilo.created_at", "ASC"); // para ordenar por orden de  mas nuevo a mas viejo
        
             
            const vinilosDb = await query.getMany();   //ejecutamos con getmany y guardamos en variable vinilos
    
            if (vinilosDb.length === 0) {
                throw new Error("No se han encontrado resultados");
            }

            
            const vinilosMapeados = vinilosDb.map((viniloDb) => {
                const entityVinilo = UsuarioMapped.toEntity(viniloDb.owner);
                const entityV = ViniloMapped.toEntity(viniloDb, entityVinilo);
                return entityV;
            });
    
            return vinilosMapeados;
        

    
        } catch (error) {
            console.error("Error en la búsqueda:", error);
            throw new Error("Hubo un problema al buscar los vinilos");
        }
    }}