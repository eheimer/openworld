import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArmorBand } from '../../entities/armor-band.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class ArmorBandService extends BaseCrudService<ArmorBand> {
  constructor(
    @InjectRepository(ArmorBand)
    repository: Repository<ArmorBand>,
  ) {
    super(repository, []);
  }
}
