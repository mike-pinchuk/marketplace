import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typedEnv } from './utils/type-env';
import { AuthModule } from './auth/auth.module';
import { RedisDBModule } from './redis/redis.module';
import { AdvertismentModule } from './advertisment/advertisment.module';
import { PhotoModule } from './photo/photo.module';
import { PurchaseModule } from './purchase/purchase.module';
import { MessageModule } from './message/message.module';


@Module({
  imports: [TypeOrmModule.forRoot({
      type: "postgres",
      host: typedEnv.DB_HOST,
      port: typedEnv.DB_PORT,
      username: typedEnv.DB_USERNAME,
      password: typedEnv.DB_PASSWORD,
      database: typedEnv.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule, UserModule, RedisDBModule, AdvertismentModule, PhotoModule, PurchaseModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

