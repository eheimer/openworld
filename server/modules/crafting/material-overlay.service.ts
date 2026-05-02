import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialOverlay } from '../../entities/material-overlay.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class MaterialOverlayService extends BaseCrudService<MaterialOverlay> {
  constructor(
    @InjectRepository(MaterialOverlay)
    repository: Repository<MaterialOverlay>,
  ) {
    super(repository, ['material']);
  }
}
