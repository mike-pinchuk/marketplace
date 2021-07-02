import { Body, Controller, Post } from '@nestjs/common';
import { Role } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async singUp(@Body() name: string, email: string, password: string, phoneNumber: string, role: Role, adId: number) {
        return await this.userService.createUser(name, email, password, phoneNumber, role, adId)
    }

}
