import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weapon } from '../../entities/weapon.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class WeaponService extends BaseCrudService<Weapon> {
  constructor(
    @InjectRepository(Weapon)
    repository: Repository<Weapon>,
  ) {
    super(repository, ['skill', 'primaryMove', 'secondaryMove', 'material']);
  }
}
