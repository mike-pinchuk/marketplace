import { Param } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { BadRequestException, Req } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthorizedRequest } from 'src/utils/types';
import { AdvertismentService } from './advertisment.service';
import { CreateUpdateAdDto } from './dto/create-update-advertisment.dto';

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
        try {
            const user = await this.userService.getUserById(userId)
            if (!user) {
                throw new BadRequestException('INVALID USER ID')
            }
            return this.adService.getAllUserAds({ userId }, [])
        } catch (error) {
            throw new BadRequestException('SOMETHING WENT WRONG');
        }



    }

    @Patch(':id')
    async updateAd(@Param('id') id: number, @Body() updateDto: CreateUpdateAdDto) {
        try {
            const ad = await this.adService.getOneAd({ id });
            if (!ad) {
                throw new BadRequestException('AD NOT FOUND')
            }
            if ('title' in updateDto) {
                const adTitle = await this.adService.getOneAd({ title: updateDto.title })
                if (adTitle) {
                    throw new BadRequestException('POST WITH THIS TITLE EXIST')
                }
            }
            await this.adService.updateAd(id, updateDto);
            return this.adService.getOneAd({ id })
        } catch (error) {
            throw new BadRequestException('SOMETHING WENT WRONG WHILE UPDATING AD')
        }
    }

    @Post()
    async createNewAd(@Body() createDto: CreateUpdateAdDto, @Req() req: AuthorizedRequest) {
        try {
            const ad = await this.adService.getOneAd({ title: createDto.title })
            if (ad) {
                throw new BadRequestException('ADVERTISMENT WITH THIS TITLE EXIST')
            }

            const savedAd = await this.adService.saveAd({ ...createDto, userId: req.user.id })
            return this.adService.getOneAd({ id: savedAd.id })
        } catch (error) {
            throw new BadRequestException('SOMETHING WENT WRONG')
        }

    }


}
