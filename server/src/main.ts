import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prismaClientException/prismaClientException.filter';
import * as cookieParser from 'cookie-parser';
import { urlencoded } from 'express';
import { AllExceptionsFilter } from './common/exceptions/exceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });
  const PORT = process.env.PORT || 4000;
  app.use(cookieParser());

  app.enableCors({
    origin: [process.env.FRONTEND_UR, 'http://localhost:5173'],
    //  origin: true,
    credentials: true,
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.use(urlencoded({ limit: '10mb', parameterLimit: 100000 }));
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new PrismaClientExceptionFilter());

  await app.listen(PORT, () => console.log('Server satrted on ' + PORT));
}
bootstrap();
