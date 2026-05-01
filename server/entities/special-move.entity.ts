import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { Condition } from './condition.entity.js';

@Entity('special_move')
export class SpecialMove extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  stamina!: number;

  // Effect classification
  @Column({ nullable: true })
  effectType!: string;

  @Column({ nullable: true })
  behaviorCategory!: string;

  @Column({ nullable: true })
  targetingModel!: string;

  // Effect reference
  @Column({ nullable: true })
  effectConditionId!: number;

  @ManyToOne(() => Condition)
  @JoinColumn({ name: 'effectConditionId' })
  effectCondition!: Condition;
}
