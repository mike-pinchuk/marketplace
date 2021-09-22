import { Body, Controller, Get, Post, Patch, Param, BadRequestException, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthorizedRequest } from 'src/utils/types';
import { AdvertismentService } from './advertisment.service';
import { CreateAdDto } from './dto/create-advertisment.dto';
import { UpdateAdDto } from './dto/update-advertisment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('advertisment')
export class AdvertismentController {
    constructor(private readonly adService: AdvertismentService, private readonly userService: UserService) { }
    @Get('/all')
    async getAllAd() {
        try {
            return this.adService.getAllAds()
        } catch (error) {
            throw new BadRequestException('SOMETHING WENT WRONG');
        }

    }

    @Get(':id')
    async getOneAd(id: number) {
        try {
            return this.adService.getOneAd({ id })
        } catch (error) {
            throw new BadRequestException('ADVERTISMENT WITH THIS ID DOES NOT EXIST')
        }

    }

    @Get('/user/:id')
    async findAllUserAds(@Param('id') userId: number) {
        const user = await this.userService.getUserById(userId)
        if (!user) {
            throw new BadRequestException('INVALID USER ID')
        }
        return this.adService.getAllUserAds({ userId }, [])
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateAd(@Param('id') id: number, @Body() updateDto: UpdateAdDto) {
        const ad = await this.adService.getOneAd({ id });
        if (!ad) {
            throw new BadRequestException('AD NOT FOUND')
        }
        await this.adService.updateAd(id, updateDto);
        return this.adService.getOneAd({ id })
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createNewAd(@Body() createDto: CreateAdDto, @Req() req: AuthorizedRequest) {
        const ad = await this.adService.getOneAd({ title: createDto.title })
        if (ad) {
            throw new BadRequestException('ADVERTISMENT WITH THIS TITLE EXIST')
        }
        const savedAd = await this.adService.saveAd({ ...createDto, userId: req.user.id })
        return this.adService.getOneAd({ id: savedAd.id })
    }
}
