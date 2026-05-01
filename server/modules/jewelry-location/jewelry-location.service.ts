import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JewelryLocation } from '../../entities/jewelry-location.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class JewelryLocationService extends BaseCrudService<JewelryLocation> {
  constructor(
    @InjectRepository(JewelryLocation)
    repository: Repository<JewelryLocation>,
  ) {
    super(repository, ['location']);
  }
}
