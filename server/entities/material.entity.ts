import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { MaterialType } from './material-type.entity.js';

@Entity('material')
export class Material extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  weaponDurability!: number;

  @Column()
  canSpawn!: boolean;

  @Column({ nullable: true })
  baseMaterialId!: number;

  @ManyToOne(() => MaterialType)
  @JoinColumn({ name: 'baseMaterialId' })
  baseMaterial!: MaterialType;
}
