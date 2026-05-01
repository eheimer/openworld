import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RunicToolFamilyRuleGroupService } from './runic-tool-family-rule-group.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { RunicToolFamilyRuleGroup } from '../../entities/runic-tool-family-rule-group.entity.js';

@ApiTags('runic-tool-family-rule-groups')
@Controller('runic-tool-family-rule-groups')
export class RunicToolFamilyRuleGroupController extends BaseCrudController<RunicToolFamilyRuleGroup> {
  constructor(service: RunicToolFamilyRuleGroupService) {
    super(service);
  }
}
