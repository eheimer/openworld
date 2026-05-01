import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunicToolTier } from '../../entities/runic-tool-tier.entity.js';
import { RunicToolTierService } from './runic-tool-tier.service.js';
import { RunicToolTierController } from './runic-tool-tier.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([RunicToolTier])],
  providers: [RunicToolTierService],
  controllers: [RunicToolTierController],
  exports: [RunicToolTierService],
})
export class RunicToolTierModule {}
