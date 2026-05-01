import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RunicAffixPoolEntry } from '../../entities/runic-affix-pool-entry.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class RunicAffixPoolEntryService extends BaseCrudService<RunicAffixPoolEntry> {
  constructor(
    @InjectRepository(RunicAffixPoolEntry)
    repository: Repository<RunicAffixPoolEntry>,
  ) {
    super(repository, []);
  }
}
