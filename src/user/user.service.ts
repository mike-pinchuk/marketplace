import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { hashGenerator } from '../utils/index';
import { Role } from './user.entity';
import * as crypto from 'crypto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>, private readonly redisService: RedisService) { }

    async createUser(name: string, email: string, password: string, phoneNumber: string, role: Role) {
        return this.userRepository.save({ name, email, passwordHash: hashGenerator(password), phoneNumber, role })
    }

    async getUserById(id: number): Promise<UserEntity | string | undefined> {
        const user = this.userRepository.findOne(id);
        if (await user === undefined) {
            return `User with id ${id} is not existed`
        } else {
            return user;
        }
    }

    async deleteUser(id: number) {
        return this.userRepository.delete(id)
    }

    async updateUser(id: number, body: object): Promise<string | object> {
        const user = this.userRepository.findOne(id)
        if (await user === undefined) {
            return `User with id ${id} is not existed`
        }
        return this.userRepository.update({ id }, body)
    }

    async findByEmailWithHideField(email: string): Promise<UserEntity | undefined> {
        const result = await this.userRepository.createQueryBuilder('user')
          .select()
          .addSelect('user.passwordHash')
          .where('user.email = :email', { email })
          .getOne();
        return result;
    }

    async setCurrentRefreshToken(refreshToken: object, userId: number) {
        const { token }: any = refreshToken;
        await this.redisService.setTokenToRedis(userId.toString(), hashGenerator(token))
    }

    async getUserIfRefreshTokenMatches(refreshTokenFromCookie: string | undefined, userId: number) {
        const user = await this.getUserById(userId);
        const redis: string | null = await this.redisService.getTokenFromRedis(userId.toString())
        if(redis === null) {
            return 'WRONG CREDENTIALS'
        }
        if(!refreshTokenFromCookie) {
            return `Credential was wrong`
        }
        const hashedRefreshTokenFromCookie: string = hashGenerator(refreshTokenFromCookie)
        const isRefreshTokenMatching = await crypto.timingSafeEqual(Buffer.from(hashedRefreshTokenFromCookie), Buffer.from(redis))
        
        if(!isRefreshTokenMatching) {
            return user;
        }
        return `Credential was wrong`
    }

}
