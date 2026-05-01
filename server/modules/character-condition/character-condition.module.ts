import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterCondition } from '../../entities/character-condition.entity.js';
import { CharacterConditionService } from './character-condition.service.js';
import { CharacterConditionController } from './character-condition.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterCondition])],
  providers: [CharacterConditionService],
  controllers: [CharacterConditionController],
  exports: [CharacterConditionService],
})
export class CharacterConditionModule {}
