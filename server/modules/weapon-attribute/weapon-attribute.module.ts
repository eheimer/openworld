import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeaponAttribute } from '../../entities/weapon-attribute.entity.js';
import { WeaponAttributeService } from './weapon-attribute.service.js';
import { WeaponAttributeController } from './weapon-attribute.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([WeaponAttribute])],
  providers: [WeaponAttributeService],
  controllers: [WeaponAttributeController],
  exports: [WeaponAttributeService],
})
export class WeaponAttributeModule {}
