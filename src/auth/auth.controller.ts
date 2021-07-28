import { BadRequestException, Body, Controller, NotFoundException, ForbiddenException, Get, Post, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateAuthUserDto } from './dto/auth-user.dto';
import { hashGenerator } from 'src/utils';
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { RequestWithUser } from '../utils/types';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @Post('signup')
    async signUp(@Body() signUpDto: CreateAuthUserDto, @Req() request: RequestWithUser) {
        try {
            const existUser = await this.userService.findByEmailWithHideField(signUpDto.email);

        if (existUser !== undefined) {
            throw new BadRequestException('ERROR: USER WITH THIS EMAIL EXIST');
        }
        const user = await this.userService.createUser(signUpDto.name, signUpDto.email, signUpDto.password, signUpDto.phoneNumber, signUpDto.role);
        const refreshToken = await this.authService.createRefreshToken(user.id)
        await this.userService.setCurrentRefreshToken(refreshToken, user.id)
        return this.authService.createAccessToken(user.id);
        const { cookie }: any = refreshToken;
        request.res?.setHeader('Set-Cookie', [cookie])
        } catch (error) {
            throw new BadRequestException('ERROR: USER WITH THIS EMAIL OR PHONE NUMBER EXIST')
        }
       
        
    }

    @Post('signin')
    async signIn(@Body() signUpDto: CreateAuthUserDto, @Req() request: RequestWithUser) {
        try {
            const user = await this.userService.findByEmailWithHideField(signUpDto.email)
            if (!user || user.passwordHash !== hashGenerator(signUpDto.password)) {
                throw new NotFoundException('ERROR: CREDENTIAL IS NOT VALID')
            }
            const refreshToken = await this.authService.createRefreshToken(user.id)
            await this.userService.setCurrentRefreshToken(refreshToken, user.id)
            const accessToken = this.authService.createAccessToken(user.id);
            const { cookie }: any = refreshToken;
            request.res?.setHeader('Set-Cookie', [cookie])
            return {
                user, 
                accessToken,
            }
        } catch (error) {
            throw new Error(error)
        }

    }

    @UseGuards(JwtRefreshAuthGuard)
    @Get('refresh')
    refresh(@Req() req: RequestWithUser) {
        try {
            const accessToken = this.authService.createAccessToken(req.user.id)
            return {
                accessToken 
            }
        } catch (error) {
            throw new ForbiddenException(error.message)
        }
      
    }

    @UseGuards(JwtAuthGuard)
    @Post('signout')
    async signOut(@Req() req: RequestWithUser) {
        try {
            await this.userService.removeRefreshToken(req.user.id);
            req.res?.setHeader('Set-Cookie', this.authService.getCookiesForLogOut())
            return `You was successfully logged out`
        } catch (error) {
            throw new Error(error)
        }
        
    }
}
