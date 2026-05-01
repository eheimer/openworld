import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunicToolFamilyRuleGroup } from '../../entities/runic-tool-family-rule-group.entity.js';
import { RunicToolFamilyRuleGroupService } from './runic-tool-family-rule-group.service.js';
import { RunicToolFamilyRuleGroupController } from './runic-tool-family-rule-group.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([RunicToolFamilyRuleGroup])],
  providers: [RunicToolFamilyRuleGroupService],
  controllers: [RunicToolFamilyRuleGroupController],
  exports: [RunicToolFamilyRuleGroupService],
})
export class RunicToolFamilyRuleGroupModule {}
