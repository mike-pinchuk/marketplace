import { BadRequestException, Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateAuthUserDto } from './dto/auth-user.dto';
import { hashGenerator } from 'src/utils';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @Post('signup')
    async signUp(@Body() signUpDto: CreateAuthUserDto) {
        const existUser = await this.userService.findByEmailWithHideField(signUpDto.email);
        
        if (existUser !== undefined) {
            throw new BadRequestException('ERROR: USER WITH THIS EMAIL EXIST');
        }
        const user = await this.userService.createUser(signUpDto.name, signUpDto.email, signUpDto.password, signUpDto.phoneNumber, signUpDto.role);
        
        return this.authService.createToken(user.id);
    }

    @Post('signin')
    async signIn(@Body() signUpDto: CreateAuthUserDto) {
        try {
            const user = await this.userService.findByEmailWithHideField(signUpDto.email)
            if (!user || user.passwordHash !== hashGenerator(signUpDto.password)) {
                throw new NotFoundException('ERROR: CREDENTIAL IS NOT VALID')
            }
        } catch (error) {
            throw new Error(error)
        }
       
    }
}
