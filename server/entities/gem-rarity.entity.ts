import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('gem_rarity')
export class GemRarity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  durability!: number;
}
