import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipLocation } from '../../entities/equip-location.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class EquipLocationService extends BaseCrudService<EquipLocation> {
  constructor(
    @InjectRepository(EquipLocation)
    repository: Repository<EquipLocation>,
  ) {
    super(repository, []);
  }
}
