import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DamageType } from '../../entities/damage-type.entity.js';
import { DamageTypeService } from './damage-type.service.js';
import { DamageTypeController } from './damage-type.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([DamageType])],
  providers: [DamageTypeService],
  controllers: [DamageTypeController],
  exports: [DamageTypeService],
})
export class DamageTypeModule {}
