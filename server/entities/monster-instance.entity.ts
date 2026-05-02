import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { Monster } from './monster.entity.js';
import { Character } from './character.entity.js';
import { MonsterAction } from './monster-action.entity.js';
import { Inventory } from './inventory.entity.js';

@Entity('monster_instance')
export class MonsterInstance extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  orighp!: number;

  @Column()
  hp!: number;

  @Column()
  magery!: number;

  @Column()
  evalInt!: number;

  @Column()
  tactics!: number;

  @Column()
  resistSpell!: number;

  @Column()
  anatomy!: number;

  @Column()
  strength!: number;

  @Column()
  dexterity!: number;

  @Column()
  intelligence!: number;

  @Column()
  baseDmg!: number;

  @Column({ default: false })
  tamed!: boolean;

  @Column()
  hoverStats!: string;

  @Column()
  specials!: string;

  @Column({ nullable: true })
  animate!: boolean;

  @Column({ nullable: true })
  counter!: number;

  @Column({ nullable: true })
  meleeDmg!: number;

  @Column({ nullable: true })
  tameName!: string;

  @Column()
  stomach!: number;

  @Column()
  appetite!: number;

  @Column()
  obedience!: number;

  @Column()
  tracking!: number;

  @Column()
  resistPh!: number;

  @Column()
  resistC!: number;

  @Column()
  resistE!: number;

  @Column()
  resistF!: number;

  @Column()
  resistP!: number;

  @Column({ nullable: true })
  battleAsEnemyId!: number;

  @Column({ nullable: true })
  battleAsFriendlyId!: number;

  @Column({ nullable: true })
  ownerId!: number;

  @ManyToOne(() => Character)
  @JoinColumn({ name: 'ownerId' })
  owner!: Character;

  @Column()
  monsterId!: number;

  @ManyToOne(() => Monster)
  @JoinColumn({ name: 'monsterId' })
  monster!: Monster;

  @Column({ nullable: true })
  nextActionId!: number;

  @ManyToOne(() => MonsterAction)
  @JoinColumn({ name: 'nextActionId' })
  nextAction!: MonsterAction;

  @Column({ nullable: true })
  lootId!: number;

  @OneToOne(() => Inventory)
  @JoinColumn({ name: 'lootId' })
  loot!: Inventory;
}
