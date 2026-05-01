import {
  Entity, Column,
  ManyToOne, ManyToMany, JoinColumn, JoinTable, OneToMany,
} from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { DamageType } from './damage-type.entity.js';
import { SlayerType } from './slayer-type.entity.js';
import { MonsterAction } from './monster-action.entity.js';

@Entity('monster')
export class Monster extends BaseEntity {
  @Column()
  name!: string;

  @Column({ type: 'text' })
  hoverStats!: string;

  @Column()
  karma!: string;

  @Column()
  gold!: string;

  @Column()
  alignment!: string;

  @Column()
  hp!: string;

  @Column()
  bard!: string;

  @Column()
  taming!: string;

  @Column()
  resistF!: string;

  @Column()
  resistC!: string;

  @Column()
  resistP!: string;

  @Column()
  resistE!: string;

  @Column()
  resistPh!: string;

  @Column()
  magery!: string;

  @Column()
  evalInt!: string;

  @Column()
  aggroPriority!: number;

  @Column()
  tactics!: string;

  @Column()
  resistSpell!: string;

  @Column()
  anatomy!: string;

  @Column()
  strength!: string;

  @Column()
  dexterity!: string;

  @Column()
  intelligence!: string;

  @Column()
  baseDmg!: string;

  @Column()
  preferredFood!: string;

  @Column()
  controlSlots!: number;

  @Column({ type: 'text' })
  specials!: string;

  @Column()
  animate!: boolean;

  @Column()
  packInstinct!: string;

  @Column({ default: '' })
  tracking!: string;

  // Structured traits replacing free-text specials blob
  @Column({ type: 'text', nullable: true })
  traits!: string;  // JSON array of trait identifiers

  @Column({ type: 'text', nullable: true })
  passiveAbilities!: string;  // JSON array of passive ability identifiers

  @Column({ nullable: true })
  damageTypeId!: number;

  @ManyToOne(() => DamageType)
  @JoinColumn({ name: 'damageTypeId' })
  damageType!: DamageType;

  @Column({ nullable: true })
  breathDmgTypeId!: number;

  @ManyToOne(() => DamageType)
  @JoinColumn({ name: 'breathDmgTypeId' })
  breathDmgType!: DamageType;

  @ManyToMany(() => SlayerType)
  @JoinTable({
    name: 'monster_slayers_slayer_type',
    joinColumn: { name: 'monsterId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'slayerTypeId', referencedColumnName: 'id' },
  })
  slayers!: SlayerType[];

  @OneToMany(() => MonsterAction, (ma) => ma.monster)
  actions!: MonsterAction[];
}
