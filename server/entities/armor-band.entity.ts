import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('armor_band')
export class ArmorBand extends BaseEntity {
  @Column()
  name!: string;
}
