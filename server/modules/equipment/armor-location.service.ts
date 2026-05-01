import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArmorLocation } from '../../entities/armor-location.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class ArmorLocationService extends BaseCrudService<ArmorLocation> {
  constructor(
    @InjectRepository(ArmorLocation)
    repository: Repository<ArmorLocation>,
  ) {
    super(repository, ['location']);
  }
}
