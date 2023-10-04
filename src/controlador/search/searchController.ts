/* eslint-disable prettier/prettier */
import { Controller, Get, HttpStatus, Query, Res } from "@nestjs/common"; 

import { Response } from 'express';

import { SearchService } from "./searchService";






@Controller('buscador')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(
    @Res() response: Response,
    @Query('buscar') buscador: string,
    @Query('estilo') estilo: string,
    @Query('lugar') lugar: string,
  ) {
   
   
    const todos = await this.searchService.execute(buscador, estilo, lugar);

       try {
      

        const vinilosDto =todos.map((vinilo) =>{
          return{
            
            id: vinilo.getId(),
            titulo: vinilo.getTitulo(),
            contenido: vinilo.getContenido(),
            foto: vinilo.getFoto(),
            precio: vinilo.getPrecio(),
            createdAt: vinilo.getCreatedAt(),
            estado: vinilo.getEstado(),
            tras: vinilo.getTras(),
            tipo: vinilo.getTipo(),
            owner: vinilo.getOwner(),
            estilo: vinilo.getEstilo(),
            lugar: vinilo.getLugar(),
  
          };
        });

        response.send(vinilosDto)
    
      } catch (error) {
  
        
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR);  //mandamos error si no se a podido mandar en usuario0.
      }
    }
  }


       


        




   
   
 