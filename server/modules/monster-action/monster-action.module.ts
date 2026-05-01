import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonsterAction } from '../../entities/monster-action.entity.js';
import { MonsterActionService } from './monster-action.service.js';
import { MonsterActionController } from './monster-action.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([MonsterAction])],
  providers: [MonsterActionService],
  controllers: [MonsterActionController],
  exports: [MonsterActionService],
})
export class MonsterActionModule {}
