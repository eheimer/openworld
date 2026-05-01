import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GemRarity } from '../../entities/gem-rarity.entity.js';
import { GemRarityService } from './gem-rarity.service.js';
import { GemRarityController } from './gem-rarity.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([GemRarity])],
  providers: [GemRarityService],
  controllers: [GemRarityController],
  exports: [GemRarityService],
})
export class GemRarityModule {}
