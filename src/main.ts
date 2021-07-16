import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { expressMiddleware } from 'cls-rtracer';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet())
  app.use(expressMiddleware())
  await app.listen(3000);
}
bootstrap();



