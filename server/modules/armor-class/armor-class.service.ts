import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArmorClass } from '../../entities/armor-class.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class ArmorClassService extends BaseCrudService<ArmorClass> {
  constructor(
    @InjectRepository(ArmorClass)
    repository: Repository<ArmorClass>,
  ) {
    super(repository, []);
  }
}
