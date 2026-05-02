import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { Condition } from './condition.entity.js';
import { MonsterInstance } from './monster-instance.entity.js';

/**
 * Active condition instance attached to a monster.
 *
 * The **affected entity** (who has this condition) is identified by
 * `creatureId`. This is the ownership column — the monster instance
 * that is currently experiencing the effect.
 *
 * `targetId` / `targetType` are optional general-purpose reference fields.
 * Their meaning depends on the specific condition — some may record a
 * source/instigator, others a target of aggression, etc. Do not assume
 * a fixed semantic; game logic defines their use per condition. They are
 * NOT the attachment point — do not confuse them with the affected entity.
 *
 * `damage` carries the same formula/range string as condition.damage
 * (e.g. "1d6", "2-4"). It is not pre-calculated to a fixed value
 * because recurring effects (like poison) roll each round.
 */
@Entity('monster_condition')
export class MonsterCondition extends BaseEntity {
  @Column()
  roundsRemaining!: number;

  @Column()
  cooldownRemaining!: number;

  /** Damage formula/range, same format as condition.damage (e.g. "1d6"). */
  @Column({ nullable: true })
  damage!: string;

  @Column()
  conditionId!: number;

  @ManyToOne(() => Condition)
  @JoinColumn({ name: 'conditionId' })
  condition!: Condition;

  /** Optional: general-purpose entity reference — meaning varies by condition. */
  @Column({ nullable: true })
  targetId!: number;

  /** Optional: type discriminator for targetId — meaning varies by condition. */
  @Column({ type: 'text', nullable: true })
  targetType!: string;

  /** The monster instance affected by this condition — the ownership column. */
  @Column({ nullable: true })
  creatureId!: number;

  @ManyToOne(() => MonsterInstance)
  @JoinColumn({ name: 'creatureId' })
  creatureMonsterInstance!: MonsterInstance;
}
