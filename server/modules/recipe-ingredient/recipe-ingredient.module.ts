import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeIngredient } from '../../entities/recipe-ingredient.entity.js';
import { RecipeIngredientService } from './recipe-ingredient.service.js';
import { RecipeIngredientController } from './recipe-ingredient.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeIngredient])],
  providers: [RecipeIngredientService],
  controllers: [RecipeIngredientController],
  exports: [RecipeIngredientService],
})
export class RecipeIngredientModule {}
