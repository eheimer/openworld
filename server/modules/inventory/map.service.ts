import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Map } from '../../entities/map.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class MapService extends BaseCrudService<Map> {
  constructor(
    @InjectRepository(Map)
    repository: Repository<Map>,
  ) {
    super(repository, []);
  }
}
