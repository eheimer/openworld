import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeFamily } from '../../entities/recipe-family.entity.js';
import { RecipeFamilyService } from './recipe-family.service.js';
import { RecipeFamilyController } from './recipe-family.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeFamily])],
  providers: [RecipeFamilyService],
  controllers: [RecipeFamilyController],
  exports: [RecipeFamilyService],
})
export class RecipeFamilyModule {}
