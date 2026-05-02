import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArmorInstanceDamageReduction } from '../../entities/armor-instance-damage-reduction.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class ArmorInstanceDamageReductionService extends BaseCrudService<ArmorInstanceDamageReduction> {
  constructor(
    @InjectRepository(ArmorInstanceDamageReduction)
    repository: Repository<ArmorInstanceDamageReduction>,
  ) {
    super(repository, ['armor', 'damageType']);
  }
}
