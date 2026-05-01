import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Race } from '../../entities/race.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class RaceService extends BaseCrudService<Race> {
  constructor(
    @InjectRepository(Race)
    repository: Repository<Race>,
  ) {
    super(repository, []);
  }
}
