/* eslint-disable prettier/prettier */
import { IsEmail, IsString } from "class-validator";
export class SignDto{

    @IsEmail()
    email:string;

    @IsString()
    pass:string;
}
