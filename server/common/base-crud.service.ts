import {
  DeepPartial,
  FindManyOptions,
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
  totalPages: number;
}

export interface QueryOptions {
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

  async findAll(options: QueryOptions = {}): Promise<PaginatedResult<T>> {
    const {
      page = 1,
      limit = 50,
      sortBy = 'id',
      sortOrder = 'ASC',
    } = options;

    const findOptions: FindManyOptions<T> = {
      relations: this.relations,
      order: { [sortBy]: sortOrder } as FindOptionsOrder<T>,
      skip: (page - 1) * limit,
      take: limit,
    };

    const [data, total] = await this.repository.findAndCount(findOptions);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
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
    const saved = await this.repository.save(entity);
    return this.findOne((saved as any).id);
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    await this.findOne(id);
    await this.repository.update(id, data as any);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }
}
