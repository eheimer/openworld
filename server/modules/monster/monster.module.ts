import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Monster } from '../../entities/monster.entity.js';
import { MonsterService } from './monster.service.js';
import { MonsterController } from './monster.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Monster])],
  providers: [MonsterService],
  controllers: [MonsterController],
  exports: [MonsterService],
})
export class MonsterModule {}
