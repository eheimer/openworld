import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condition } from '../../entities/condition.entity.js';
import { ConditionService } from './condition.service.js';
import { ConditionController } from './condition.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Condition])],
  providers: [ConditionService],
  controllers: [ConditionController],
  exports: [ConditionService],
})
export class ConditionModule {}
