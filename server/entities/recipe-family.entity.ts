import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { Skill } from './skill.entity.js';

@Entity('recipe_family')
export class RecipeFamily extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true })
  craftingSkillId!: number;

  @ManyToOne(() => Skill)
  @JoinColumn({ name: 'craftingSkillId' })
  craftingSkill!: Skill;

  @Column({ nullable: true })
  notes!: string;
}
