import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConditionOverrideService } from './condition-override.service.js';

@ApiTags('condition-overrides')
@Controller('condition-overrides')
export class ConditionOverrideController {
  constructor(private readonly service: ConditionOverrideService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @Delete(':conditionId1/:conditionId2')
  remove(
    @Param('conditionId1') conditionId1: string,
    @Param('conditionId2') conditionId2: string,
  ) {
    return this.service.remove(+conditionId1, +conditionId2);
  }
}
