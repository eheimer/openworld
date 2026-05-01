import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArmorClass } from '../../entities/armor-class.entity.js';
import { ArmorClassService } from './armor-class.service.js';
import { ArmorClassController } from './armor-class.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([ArmorClass])],
  providers: [ArmorClassService],
  controllers: [ArmorClassController],
  exports: [ArmorClassService],
})
export class ArmorClassModule {}
