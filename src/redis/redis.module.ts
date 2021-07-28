import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisModule } from '@nestjs-modules/ioredis';
import { typedEnv } from '../utils/type-env';


@Module({
  imports: [RedisModule.forRoot({
    config: {
      port: typedEnv.REDIS_PORT,
      host: typedEnv.REDIS_HOST,
    }
  })],
  providers: [RedisService],
  exports: [RedisService]
})
export class RedisDBModule {}
