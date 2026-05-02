import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RunicToolFamilyRuleGroup } from '../../entities/runic-tool-family-rule-group.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class RunicToolFamilyRuleGroupService extends BaseCrudService<RunicToolFamilyRuleGroup> {
  constructor(
    @InjectRepository(RunicToolFamilyRuleGroup)
    repository: Repository<RunicToolFamilyRuleGroup>,
  ) {
    super(repository, ['runicToolFamily', 'runicItemRuleGroup']);
  }
}
