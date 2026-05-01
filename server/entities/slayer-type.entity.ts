import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('slayer_type')
export class SlayerType extends BaseEntity {
  @Column()
  name!: string;
}
