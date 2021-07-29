import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdEntity } from './advertisment.entity';
import { AdvertismentService } from './advertisment.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdEntity])],
  providers: [AdvertismentService]
})
export class AdvertismentModule {}
