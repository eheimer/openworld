import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { Weapon } from './weapon.entity.js';
import { DamageType } from './damage-type.entity.js';

@Entity('weapon_poison')
export class WeaponPoison extends BaseEntity {
  @Column()
  weaponId!: number;

  @ManyToOne(() => Weapon)
  @JoinColumn({ name: 'weaponId' })
  weapon!: Weapon;

  @Column()
  poisonType!: string;

  @Column()
  remainingDoses!: number;

  @Column({ nullable: true })
  damageTypeId!: number;

  @ManyToOne(() => DamageType)
  @JoinColumn({ name: 'damageTypeId' })
  damageType!: DamageType;
}
