import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Race } from '../../entities/race.entity.js';
import { RaceService } from './race.service.js';
import { RaceController } from './race.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Race])],
  providers: [RaceService],
  controllers: [RaceController],
  exports: [RaceService],
})
export class RaceModule {}
