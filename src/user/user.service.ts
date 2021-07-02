import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from './user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(name: string, email: string, password: string, phoneNumber: string, role: Role, adId: number) {
        return this.userRepository.save({ name, email, password, phoneNumber, role, adId })
    }
}
