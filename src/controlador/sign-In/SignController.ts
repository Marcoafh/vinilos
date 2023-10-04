/* eslint-disable prettier/prettier */
import { Body, Controller, HttpException, HttpStatus, Post, Req, Res } from "@nestjs/common"; 
import { signService } from "./signService";
import { Response } from 'express';
import { SignDto } from "./SignDto";
import { Base64 } from 'js-base64';




@Controller('sign')
export class SignController {
    constructor(private readonly signrService: signService) {}

    @Post()
    async loginUser(@Res() response: Response, @Req() request: Request, @Body() data: SignDto) {
        const { email, pass } = data;
        console.log(data);
        const { papa, abatar } = await this.signrService.execute(email, pass);
        console.log(papa);
        console.log(abatar);

        if (!papa) {
            throw new HttpException("contraseña o correo mal", HttpStatus.FOUND);
        } else {
            const validation = { email: email, abatar: abatar, isValid: true };

            response.cookie('user', Base64.encodeURL(JSON.stringify(validation)), {
                domain: "localhost",
                maxAge: 900000, // 15 min
            }).sendStatus(HttpStatus.NO_CONTENT);
        }
    }
}

