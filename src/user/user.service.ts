import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(dto: object) {
        return this.userRepository.save(dto)
    }

    async getUserById(id: number) {
        const user = this.userRepository.findOne(id);
        if (await user === undefined) {
            return `User with id ${id} is not existed`
        } else {
            return user
        }
    }

    async deleteUser(id: number) {
        return this.userRepository.delete(id)
    }

    async updateUser(id: number, body: object) {
        const user = this.userRepository.findOne(id)
        if (await user === undefined) {
            return `User with id ${id} is not existed`
        }
        return this.userRepository.update({ id }, body)
    }
}
