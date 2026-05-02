import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from '../../entities/game.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class GameService extends BaseCrudService<Game> {
  constructor(
    @InjectRepository(Game)
    repository: Repository<Game>,
  ) {
    super(repository, ['owner']);
  }
}
