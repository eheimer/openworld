import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArmorLocation } from '../../entities/armor-location.entity.js';
import { ArmorLocationService } from './armor-location.service.js';
import { ArmorLocationController } from './armor-location.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([ArmorLocation])],
  providers: [ArmorLocationService],
  controllers: [ArmorLocationController],
  exports: [ArmorLocationService],
})
export class ArmorLocationModule {}
