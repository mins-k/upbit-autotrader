import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Upbit AutoTrader (Portfolio)')
    .setDescription('paper/live 모드 자동매매 백엔드 API')
    .setVersion('1.0.0')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 8000);
  console.log(`🚀 API on http://localhost:${process.env.PORT || 8000}`);
  console.log(`📘 Swagger http://localhost:${process.env.PORT || 8000}/docs`);
}
bootstrap();