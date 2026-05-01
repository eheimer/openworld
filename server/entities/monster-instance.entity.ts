import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { Monster } from './monster.entity.js';
import { Character } from './character.entity.js';

@Entity('monster_instance')
export class MonsterInstance extends BaseEntity {
  @Column({ nullable: true })
  monsterId!: number;

  @ManyToOne(() => Monster)
  @JoinColumn({ name: 'monsterId' })
  monster!: Monster;

  // Generated stats (rolled from species ranges)
  @Column({ nullable: true })
  strength!: number;

  @Column({ nullable: true })
  dexterity!: number;

  @Column({ nullable: true })
  intelligence!: number;

  @Column({ nullable: true })
  hp!: number;

  @Column({ nullable: true })
  magery!: number;

  @Column({ nullable: true })
  evalInt!: number;

  @Column({ nullable: true })
  tactics!: number;

  @Column({ nullable: true })
  anatomy!: number;

  @Column({ nullable: true })
  resistSpell!: number;

  // Resist values (generated)
  @Column({ nullable: true })
  resistF!: number;

  @Column({ nullable: true })
  resistC!: number;

  @Column({ nullable: true })
  resistP!: number;

  @Column({ nullable: true })
  resistE!: number;

  @Column({ nullable: true })
  resistPh!: number;

  @Column({ default: false })
  tamed!: boolean;

  // Owning character for tamed monsters
  @Column({ nullable: true })
  characterId!: number;

  @ManyToOne(() => Character)
  @JoinColumn({ name: 'characterId' })
  character!: Character;

  @Column({ nullable: true })
  currentHp!: number;
}
