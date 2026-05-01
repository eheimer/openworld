import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../../entities/material.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class MaterialService extends BaseCrudService<Material> {
  constructor(
    @InjectRepository(Material)
    repository: Repository<Material>,
  ) {
    super(repository, ['baseMaterial']);
  }
}
