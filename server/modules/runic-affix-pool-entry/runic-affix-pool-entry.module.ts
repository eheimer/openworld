import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunicAffixPoolEntry } from '../../entities/runic-affix-pool-entry.entity.js';
import { RunicAffixPoolEntryService } from './runic-affix-pool-entry.service.js';
import { RunicAffixPoolEntryController } from './runic-affix-pool-entry.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([RunicAffixPoolEntry])],
  providers: [RunicAffixPoolEntryService],
  controllers: [RunicAffixPoolEntryController],
  exports: [RunicAffixPoolEntryService],
})
export class RunicAffixPoolEntryModule {}
