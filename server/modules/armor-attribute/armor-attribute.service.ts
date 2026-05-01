import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArmorAttribute } from '../../entities/armor-attribute.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class ArmorAttributeService extends BaseCrudService<ArmorAttribute> {
  constructor(
    @InjectRepository(ArmorAttribute)
    repository: Repository<ArmorAttribute>,
  ) {
    super(repository, []);
  }
}
