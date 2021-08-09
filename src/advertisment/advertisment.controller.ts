import { BadRequestException, Req } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthorizedRequest } from 'src/utils/types';
import { AdvertismentService } from './advertisment.service';
import { CreateUpdateAdDto } from './dto/create-update-advertisment.dto';

@Controller('advertisment')
export class AdvertismentController {
    constructor(private readonly adService: AdvertismentService) {}
    @Get('/all')
    async getAllAd() {
        try {
            return this.adService.getAllAd()
        } catch (error) {
            throw new BadRequestException('SOMETHING WENT WRONG');
        }
        
    }

    @Get(':id')
    async getOneAd(id: number) {
        try {
            return this.adService.getOneAd({id})
        } catch (error) {
            throw new BadRequestException('ADVERTISMENT WITH THIS ID DOES NOT EXIST')
        }
        
    }

    @Post()
    async createNewAd(@Body() createDto: CreateUpdateAdDto, @Req() req: AuthorizedRequest) {
        try {
            const ad = await this.adService.getOneAd({title: createDto.title})
        if (ad) {
            throw new BadRequestException('ADVERTISMENT WITH THIS TITLE EXIST')
        }

        const savedAd = await this.adService.saveAd({...createDto, userId: req.user.id})
        return this.adService.getOneAd({id: savedAd.id})
        } catch (error) {
            throw new BadRequestException('SOMETHING WENT WRONG')
        }
        
    }

    
}
