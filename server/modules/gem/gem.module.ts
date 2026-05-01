import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gem } from '../../entities/gem.entity.js';
import { GemService } from './gem.service.js';
import { GemController } from './gem.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Gem])],
  providers: [GemService],
  controllers: [GemController],
  exports: [GemService],
})
export class GemModule {}
