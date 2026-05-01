import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JewelryAttribute } from '../../entities/jewelry-attribute.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class JewelryAttributeService extends BaseCrudService<JewelryAttribute> {
  constructor(
    @InjectRepository(JewelryAttribute)
    repository: Repository<JewelryAttribute>,
  ) {
    super(repository, []);
  }
}
