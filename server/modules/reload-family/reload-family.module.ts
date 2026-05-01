import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReloadFamily } from '../../entities/reload-family.entity.js';
import { ReloadFamilyService } from './reload-family.service.js';
import { ReloadFamilyController } from './reload-family.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([ReloadFamily])],
  providers: [ReloadFamilyService],
  controllers: [ReloadFamilyController],
  exports: [ReloadFamilyService],
})
export class ReloadFamilyModule {}
