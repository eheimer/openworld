import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JewelryInstance } from '../../entities/jewelry-instance.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class JewelryInstanceService extends BaseCrudService<JewelryInstance> {
  constructor(
    @InjectRepository(JewelryInstance)
    repository: Repository<JewelryInstance>,
  ) {
    super(repository, ['gem', 'location', 'inventory']);
  }
}
