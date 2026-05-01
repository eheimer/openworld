import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LootTable } from '../../entities/loot-table.entity.js';
import { LootTableService } from './loot-table.service.js';
import { LootTableController } from './loot-table.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([LootTable])],
  providers: [LootTableService],
  controllers: [LootTableController],
  exports: [LootTableService],
})
export class LootTableModule {}
