import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConditionOverride } from '../../entities/condition-override.entity.js';
import { ConditionOverrideService } from './condition-override.service.js';
import { ConditionOverrideController } from './condition-override.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([ConditionOverride])],
  providers: [ConditionOverrideService],
  controllers: [ConditionOverrideController],
  exports: [ConditionOverrideService],
})
export class ConditionOverrideModule {}
