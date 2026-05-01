import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from '../../entities/material.entity.js';
import { MaterialService } from './material.service.js';
import { MaterialController } from './material.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Material])],
  providers: [MaterialService],
  controllers: [MaterialController],
  exports: [MaterialService],
})
export class MaterialModule {}
