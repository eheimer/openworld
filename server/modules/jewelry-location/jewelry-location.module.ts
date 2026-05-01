import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JewelryLocation } from '../../entities/jewelry-location.entity.js';
import { JewelryLocationService } from './jewelry-location.service.js';
import { JewelryLocationController } from './jewelry-location.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([JewelryLocation])],
  providers: [JewelryLocationService],
  controllers: [JewelryLocationController],
  exports: [JewelryLocationService],
})
export class JewelryLocationModule {}
