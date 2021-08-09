import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'nestjs-config';
import { AdEntity } from './advertisment.entity';
import { AdvertismentService } from './advertisment.service';
import { AdvertismentController } from './advertisment.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdEntity]), ConfigModule, UserModule],
  providers: [AdvertismentService],
  controllers: [AdvertismentController]
})
export class AdvertismentModule {}
