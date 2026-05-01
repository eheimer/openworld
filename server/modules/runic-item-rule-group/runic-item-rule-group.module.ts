import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunicItemRuleGroup } from '../../entities/runic-item-rule-group.entity.js';
import { RunicItemRuleGroupService } from './runic-item-rule-group.service.js';
import { RunicItemRuleGroupController } from './runic-item-rule-group.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([RunicItemRuleGroup])],
  providers: [RunicItemRuleGroupService],
  controllers: [RunicItemRuleGroupController],
  exports: [RunicItemRuleGroupService],
})
export class RunicItemRuleGroupModule {}
