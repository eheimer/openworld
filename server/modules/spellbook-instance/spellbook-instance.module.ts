import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpellbookInstance } from '../../entities/spellbook-instance.entity.js';
import { SpellbookInstanceService } from './spellbook-instance.service.js';
import { SpellbookInstanceController } from './spellbook-instance.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([SpellbookInstance])],
  providers: [SpellbookInstanceService],
  controllers: [SpellbookInstanceController],
  exports: [SpellbookInstanceService],
})
export class SpellbookInstanceModule {}
