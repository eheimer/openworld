import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { ArmorClass } from './armor-class.entity.js';
import { DamageType } from './damage-type.entity.js';

@Entity('armor_class_damage_reduction')
export class ArmorClassDamageReduction extends BaseEntity {
  @Column()
  level!: number;

  @Column()
  reduction!: string;

  @Column({ nullable: true })
  armorClassId!: number;

  @ManyToOne(() => ArmorClass)
  @JoinColumn({ name: 'armorClassId' })
  armorClass!: ArmorClass;

  @Column({ nullable: true })
  damageTypeId!: number;

  @ManyToOne(() => DamageType)
  @JoinColumn({ name: 'damageTypeId' })
  damageType!: DamageType;
}
