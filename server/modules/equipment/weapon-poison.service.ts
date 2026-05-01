import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeaponPoison } from '../../entities/weapon-poison.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class WeaponPoisonService extends BaseCrudService<WeaponPoison> {
  constructor(
    @InjectRepository(WeaponPoison)
    repository: Repository<WeaponPoison>,
  ) {
    super(repository, ['weapon', 'damageType']);
  }
}
