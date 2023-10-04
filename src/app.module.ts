/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioDb } from './modelo/usuario/usuarioDb';
import { ViniloDb } from './modelo/anuncio/viniloDb';

import { AppController } from './app.controller';
import { RegisterUserService } from './controlador/register/registerUser.service';
import { RegisterUserController } from './controlador/register/registerUserController';
import { signService } from './controlador/sign-In/signService';
import { SignController } from './controlador/sign-In/SignController';
import { ViniloController } from './controlador/vinilo/viniloController';
import { ViniloService } from './controlador/vinilo/viniloService';
import { VerificarUsuario } from './controlador/vinilo/verificarUsuario';
import { SearchController } from './controlador/search/searchController';
import { SearchService } from './controlador/search/searchService';
import { misViniloController } from './controlador/misvinilos/misVinilosController';
import { EliminarController } from './controlador/misvinilos/eliminarController';
import { EliminarService } from './controlador/misvinilos/eliminarSevice';
import { MensajeController } from './controlador/mensajes/mensajeController';
import { MensajeService } from './controlador/mensajes/mensajeService';
import { MensajeDb } from './modelo/mensaje/mensajeDb';
import { BuscarViniloService} from './controlador/misvinilos/buscarViniloService';


@Module({
  imports: [
    MulterModule.register({
      dest: 'C:\\Users\\marco\\OneDrive\\Escritorio\\finalmaster\\proyectofinal-backend\\public',
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'intervinilo',
      entities: [UsuarioDb, ViniloDb,MensajeDb],
    }),
    TypeOrmModule.forFeature([UsuarioDb, ViniloDb,MensajeDb]),
  ],
  controllers: [
    AppController,
    RegisterUserController,
    SignController,
    ViniloController,
    SearchController,
    misViniloController,
    EliminarController,
    MensajeController,
    
  ],
  providers: [
    RegisterUserService,
    signService,
    ViniloService,
    VerificarUsuario,
    SearchService,
    EliminarService,
    MensajeService,
    BuscarViniloService
   
  ],
})
export class AppModule {}
