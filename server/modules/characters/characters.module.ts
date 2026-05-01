import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from '../../entities/character.entity.js';
import { Race } from '../../entities/race.entity.js';
import { Skill } from '../../entities/skill.entity.js';
import { CharacterService } from './character.service.js';
import { CharacterController } from './character.controller.js';
import { RaceService } from './race.service.js';
import { RaceController } from './race.controller.js';
import { SkillService } from './skill.service.js';
import { SkillController } from './skill.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Character, Race, Skill])],
  providers: [CharacterService, RaceService, SkillService],
  controllers: [CharacterController, RaceController, SkillController],
  exports: [CharacterService, RaceService, SkillService],
})
export class CharactersModule {}
