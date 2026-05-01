import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RecipeFamilyService } from './recipe-family.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { RecipeFamily } from '../../entities/recipe-family.entity.js';

@ApiTags('recipe-families')
@Controller('recipe-families')
export class RecipeFamilyController extends BaseCrudController<RecipeFamily> {
  constructor(service: RecipeFamilyService) {
    super(service);
  }
}
