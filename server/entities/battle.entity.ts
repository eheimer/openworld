import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { Game } from './game.entity.js';
import { Character } from './character.entity.js';

@Entity('battle')
export class Battle extends BaseEntity {
  @Column({ default: 1 })
  round!: number;

  @Column()
  gameId!: number;

  @ManyToOne(() => Game)
  @JoinColumn({ name: 'gameId' })
  game!: Game;

  @Column()
  initiatorId!: number;

  @ManyToOne(() => Character)
  @JoinColumn({ name: 'initiatorId' })
  initiator!: Character;
}
