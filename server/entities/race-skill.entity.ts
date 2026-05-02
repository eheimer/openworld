import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { Race } from './race.entity.js';
import { Skill } from './skill.entity.js';

@Entity('race_skill')
export class RaceSkill extends BaseEntity {
  @Column()
  level!: number;

  @Column({ nullable: true })
  raceId!: number;

  @ManyToOne(() => Race)
  @JoinColumn({ name: 'raceId' })
  race!: Race;

  @Column({ nullable: true })
  skillId!: number;

  @ManyToOne(() => Skill)
  @JoinColumn({ name: 'skillId' })
  skill!: Skill;
}
