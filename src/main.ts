/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as serveStatic from 'serve-static';




async function bootstrap() {
  const app = await NestFactory.create(AppModule, {

    cors: {
      origin: ["http://localhost:3000/user", "http://localhost:5173"],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true
    }
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.use(serveStatic('public'));
  
  await app.listen(3000);
}
bootstrap();
