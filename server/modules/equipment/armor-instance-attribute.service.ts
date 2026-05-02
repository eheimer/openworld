import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArmorInstanceAttribute } from '../../entities/armor-instance-attribute.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class ArmorInstanceAttributeService extends BaseCrudService<ArmorInstanceAttribute> {
  constructor(
    @InjectRepository(ArmorInstanceAttribute)
    repository: Repository<ArmorInstanceAttribute>,
  ) {
    super(repository, ['armor', 'attribute', 'damageType']);
  }
}
