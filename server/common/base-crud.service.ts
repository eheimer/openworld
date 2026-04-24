import {
  DeepPartial,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface FindAllOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export class BaseCrudService<T extends { id: number }> {
  constructor(
    protected readonly repository: Repository<T>,
    protected readonly relations: string[] = [],
  ) {}

  async findAll(options: FindAllOptions = {}): Promise<PaginatedResult<T>> {
    const { page = 1, limit = 20, sortBy = 'id', sortOrder = 'ASC' } = options;
    const skip = (page - 1) * limit;

    const order = { [sortBy]: sortOrder } as FindOptionsOrder<T>;

    const [data, total] = await this.repository.findAndCount({
      relations: this.relations,
      order,
      skip,
      take: limit,
    });

    return { data, total, page, limit };
  }

  async findOne(id: number): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
      relations: this.relations,
    });

    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return entity;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    await this.findOne(id);
    await this.repository.update(id, data as any);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repository.delete(id);
  }
}
