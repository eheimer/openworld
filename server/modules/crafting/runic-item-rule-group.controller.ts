import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RunicItemRuleGroupService } from './runic-item-rule-group.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { RunicItemRuleGroup } from '../../entities/runic-item-rule-group.entity.js';

@ApiTags('runic-item-rule-groups')
@Controller('runic-item-rule-groups')
export class RunicItemRuleGroupController extends BaseCrudController<RunicItemRuleGroup> {
  constructor(service: RunicItemRuleGroupService) {
    super(service);
  }
}
