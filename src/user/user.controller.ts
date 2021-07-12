import { Body, Controller, UseGuards, NotFoundException, Get, Delete, Patch, Param, Request } from '@nestjs/common';
import { CreateAuthUserDto } from '../auth/dto/auth-user.dto';
import { UserService } from './user.service';
import { AuthorizedRequest } from '../utils/types';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('me')
    async getProfile(@Request() req: AuthorizedRequest) {
        try {
            return this.userService.getUserById(req.user.id);
        } catch (error) {
            throw new NotFoundException('PROFILE NOT FOUND');
        }
    }

    @Get(':id')
    async getUser(@Param('id') id: number) {
        try {
            return await this.userService.getUserById(id);
        } catch (error) {
            throw new NotFoundException('USER WITH THIS ID IS NOT EXISTED')
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        try {
            await this.userService.deleteUser(id)
            return `User with ID ${id} was successfully deleted`
        } catch (error) {
            throw new NotFoundException('USER WITH THIS ID IS NOT EXISTED')
        }
    }

    @Patch(':id')
    async updateUser(@Param('id') id: number, @Body() body: CreateAuthUserDto) {
        try {
            return this.userService.updateUser(id, body)
        } catch (error) {
            throw new NotFoundException('USER WITH THIS ID IS NOT EXISTED')
        }
    }

}
