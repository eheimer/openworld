import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { RunicToolFamily } from './runic-tool-family.entity.js';
import { Material } from './material.entity.js';

@Entity('runic_tool_tier')
export class RunicToolTier extends BaseEntity {
  @Column()
  runicToolFamilyId!: number;

  @ManyToOne(() => RunicToolFamily)
  @JoinColumn({ name: 'runicToolFamilyId' })
  runicToolFamily!: RunicToolFamily;

  @Column()
  materialId!: number;

  @ManyToOne(() => Material)
  @JoinColumn({ name: 'materialId' })
  material!: Material;

  @Column()
  minProperties!: number;

  @Column()
  maxProperties!: number;

  @Column()
  minIntensity!: number;

  @Column()
  maxIntensity!: number;

  @Column({ nullable: true })
  notes!: string;
}
