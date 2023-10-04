/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator';

export class RespuestaDto {
  @IsString()
  mensajee: string;

  @IsNumber()
  id: number;

  @IsNumber()
  idr: number;


}
