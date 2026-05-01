import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeFamily } from '../../entities/recipe-family.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class RecipeFamilyService extends BaseCrudService<RecipeFamily> {
  constructor(
    @InjectRepository(RecipeFamily)
    repository: Repository<RecipeFamily>,
  ) {
    super(repository, []);
  }
}
