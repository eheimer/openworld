import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpellbookAttribute } from '../../entities/spellbook-attribute.entity.js';
import { SpellbookAttributeService } from './spellbook-attribute.service.js';
import { SpellbookAttributeController } from './spellbook-attribute.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([SpellbookAttribute])],
  providers: [SpellbookAttributeService],
  controllers: [SpellbookAttributeController],
  exports: [SpellbookAttributeService],
})
export class SpellbookAttributeModule {}
