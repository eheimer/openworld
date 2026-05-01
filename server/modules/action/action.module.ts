import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Action } from '../../entities/action.entity.js';
import { ActionService } from './action.service.js';
import { ActionController } from './action.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Action])],
  providers: [ActionService],
  controllers: [ActionController],
  exports: [ActionService],
})
export class ActionModule {}
