import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  app.disable('x-powered-by');
  app.enableCors();
  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
  const config = new DocumentBuilder()
    .setTitle('EGTS')
    .setDescription('The EGTS API description')
    .setVersion('V1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('Egts-api', app, document);
  await app.listen(3000);
}
bootstrap();
