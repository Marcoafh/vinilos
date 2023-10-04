/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UploadedFile, UseInterceptors, HttpStatus, Req, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';


import { ViniloService } from './viniloService';
import { ViniloDto } from './viniloDto';
import { Request, Response, } from 'express';
import { Base64 } from 'js-base64';

import { Usuario } from 'src/modelo/usuario/Usuario';
import { VerificarUsuario } from './verificarUsuario';




@Controller('an')
export class ViniloController {
 
  constructor(
 
    private readonly viniloService: ViniloService,
    private readonly verificarUsuario: VerificarUsuario,
    
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('foto', {
    limits: { fileSize: 10240 * 10240 * 10 }, // 10 MB tamaño foto
    fileFilter: (req, file, callback) => {
      const allowedExtensions = ['.jpg', '.jpeg', '.png']; //campos permitidos
      const extname = path.extname(file.originalname).toLowerCase();
      if (!allowedExtensions.includes(extname)) {
        return callback(new Error('Solo se permiten archivos de imagen (jpg, jpeg, png)'), false);
      }
      callback(null, true);
    },
  }))
  async createVinilos(
    @Body() viniloDto: ViniloDto,
    @UploadedFile() foto: Express.Multer.File,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const cookiesUsuario: string | undefined = request.cookies['user'];
    console.log(request.cookies['user']);
    console.log(foto);
  
    if (!cookiesUsuario) {
      return response.sendStatus(HttpStatus.FORBIDDEN);  // si no existen cookies
    }
  
    const validacion = JSON.parse(Base64.decode(cookiesUsuario));  //decodeo en base64
    const user: Usuario = await this.verificarUsuario.execute(validacion['email']);  //verifico con el email de las cookies
  
  
    const { id,titulo, contenido, precio, estado, tras, tipo,estilo,lugar } = viniloDto;
    console.log(viniloDto);
  
    // Verificar si la imagen se ha cargado correctamente
    if (!foto || !foto.path) {
      console.error('La imagen no se ha cargado correctamente.');
      return response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  console.log(id)


  
    try {
      await this.viniloService.create(titulo, contenido, foto.path, precio, estado, tras, tipo, user, estilo, lugar, id);
      return response.status(HttpStatus.OK).json({ message: 'Anuncio creado exitosamente' });
    } catch (error) {
      console.error('Error al crear el anuncio:', error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
 
  }}
  
