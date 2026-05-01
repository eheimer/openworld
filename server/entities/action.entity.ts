import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { Condition } from './condition.entity.js';

@Entity('action')
export class Action extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true })
  value!: number;

  @Column({ type: 'text' })
  description!: string;

  @Column()
  initiative!: number;

  @Column()
  spellDmgRange!: string;

  // --- Action expansion columns (Domain 2) ---

  // Action classification
  @Column({ nullable: true })
  family!: string;

  @Column({ nullable: true })
  targetingModel!: string;

  // Effect reference (FK to condition for damage/effect)
  @Column({ nullable: true })
  effectConditionId!: number;

  @ManyToOne(() => Condition)
  @JoinColumn({ name: 'effectConditionId' })
  effectCondition!: Condition;

  @Column({ default: false })
  packInstinctEligible!: boolean;

  @Column({ type: 'text', nullable: true })
  manualResolutionNotes!: string;
}
