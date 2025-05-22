import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ ATIVE O CORS AQUI:
  app.enableCors({
    origin: 'http://localhost:3050', // ou '*', se estiver só em dev
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('CodeLeap API')
    .setDescription('Task/Post API com Prisma')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
