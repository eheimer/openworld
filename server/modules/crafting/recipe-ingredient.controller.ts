import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RecipeIngredientService } from './recipe-ingredient.service.js';
import { BaseCrudController } from '../../common/base-crud.controller.js';
import { RecipeIngredient } from '../../entities/recipe-ingredient.entity.js';

@ApiTags('recipe-ingredients')
@Controller('recipe-ingredients')
export class RecipeIngredientController extends BaseCrudController<RecipeIngredient> {
  constructor(service: RecipeIngredientService) {
    super(service);
  }
}
