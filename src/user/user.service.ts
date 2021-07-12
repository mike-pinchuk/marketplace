import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { hashGenerator } from '../utils/index';
import { Role } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(name: string, email: string, password: string, phoneNumber: string, role: Role) {
        return this.userRepository.save({ name, email, passwordHash: hashGenerator(password), phoneNumber, role })
    }

    async getUserById(id: number): Promise<User | string | undefined> {
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

    async findByEmailWithHideField(email: string): Promise<User | undefined> {
        const result = await this.userRepository.createQueryBuilder('user')
          .select()
          .addSelect('user.passwordHash')
          .where('user.email = :email', { email })
          .getOne();
        return result;
    }
}
