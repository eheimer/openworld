import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeaponPoison } from '../../entities/weapon-poison.entity.js';
import { WeaponPoisonService } from './weapon-poison.service.js';
import { WeaponPoisonController } from './weapon-poison.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([WeaponPoison])],
  providers: [WeaponPoisonService],
  controllers: [WeaponPoisonController],
  exports: [WeaponPoisonService],
})
export class WeaponPoisonModule {}
