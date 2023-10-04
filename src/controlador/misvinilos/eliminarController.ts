/* eslint-disable prettier/prettier */
import { Request, Response, } from 'express';
import { Base64 } from 'js-base64';import { Usuario } from 'src/modelo/usuario/Usuario';
import { VerificarUsuario } from 'src/controlador/vinilo/verificarUsuario';
import { Controller, Req, Res, HttpStatus, Param, Get } from '@nestjs/common';

import { EliminarService } from './eliminarSevice';

@Controller('')
    export class EliminarController {
        constructor(

            private readonly eliminarService: EliminarService,
            private readonly verificarUsuario: VerificarUsuario, 
  ) {}

  @Get('eliminarvinilo/:id')
  async eliminarMensaje(
    @Param('id') id: number, 
    @Req() request: Request,
    @Res() response: Response,
  ) {
    
  
       
    const cookiesUsuario: string | undefined = request.cookies['user'];

    if (!cookiesUsuario) {
      return response.sendStatus(HttpStatus.FORBIDDEN);
    }

    const validacion = JSON.parse(Base64.decode(cookiesUsuario));

    try {
      const user: Usuario = await this.verificarUsuario.execute(
        validacion['email']
      );

      if (!user) {
        return response.sendStatus(HttpStatus.UNAUTHORIZED);
      }

      
      const viniloEliminado = await this.eliminarService.eliminarVinilo( id  ); //pasamos el id del vinilo a eliminar

      if (!viniloEliminado) {
        return response.sendStatus(HttpStatus.NOT_FOUND); // Vinilo no encontrado
      }

      return response.sendStatus(HttpStatus.OK); // Éxito en la eliminación
    } catch (error) {
      console.error(error);
      return response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}