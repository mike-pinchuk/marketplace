import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'nestjs-config';
import { AdEntity } from './advertisment.entity';
import { AdvertismentService } from './advertisment.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdEntity]), ConfigModule],
  providers: [AdvertismentService]
})
export class AdvertismentModule {}
