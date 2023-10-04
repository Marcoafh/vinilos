/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import { Base64 } from 'js-base64';import { Usuario } from 'src/modelo/usuario/Usuario';
import { VerificarUsuario } from 'src/controlador/vinilo/verificarUsuario';
import { Controller, Req, Res, HttpStatus, Body, Post, Get, Param } from '@nestjs/common';
import { MensajeDto } from './mensajeDto';
import { MensajeService } from './mensajeService';
import { RespuestaDto } from './respuestaDto';



@Controller('mensaje')
    export class MensajeController {
        constructor(

            private readonly mensajeService: MensajeService,
            private readonly verificarUsuario: VerificarUsuario,  //uso el VerificarUsuario ya que me ahorro hacer un servicio nuevo
  ) {}

    @Post('')
    async mensajeVinilo(
    @Body() mensajeDto: MensajeDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    
    
       
    const cookiesUsuario: string | undefined = request.cookies['user'];  //miramos las cookie user

    if (!cookiesUsuario) {     //si no existe
      return response.sendStatus(HttpStatus.FORBIDDEN);
    }

    const validacion = JSON.parse(Base64.decode(cookiesUsuario)); // si existe la parseamos en json

    try {
      const user: Usuario = await this.verificarUsuario.execute(   //verificamos con email de las cookies
        validacion['email']
      );
    

            if (!user) { 
               return response.sendStatus(HttpStatus.UNAUTHORIZED);
              }

            const { mensajee , id } = mensajeDto;

      
  
    await this.mensajeService.create(  mensajee , id ,user);

    return response.status(HttpStatus.OK).json({ message: 'mensaje enviado' });

  } catch (error) {
    
    console.error('erro al enviar el mensaje', error);
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR);
  }
}










@Post('respuesta')
async respuestaVinilo(
@Body() respuestaDto: RespuestaDto,
@Req() request: Request,
@Res() response: Response,
) {


   
const cookiesUsuario: string | undefined = request.cookies['user'];  //miramos las cookie user



const validacion = JSON.parse(Base64.decode(cookiesUsuario)); // si existe la parseamos en json


try {
  const user: Usuario = await this.verificarUsuario.execute(   //verificamos con email de las cookies
    validacion['email']
  );


        if (!user) { 
           return response.sendStatus(HttpStatus.UNAUTHORIZED);
          }

        const { mensajee , id , idr} = respuestaDto;

  

await this.mensajeService.save(  mensajee , id , user , idr); //mandamos datos al servicio


return response.status(HttpStatus.OK).json({ message: 'mensaje enviado' });

} catch (error) {

console.error('erro al enviar el mensaje', error);
return response.status(HttpStatus.INTERNAL_SERVER_ERROR);
}
}












@Get('')
async verMensaje(
    
@Req() request: Request,
@Res() response: Response,
) {
    
console.log('Accediendo a mensajes'); 
const cookiesUsuario: string | undefined = request.cookies['user'];  //accedemos a las cookies



if (!cookiesUsuario) {
  return response.sendStatus(HttpStatus.FORBIDDEN);  // si no ai cookies mando error
}

const validacion = JSON.parse(Base64.decode(cookiesUsuario)); //si existen las parsemaos  para acceder a ellas


const mensaje = await this.mensajeService.verMensaje(validacion['email']); //cogemos email



console.log(mensaje)
const mensajesDto = mensaje.mensajes.map((mensaje) => {
  return {
    mensaje: mensaje.getMensaje(),
    id: mensaje.getViniloid().getId(),
    foto: mensaje.getViniloid().getFoto(),
    telefono: mensaje.getUsuarioid().getTelefono(),
    remitente: mensaje.getUsuarioid().getNombre(),
    idr: mensaje.getViniloid().getOwner().getId(),
    idm: mensaje.getId(),

  };
});


  

response.send(mensajesDto);
}















@Get('eliminarmensaje/:idm')
async eliminarMensaje(
  @Param('idm') id: number, 
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

  
  const mensajeEliminado = await this.mensajeService.eliminarMensaje(  id  ); //pasamos el id del vinilo a eliminar

  if (!mensajeEliminado) {
    return response.sendStatus(HttpStatus.NOT_FOUND); // Vinilo no encontrado
  }

  return response.sendStatus(HttpStatus.OK); // Éxito en la eliminación
} catch (error) {
  console.error(error);
  return response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
}
}
}




