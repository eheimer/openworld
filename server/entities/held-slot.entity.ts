import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('held_slot')
export class HeldSlot extends BaseEntity {
  @Column()
  name!: string;
}
