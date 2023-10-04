/* eslint-disable prettier/prettier */

import { IsEmail, IsString} from "class-validator";

export class RegisterUserDto{

      @IsEmail()
      email: string;

      
      @IsString()
      pass: string;


      @IsString()
      telefono: number;
     
      @IsString()
      nombre: string;

     
      @IsString()
      apellidos: string;

      @IsString()
      abatar: string;

      
      

      

}