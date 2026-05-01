import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JewelryAttribute } from '../../entities/jewelry-attribute.entity.js';
import { JewelryAttributeService } from './jewelry-attribute.service.js';
import { JewelryAttributeController } from './jewelry-attribute.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([JewelryAttribute])],
  providers: [JewelryAttributeService],
  controllers: [JewelryAttributeController],
  exports: [JewelryAttributeService],
})
export class JewelryAttributeModule {}
