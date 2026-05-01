import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('character')
export class Character extends BaseEntity {
  @Column()
  name!: string;
}
