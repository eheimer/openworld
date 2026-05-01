import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpellSchool } from '../../entities/spell-school.entity.js';
import { SpellSchoolService } from './spell-school.service.js';
import { SpellSchoolController } from './spell-school.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([SpellSchool])],
  providers: [SpellSchoolService],
  controllers: [SpellSchoolController],
  exports: [SpellSchoolService],
})
export class SpellSchoolModule {}
