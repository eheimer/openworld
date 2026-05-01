import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RecipeService } from './recipe.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { Recipe } from '../../entities/recipe.entity.js';

@ApiTags('recipes')
@Controller('recipes')
export class RecipeController extends BaseCrudController<Recipe> {
  constructor(service: RecipeService) {
    super(service);
  }
}
