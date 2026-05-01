import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spell } from '../../entities/spell.entity.js';
import { SpellSchool } from '../../entities/spell-school.entity.js';
import { SpellService } from './spell.service.js';
import { SpellController } from './spell.controller.js';
import { SpellSchoolService } from './spell-school.service.js';
import { SpellSchoolController } from './spell-school.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Spell, SpellSchool])],
  providers: [SpellService, SpellSchoolService],
  controllers: [SpellController, SpellSchoolController],
  exports: [SpellService, SpellSchoolService],
})
export class MagicModule {}
