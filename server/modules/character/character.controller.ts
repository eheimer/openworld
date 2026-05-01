import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CharacterService } from './character.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { Character } from '../../entities/character.entity.js';

@ApiTags('characters')
@Controller('characters')
export class CharacterController extends BaseCrudController<Character> {
  constructor(service: CharacterService) {
    super(service);
  }
}
