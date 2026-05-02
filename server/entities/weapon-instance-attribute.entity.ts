import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { WeaponInstance } from './weapon-instance.entity.js';
import { WeaponAttribute } from './weapon-attribute.entity.js';
import { SlayerType } from './slayer-type.entity.js';

@Entity('weapon_instance_attribute')
export class WeaponInstanceAttribute extends BaseEntity {
  @Column()
  value!: number;

  @Column({ nullable: true })
  weaponId!: number;

  @ManyToOne(() => WeaponInstance)
  @JoinColumn({ name: 'weaponId' })
  weapon!: WeaponInstance;

  @Column()
  attributeId!: number;

  @ManyToOne(() => WeaponAttribute)
  @JoinColumn({ name: 'attributeId' })
  attribute!: WeaponAttribute;

  @Column({ nullable: true })
  slayerId!: number;

  @ManyToOne(() => SlayerType)
  @JoinColumn({ name: 'slayerId' })
  slayer!: SlayerType;
}
