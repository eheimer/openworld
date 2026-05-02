import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeaponInstanceAttribute } from '../../entities/weapon-instance-attribute.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class WeaponInstanceAttributeService extends BaseCrudService<WeaponInstanceAttribute> {
  constructor(
    @InjectRepository(WeaponInstanceAttribute)
    repository: Repository<WeaponInstanceAttribute>,
  ) {
    super(repository, ['weapon', 'attribute', 'slayer']);
  }
}
