import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeaponSkill } from '../../entities/weapon-skill.entity.js';
import { WeaponSkillService } from './weapon-skill.service.js';
import { WeaponSkillController } from './weapon-skill.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([WeaponSkill])],
  providers: [WeaponSkillService],
  controllers: [WeaponSkillController],
  exports: [WeaponSkillService],
})
export class WeaponSkillModule {}
