import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { Monster } from './monster.entity.js';
import { Action } from './action.entity.js';

@Entity('monster_action')
export class MonsterAction extends BaseEntity {
  @Column()
  value!: number;

  @Column({ type: 'text' })
  description!: string;

  @Column()
  weight!: number;

  @Column({ nullable: true })
  monsterId!: number;

  @ManyToOne(() => Monster, (m) => m.actions)
  @JoinColumn({ name: 'monsterId' })
  monster!: Monster;

  @Column({ nullable: true })
  actionId!: number;

  @ManyToOne(() => Action)
  @JoinColumn({ name: 'actionId' })
  action!: Action;
}
