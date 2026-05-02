import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RunicToolFamily } from '../../entities/runic-tool-family.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class RunicToolFamilyService extends BaseCrudService<RunicToolFamily> {
  constructor(
    @InjectRepository(RunicToolFamily)
    repository: Repository<RunicToolFamily>,
  ) {
    super(repository, ['craftingSkill']);
  }
}
