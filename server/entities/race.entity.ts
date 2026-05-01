import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('race')
export class Race extends BaseEntity {
  @Column({ type: 'text' })
  description!: string;

  @Column()
  name!: string;

  @Column()
  movement!: string;

  @Column()
  hpReplenish!: number;

  @Column()
  manaReplenish!: number;

  @Column()
  staminaReplenish!: number;

  @Column({ nullable: true })
  hunger!: number;

  @Column({ nullable: true })
  sleep!: number;
}
