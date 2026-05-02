import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from '../../entities/character.entity.js';
import { CharacterSkill } from '../../entities/character-skill.entity.js';
import { Game } from '../../entities/game.entity.js';
import { Race } from '../../entities/race.entity.js';
import { RaceSkill } from '../../entities/race-skill.entity.js';
import { Skill } from '../../entities/skill.entity.js';
import { CharacterService } from './character.service.js';
import { CharacterController } from './character.controller.js';
import { CharacterSkillService } from './character-skill.service.js';
import { CharacterSkillController } from './character-skill.controller.js';
import { GameService } from './game.service.js';
import { GameController } from './game.controller.js';
import { RaceService } from './race.service.js';
import { RaceController } from './race.controller.js';
import { RaceSkillService } from './race-skill.service.js';
import { RaceSkillController } from './race-skill.controller.js';
import { SkillService } from './skill.service.js';
import { SkillController } from './skill.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Character, CharacterSkill, Game, Race, RaceSkill, Skill])],
  providers: [CharacterService, CharacterSkillService, GameService, RaceService, RaceSkillService, SkillService],
  controllers: [CharacterController, CharacterSkillController, GameController, RaceController, RaceSkillController, SkillController],
  exports: [CharacterService, CharacterSkillService, GameService, RaceService, RaceSkillService, SkillService],
})
export class CharactersModule {}
