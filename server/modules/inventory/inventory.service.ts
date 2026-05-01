import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../../entities/inventory.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class InventoryService extends BaseCrudService<Inventory> {
  constructor(
    @InjectRepository(Inventory)
    repository: Repository<Inventory>,
  ) {
    super(repository, []);
  }
}
