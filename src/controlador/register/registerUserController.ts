/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserDto } from "./registerUser.dto";
import { RegisterUserService } from "./registerUser.service";


@Controller('user')
export class RegisterUserController {

constructor(private readonly registerUserService:RegisterUserService ) {}

@Post()
async registerUser(@Body() data: RegisterUserDto) {
  const { email, pass, telefono, abatar,  nombre,  apellidos} = data;

  await this.registerUserService.execute(email, pass, telefono, abatar,nombre,apellidos);
}
}


