import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeaponInstance } from '../../entities/weapon-instance.entity.js';
import { WeaponInstanceService } from './weapon-instance.service.js';
import { WeaponInstanceController } from './weapon-instance.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([WeaponInstance])],
  providers: [WeaponInstanceService],
  controllers: [WeaponInstanceController],
  exports: [WeaponInstanceService],
})
export class WeaponInstanceModule {}
