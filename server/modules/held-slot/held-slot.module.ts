import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeldSlot } from '../../entities/held-slot.entity.js';
import { HeldSlotService } from './held-slot.service.js';
import { HeldSlotController } from './held-slot.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([HeldSlot])],
  providers: [HeldSlotService],
  controllers: [HeldSlotController],
  exports: [HeldSlotService],
})
export class HeldSlotModule {}
