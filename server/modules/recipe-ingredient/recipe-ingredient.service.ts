import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeIngredient } from '../../entities/recipe-ingredient.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class RecipeIngredientService extends BaseCrudService<RecipeIngredient> {
  constructor(
    @InjectRepository(RecipeIngredient)
    repository: Repository<RecipeIngredient>,
  ) {
    super(repository, []);
  }
}
