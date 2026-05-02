import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArmorInstance } from '../../entities/armor-instance.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class ArmorInstanceService extends BaseCrudService<ArmorInstance> {
  constructor(
    @InjectRepository(ArmorInstance)
    repository: Repository<ArmorInstance>,
  ) {
    super(repository, ['armorClass', 'location', 'inventory']);
  }
}
