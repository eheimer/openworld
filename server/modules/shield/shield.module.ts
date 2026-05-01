import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shield } from '../../entities/shield.entity.js';
import { ShieldService } from './shield.service.js';
import { ShieldController } from './shield.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Shield])],
  providers: [ShieldService],
  controllers: [ShieldController],
  exports: [ShieldService],
})
export class ShieldModule {}
