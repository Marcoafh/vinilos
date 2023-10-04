/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator';

export class MensajeDto {
  @IsString()
  mensajee: string;

  @IsNumber()
  id: number;
}
