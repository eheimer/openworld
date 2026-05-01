import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spell } from '../../entities/spell.entity.js';
import { SpellService } from './spell.service.js';
import { SpellController } from './spell.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Spell])],
  providers: [SpellService],
  controllers: [SpellController],
  exports: [SpellService],
})
export class SpellModule {}
