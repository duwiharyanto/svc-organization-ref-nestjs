import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const options = new DocumentBuilder()
    .setTitle('API UIIOrganisasi')
    .setDescription('Dokumentasi API master data atau master referensi UIIOrganisasi')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
  
  const port = config.get('PORT') || 3000;
  await app.listen(port, () => {
    Logger.log(`Running in ${config.get('NODE_ENV')} mode on ${config.get('PORT')} port`);
  });
}
bootstrap();
