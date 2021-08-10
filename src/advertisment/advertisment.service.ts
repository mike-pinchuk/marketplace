import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdEntity } from './advertisment.entity';

@Injectable()
export class AdvertismentService {
    constructor(@InjectRepository(AdEntity) private adRepository: Repository<AdEntity> ) {}
    
    async getAllAds() {
        return await this.adRepository.find()
    }

    async getOneAd(findCriteria:  Partial<Pick<AdEntity, 'id' | 'title'>>, relations = ['user']) {
        return await this.adRepository.findOne(findCriteria, { relations });
    }

    async saveAd(AdDto: Pick<AdEntity, 'title' | 'description' | 'price' | 'userId'>) {
        return await this.adRepository.save(AdDto)
    }

    async updateAd(id: number, ad: Partial<Omit<AdEntity, 'id'>>): Promise<void> {
        await this.adRepository.update({ id }, ad)
    }

    async getAllUserAds(findCriteria: Partial<Pick<AdEntity, 'userId'>> = {}, relations = ['user']) {
        const [items, total] = await this.adRepository.findAndCount({
            where: findCriteria,
            relations,
        });

        return {
            items,
            total
        };

    }
}
