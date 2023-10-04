/* eslint-disable prettier/prettier */
import {  IsString} from "class-validator";

export class ViniloDto{

      @IsString()
      id: string;

      @IsString()
      titulo: string;

      
      @IsString()
      contenido: string;


     
      @IsString()
      precio: number;

      @IsString()
      estado: string;

      @IsString()
      tras: string;

      @IsString()
      tipo: string;

      @IsString()
      estilo: string;

      @IsString()
      lugar: string;

      
      

      

}

