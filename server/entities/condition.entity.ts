import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { DamageType } from './damage-type.entity.js';

@Entity('condition')
export class Condition extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  actionReplace!: string;

  @Column()
  duration!: number;

  @Column()
  damage!: string;

  @Column()
  delay!: number;

  @Column()
  cooldown!: number;

  @Column()
  removeOnHit!: boolean;

  @Column()
  allowMultiple!: boolean;

  @Column({ nullable: true })
  damageTypeId!: number;

  @ManyToOne(() => DamageType)
  @JoinColumn({ name: 'damageTypeId' })
  damageType!: DamageType;

  @Column({ type: 'text', nullable: true })
  categoryHint!: string;

  @Column({ type: 'text', nullable: true })
  notes!: string;
}
