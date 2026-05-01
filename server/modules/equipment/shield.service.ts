import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shield } from '../../entities/shield.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class ShieldService extends BaseCrudService<Shield> {
  constructor(
    @InjectRepository(Shield)
    repository: Repository<Shield>,
  ) {
    super(repository, ['storageItem', 'materialType']);
  }
}
