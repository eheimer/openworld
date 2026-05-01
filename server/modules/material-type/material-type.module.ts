import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialType } from '../../entities/material-type.entity.js';
import { MaterialTypeService } from './material-type.service.js';
import { MaterialTypeController } from './material-type.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialType])],
  providers: [MaterialTypeService],
  controllers: [MaterialTypeController],
  exports: [MaterialTypeService],
})
export class MaterialTypeModule {}
