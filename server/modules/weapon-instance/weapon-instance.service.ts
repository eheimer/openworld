import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeaponInstance } from '../../entities/weapon-instance.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class WeaponInstanceService extends BaseCrudService<WeaponInstance> {
  constructor(
    @InjectRepository(WeaponInstance)
    repository: Repository<WeaponInstance>,
  ) {
    super(repository, ['weapon', 'material', 'inventory', 'heldSlot']);
  }
}
