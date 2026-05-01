import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Armor } from '../../entities/armor.entity.js';
import { ArmorService } from './armor.service.js';
import { ArmorController } from './armor.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Armor])],
  providers: [ArmorService],
  controllers: [ArmorController],
  exports: [ArmorService],
})
export class ArmorModule {}
