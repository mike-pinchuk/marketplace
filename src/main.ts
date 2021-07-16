import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { expressMiddleware } from 'cls-rtracer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(expressMiddleware())
  await app.listen(3000);
}
bootstrap();
