import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from '../../entities/recipe.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class RecipeService extends BaseCrudService<Recipe> {
  constructor(
    @InjectRepository(Recipe)
    repository: Repository<Recipe>,
  ) {
    super(repository, []);
  }
}
