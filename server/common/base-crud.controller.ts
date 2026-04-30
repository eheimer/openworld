import {
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { BaseCrudService, QueryOptions, PaginatedResult } from './base-crud.service.js';

export class BaseCrudController<T extends { id: number }> {
  constructor(protected readonly service: BaseCrudService<T>) {}

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
  ): Promise<PaginatedResult<T>> {
    const options: QueryOptions = { page, limit, sortBy, sortOrder };
    return this.service.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<T> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() data: any): Promise<T> {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<T> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
