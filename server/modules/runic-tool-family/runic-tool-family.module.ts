import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunicToolFamily } from '../../entities/runic-tool-family.entity.js';
import { RunicToolFamilyService } from './runic-tool-family.service.js';
import { RunicToolFamilyController } from './runic-tool-family.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([RunicToolFamily])],
  providers: [RunicToolFamilyService],
  controllers: [RunicToolFamilyController],
  exports: [RunicToolFamilyService],
})
export class RunicToolFamilyModule {}
