import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JewelryInstanceAttribute } from '../../entities/jewelry-instance-attribute.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class JewelryInstanceAttributeService extends BaseCrudService<JewelryInstanceAttribute> {
  constructor(
    @InjectRepository(JewelryInstanceAttribute)
    repository: Repository<JewelryInstanceAttribute>,
  ) {
    super(repository, ['jewelry', 'attribute', 'skill']);
  }
}
