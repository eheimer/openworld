import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { Material } from './material.entity.js';

@Entity('material_overlay')
export class MaterialOverlay extends BaseEntity {
  @Column()
  materialId!: number;

  @ManyToOne(() => Material)
  @JoinColumn({ name: 'materialId' })
  material!: Material;

  @Column({ type: 'text' })
  domain!: string;

  @Column({ default: 0 })
  physMod!: number;

  @Column({ default: 0 })
  fireMod!: number;

  @Column({ default: 0 })
  coldMod!: number;

  @Column({ default: 0 })
  poisonMod!: number;

  @Column({ default: 0 })
  energyMod!: number;

  @Column({ default: 0 })
  chaosMod!: number;

  @Column({ default: 0 })
  directMod!: number;

  @Column({ default: 0 })
  durabilityPercentMod!: number;

  @Column({ default: 0 })
  repairPointsMod!: number;

  @Column({ nullable: true })
  repairPointsMaxOverride!: number;

  @Column({ default: 0 })
  lowerRequirementMod!: number;

  @Column({ default: 0 })
  luckMod!: number;

  @Column({ type: 'text', nullable: true })
  propertyMods!: string;

  @Column({ type: 'text', nullable: true })
  bonusTags!: string;

  @Column({ type: 'text', nullable: true })
  accessRule!: string;

  @Column({ type: 'text', nullable: true })
  notes!: string;
}
