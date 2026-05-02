import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { Character } from './character.entity.js';
import { Skill } from './skill.entity.js';

@Entity('character_skill')
export class CharacterSkill extends BaseEntity {
  @Column({ default: 1 })
  level!: number;

  @Column()
  characterId!: number;

  @ManyToOne(() => Character)
  @JoinColumn({ name: 'characterId' })
  character!: Character;

  @Column()
  skillId!: number;

  @ManyToOne(() => Skill)
  @JoinColumn({ name: 'skillId' })
  skill!: Skill;
}
