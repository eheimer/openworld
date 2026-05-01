import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from '../../entities/character.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class CharacterService extends BaseCrudService<Character> {
  constructor(
    @InjectRepository(Character)
    repository: Repository<Character>,
  ) {
    super(repository, []);
  }
}
