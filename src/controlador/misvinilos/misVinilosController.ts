/* eslint-disable prettier/prettier */
import { Request, Response, } from 'express';
import { Base64 } from 'js-base64';
import { Controller, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { BuscarViniloService } from 'src/controlador/misvinilos/buscarViniloService';


@Controller('aqui')
    export class misViniloController {
        constructor(
           
            private readonly buscarViniloService: BuscarViniloService 

  ) {}

    @Get('')
    async verVinilos(
        
    @Req() request: Request,
    @Res() response: Response,
  ) {
    
  
    console.log('Accediendo a verVinilos'); 
    const cookiesUsuario: string | undefined = request.cookies['user'];  //accedemos a las cookies
    
    
  
    if (!cookiesUsuario) {
      return response.sendStatus(HttpStatus.FORBIDDEN);  // si no ai cookies mando error
    }
  
    const validacion = JSON.parse(Base64.decode(cookiesUsuario)); //si existen las parsemaos  para acceder a ellas
    

    const vinilos = await this.buscarViniloService.create(validacion['email']); //cogemos email
   
   
    try {
      

      const vinilosDto =vinilos.map((vinilo) =>{
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
   console.log(vinilosDto)
    } catch (error) {

      
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR);  //mandamos error si no se a podido mandar en usuario0.
    }
  }
}


 
 
 