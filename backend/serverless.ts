import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { configure as serverlessExpress } from '@codegenie/serverless-express';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('CookUnity API')
      .setDescription('CookUnity API description')
      .setVersion('0.1')
      .build();

    const document = SwaggerModule.createDocument(nestApp, config);

    SwaggerModule.setup('api', nestApp, document);
    nestApp.enableCors();
    await nestApp.init();
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};
