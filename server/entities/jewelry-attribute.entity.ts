import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('jewelry_attribute')
export class JewelryAttribute extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  value!: string;
}
