import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { Skill } from './skill.entity.js';

@Entity('spell_school')
export class SpellSchool extends BaseEntity {
  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  castingModel!: string;

  @Column({ type: 'text', nullable: true })
  interruptionBehavior!: string;

  @Column({ default: false })
  supportsHeldPrecast!: boolean;

  @Column({ nullable: true })
  skillId!: number;

  @ManyToOne(() => Skill)
  @JoinColumn({ name: 'skillId' })
  skill!: Skill;
}
