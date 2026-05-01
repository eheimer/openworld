import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipLocation } from '../../entities/equip-location.entity.js';
import { EquipLocationService } from './equip-location.service.js';
import { EquipLocationController } from './equip-location.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([EquipLocation])],
  providers: [EquipLocationService],
  controllers: [EquipLocationController],
  exports: [EquipLocationService],
})
export class EquipLocationModule {}
