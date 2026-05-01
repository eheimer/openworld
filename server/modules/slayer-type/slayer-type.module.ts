import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlayerType } from '../../entities/slayer-type.entity.js';
import { SlayerTypeService } from './slayer-type.service.js';
import { SlayerTypeController } from './slayer-type.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([SlayerType])],
  providers: [SlayerTypeService],
  controllers: [SlayerTypeController],
  exports: [SlayerTypeService],
})
export class SlayerTypeModule {}
