import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GameService } from './game.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { Game } from '../../entities/game.entity.js';

@ApiTags('games')
@Controller('games')
export class GameController extends BaseCrudController<Game> {
  constructor(service: GameService) {
    super(service);
  }
}
