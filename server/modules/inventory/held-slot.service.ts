import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeldSlot } from '../../entities/held-slot.entity.js';
import { BaseCrudService } from '../../common/base-crud.service.js';

@Injectable()
export class HeldSlotService extends BaseCrudService<HeldSlot> {
  constructor(
    @InjectRepository(HeldSlot)
    repository: Repository<HeldSlot>,
  ) {
    super(repository, []);
  }
}
