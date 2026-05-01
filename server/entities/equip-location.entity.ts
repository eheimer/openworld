import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('equip_location')
export class EquipLocation extends BaseEntity {
  @Column()
  name!: string;
}
