import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RunicItemRuleGroup } from '../../entities/runic-item-rule-group.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class RunicItemRuleGroupService extends BaseCrudService<RunicItemRuleGroup> {
  constructor(
    @InjectRepository(RunicItemRuleGroup)
    repository: Repository<RunicItemRuleGroup>,
  ) {
    super(repository, []);
  }
}
