import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoEntity } from './photo.entity';


@Module({
  imports: [TypeOrmModule.forFeature([PhotoEntity])],
  providers: []
})
export class PhotoModule {}
