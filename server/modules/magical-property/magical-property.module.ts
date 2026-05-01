import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagicalProperty } from '../../entities/magical-property.entity.js';
import { MagicalPropertyService } from './magical-property.service.js';
import { MagicalPropertyController } from './magical-property.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([MagicalProperty])],
  providers: [MagicalPropertyService],
  controllers: [MagicalPropertyController],
  exports: [MagicalPropertyService],
})
export class MagicalPropertyModule {}
