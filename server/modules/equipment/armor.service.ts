import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Armor } from '../../entities/armor.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class ArmorService extends BaseCrudService<Armor> {
  constructor(
    @InjectRepository(Armor)
    repository: Repository<Armor>,
  ) {
    super(repository, ['armorClass', 'armorLocation', 'storageItem']);
  }
}
