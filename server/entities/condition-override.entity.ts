import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Condition } from './condition.entity.js';

@Entity('condition_overrides_condition')
export class ConditionOverride {
  @PrimaryColumn()
  conditionId_1!: number;

  @PrimaryColumn()
  conditionId_2!: number;

  @ManyToOne(() => Condition)
  @JoinColumn({ name: 'conditionId_1' })
  condition1!: Condition;

  @ManyToOne(() => Condition)
  @JoinColumn({ name: 'conditionId_2' })
  condition2!: Condition;
}
