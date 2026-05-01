import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { SpellSchool } from './spell-school.entity.js';

@Entity('spell')
export class Spell extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true })
  spellSchoolId!: number;

  @ManyToOne(() => SpellSchool)
  @JoinColumn({ name: 'spellSchoolId' })
  spellSchool!: SpellSchool;

  @Column({ nullable: true })
  category!: string;

  @Column({ nullable: true })
  circle!: number;

  @Column({ nullable: true })
  targetingModel!: string;

  @Column({ nullable: true })
  manaCost!: number;

  @Column({ nullable: true })
  minimumSkill!: number;

  @Column({ nullable: true })
  castTiming!: string;

  @Column({ nullable: true })
  resistTag!: string;

  @Column({ nullable: true })
  formulaFamily!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'text', nullable: true })
  reagentItemIds!: string;
}
