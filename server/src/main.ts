import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prismaClientException/prismaClientException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new PrismaClientExceptionFilter());

  await app.listen(3000, () => console.log('Server satrted'));
}
bootstrap();
