import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('armor_attribute')
export class ArmorAttribute extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  value!: string;
}
