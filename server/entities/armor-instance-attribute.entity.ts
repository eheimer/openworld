import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { ArmorInstance } from './armor-instance.entity.js';
import { ArmorAttribute } from './armor-attribute.entity.js';
import { DamageType } from './damage-type.entity.js';

@Entity('armor_instance_attribute')
export class ArmorInstanceAttribute extends BaseEntity {
  @Column()
  value!: number;

  @Column({ nullable: true })
  armorId!: number;

  @ManyToOne(() => ArmorInstance)
  @JoinColumn({ name: 'armorId' })
  armor!: ArmorInstance;

  @Column()
  attributeId!: number;

  @ManyToOne(() => ArmorAttribute)
  @JoinColumn({ name: 'attributeId' })
  attribute!: ArmorAttribute;

  @Column({ nullable: true })
  damageTypeId!: number;

  @ManyToOne(() => DamageType)
  @JoinColumn({ name: 'damageTypeId' })
  damageType!: DamageType;
}
