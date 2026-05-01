import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArmorAttribute } from '../../entities/armor-attribute.entity.js';
import { ArmorAttributeService } from './armor-attribute.service.js';
import { ArmorAttributeController } from './armor-attribute.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([ArmorAttribute])],
  providers: [ArmorAttributeService],
  controllers: [ArmorAttributeController],
  exports: [ArmorAttributeService],
})
export class ArmorAttributeModule {}
