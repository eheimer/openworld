import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArmorBand } from '../../entities/armor-band.entity.js';
import { ArmorBandService } from './armor-band.service.js';
import { ArmorBandController } from './armor-band.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([ArmorBand])],
  providers: [ArmorBandService],
  controllers: [ArmorBandController],
  exports: [ArmorBandService],
})
export class ArmorBandModule {}
