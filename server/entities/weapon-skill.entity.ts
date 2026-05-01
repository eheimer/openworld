import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('weapon_skill')
export class WeaponSkill extends BaseEntity {
  @Column()
  name!: string;
}
