import { BadRequestException, Body, Controller, NotFoundException, Get, Post, Req, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateAuthUserDto } from './dto/auth-user.dto';
import { hashGenerator } from '../utils/index';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { RequestWithUser } from '../utils/types';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @Post('signup')
    async signUp(@Body() signUpDto: CreateAuthUserDto) {
        const existUser = await this.userService.findByEmailWithHideField(signUpDto.email);
        if (existUser) {
            throw new BadRequestException('ERROR: USER WITH THIS EMAIL EXIST');
        }
        const user = await this.userService.createUser(signUpDto.name, signUpDto.email, signUpDto.password, signUpDto.phoneNumber, signUpDto.role);
        const refreshToken = await this.authService.createRefreshToken(user.id)
        await this.userService.setCurrentRefreshToken(refreshToken, user.id)
        const accessToken = this.authService.createAccessToken(user.id);
        return {
            accessToken,
            refreshToken
        }
    }

    @Post('signin')
    async signIn(@Body() signUpDto: CreateAuthUserDto) {
        const user = await this.userService.findByEmailWithHideField(signUpDto.email)
        if (!user || user.passwordHash !== hashGenerator(signUpDto.password)) {
            throw new NotFoundException('ERROR: CREDENTIAL IS NOT VALID')
        }
        const refreshToken = await this.authService.createRefreshToken(user.id)
        await this.userService.setCurrentRefreshToken(refreshToken, user.id)
        const accessToken = this.authService.createAccessToken(user.id);
        return {
            user,
            accessToken,
            refreshToken
        }

    }

    @Get('refresh')
    refresh(@Req() req: RequestWithUser) {
        const accessToken = this.authService.createAccessToken(req.user.id)
        return { accessToken }
    }
}
