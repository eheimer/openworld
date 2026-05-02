import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('poison_tier')
export class PoisonTier extends BaseEntity {
  @Column({ unique: true })
  name!: string;

  @Column()
  label!: string;

  @Column()
  damageDice!: string;

  @Column()
  cooldownRounds!: number;

  @Column()
  durationRounds!: number;

  @Column({ nullable: true })
  applicationDiffModifier!: number;

  @Column()
  cureModifier!: number;

  @Column()
  initialDelayRounds!: number;

  @Column({ type: 'text', nullable: true })
  applicableVia!: string;

  @Column({ type: 'text', nullable: true })
  notes!: string;
}
