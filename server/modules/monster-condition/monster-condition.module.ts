import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonsterCondition } from '../../entities/monster-condition.entity.js';
import { MonsterConditionService } from './monster-condition.service.js';
import { MonsterConditionController } from './monster-condition.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([MonsterCondition])],
  providers: [MonsterConditionService],
  controllers: [MonsterConditionController],
  exports: [MonsterConditionService],
})
export class MonsterConditionModule {}
