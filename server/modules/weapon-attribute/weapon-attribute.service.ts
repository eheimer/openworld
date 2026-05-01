import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeaponAttribute } from '../../entities/weapon-attribute.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class WeaponAttributeService extends BaseCrudService<WeaponAttribute> {
  constructor(
    @InjectRepository(WeaponAttribute)
    repository: Repository<WeaponAttribute>,
  ) {
    super(repository, ['skill']);
  }
}
