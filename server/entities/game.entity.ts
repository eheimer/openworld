import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { Player } from './player.entity.js';

@Entity('game')
export class Game extends BaseEntity {
  @Column({ unique: true })
  name!: string;

  @Column()
  ownerId!: number;

  @ManyToOne(() => Player)
  @JoinColumn({ name: 'ownerId' })
  owner!: Player;
}
