import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConditionOverride } from '../../entities/condition-override.entity.js';

@Injectable()
export class ConditionOverrideService {
  constructor(
    @InjectRepository(ConditionOverride)
    private readonly repository: Repository<ConditionOverride>,
  ) {}

  async findAll(): Promise<ConditionOverride[]> {
    return this.repository.find({
      relations: ['condition1', 'condition2'],
    });
  }

  async create(data: Partial<ConditionOverride>): Promise<ConditionOverride> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async remove(conditionId_1: number, conditionId_2: number): Promise<void> {
    const entity = await this.repository.findOne({
      where: { conditionId_1, conditionId_2 },
      relations: ['condition1', 'condition2'],
    });
    if (!entity) {
      throw new NotFoundException(
        `ConditionOverride with keys (${conditionId_1}, ${conditionId_2}) not found`,
      );
    }
    await this.repository.remove(entity);
  }
}
