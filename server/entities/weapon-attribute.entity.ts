import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { WeaponSkill } from './weapon-skill.entity.js';

@Entity('weapon_attribute')
export class WeaponAttribute extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  value!: string;

  @Column()
  hand!: number;

  @Column({ nullable: true })
  skillId!: number;

  @ManyToOne(() => WeaponSkill)
  @JoinColumn({ name: 'skillId' })
  skill!: WeaponSkill;
}
