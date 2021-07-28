import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class RedisService {
    constructor(@InjectRedis() private redis: Redis) {}

    async setTokenToRedis(key: string, value: string) {
        await this.redis.set(key, value, 'EX', 604800);
    }

    async getTokenFromRedis(key: string) {
        return this.redis.get(key)
    }


}
