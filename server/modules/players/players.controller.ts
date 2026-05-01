import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../../entities/player.entity.js';
import { AdminGuard } from '../../guards/admin.guard.js';
import { BaseCrudService, QueryOptions, PaginatedResult } from '../../common/base-crud.service.js';

@ApiTags('players')
@Controller('players')
@UseGuards(AdminGuard)
export class PlayersController {
  private readonly crud: BaseCrudService<Player>;

  constructor(
    @InjectRepository(Player)
    repository: Repository<Player>,
  ) {
    this.crud = new BaseCrudService(repository);
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
  ): Promise<PaginatedResult<Player>> {
    return this.crud.findAll({ page, limit, sortBy, sortOrder });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Player> {
    return this.crud.findOne(id);
  }

  @Post()
  create(@Body() data: any): Promise<Player> {
    return this.crud.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<Player> {
    return this.crud.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.crud.remove(id);
  }
}
