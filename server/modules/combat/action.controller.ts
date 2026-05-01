import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActionService } from './action.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { Action } from '../../entities/action.entity.js';

@ApiTags('actions')
@Controller('actions')
export class ActionController extends BaseCrudController<Action> {
  constructor(service: ActionService) {
    super(service);
  }
}
