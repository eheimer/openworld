import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonsterInstance } from '../../entities/monster-instance.entity.js';
import { MonsterInstanceService } from './monster-instance.service.js';
import { MonsterInstanceController } from './monster-instance.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([MonsterInstance])],
  providers: [MonsterInstanceService],
  controllers: [MonsterInstanceController],
  exports: [MonsterInstanceService],
})
export class MonsterInstanceModule {}
