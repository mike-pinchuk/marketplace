import { Body, Controller, BadRequestException, NotFoundException, Post, Get, Delete, Patch, Param } from '@nestjs/common';
// import { Role } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async signUp(@Body() body: object) {
        try {
            return await this.userService.createUser(body)
        } catch (error) {
            throw new BadRequestException('USER WITH THIS EMAIL OR PHONE NUMBER HAS ALREADY EXISTED')
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
    async updateUser(@Param('id') id: number, @Body() body: object) {
        try {
            return this.userService.updateUser(id, body)
        } catch (error) {
            throw new NotFoundException('USER WITH THIS ID IS NOT EXISTED')
        }
    }

}
