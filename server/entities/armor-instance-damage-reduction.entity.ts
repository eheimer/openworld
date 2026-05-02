import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { ArmorInstance } from './armor-instance.entity.js';
import { DamageType } from './damage-type.entity.js';

@Entity('armor_instance_damage_reduction')
export class ArmorInstanceDamageReduction extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  value!: number;

  @Column({ nullable: true })
  armorId!: number;

  @ManyToOne(() => ArmorInstance)
  @JoinColumn({ name: 'armorId' })
  armor!: ArmorInstance;

  @Column()
  damageTypeId!: number;

  @ManyToOne(() => DamageType)
  @JoinColumn({ name: 'damageTypeId' })
  damageType!: DamageType;
}
