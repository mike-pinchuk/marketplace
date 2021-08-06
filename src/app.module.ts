import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RedisDBModule } from './redis/redis.module';
import { AdvertismentModule } from './advertisment/advertisment.module';
import { PhotoModule } from './photo/photo.module';
import { PurchaseModule } from './purchase/purchase.module';
import { MessageModule } from './message/message.module';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { RoomModule } from './room/room.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService]
    }),
    AuthModule, UserModule, RedisDBModule, AdvertismentModule, PhotoModule, PurchaseModule, MessageModule, RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

