import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShieldInstance } from '../../entities/shield-instance.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class ShieldInstanceService extends BaseCrudService<ShieldInstance> {
  constructor(
    @InjectRepository(ShieldInstance)
    repository: Repository<ShieldInstance>,
  ) {
    super(repository, ['shield', 'material', 'inventory', 'heldSlot']);
  }
}
