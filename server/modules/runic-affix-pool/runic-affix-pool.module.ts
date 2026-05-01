import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunicAffixPool } from '../../entities/runic-affix-pool.entity.js';
import { RunicAffixPoolService } from './runic-affix-pool.service.js';
import { RunicAffixPoolController } from './runic-affix-pool.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([RunicAffixPool])],
  providers: [RunicAffixPoolService],
  controllers: [RunicAffixPoolController],
  exports: [RunicAffixPoolService],
})
export class RunicAffixPoolModule {}
