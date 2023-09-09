import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  // Enable body parsing middleware for JSON data
  app.use(express.json());
  await app.listen(3000);
  console.log('server running on port 3000')
}
bootstrap();
