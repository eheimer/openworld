import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialMove } from '../../entities/special-move.entity.js';
import { SpecialMoveService } from './special-move.service.js';
import { SpecialMoveController } from './special-move.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialMove])],
  providers: [SpecialMoveService],
  controllers: [SpecialMoveController],
  exports: [SpecialMoveService],
})
export class SpecialMoveModule {}
