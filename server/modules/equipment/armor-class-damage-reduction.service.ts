import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArmorClassDamageReduction } from '../../entities/armor-class-damage-reduction.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class ArmorClassDamageReductionService extends BaseCrudService<ArmorClassDamageReduction> {
  constructor(
    @InjectRepository(ArmorClassDamageReduction)
    repository: Repository<ArmorClassDamageReduction>,
  ) {
    super(repository, ['armorClass', 'damageType']);
  }
}
