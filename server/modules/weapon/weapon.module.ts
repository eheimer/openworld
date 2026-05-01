import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weapon } from '../../entities/weapon.entity.js';
import { WeaponService } from './weapon.service.js';
import { WeaponController } from './weapon.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Weapon])],
  providers: [WeaponService],
  controllers: [WeaponController],
  exports: [WeaponService],
})
export class WeaponModule {}
