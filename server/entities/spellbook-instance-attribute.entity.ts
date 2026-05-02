import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { SpellbookAttribute } from './spellbook-attribute.entity.js';
import { Skill } from './skill.entity.js';
import { SlayerType } from './slayer-type.entity.js';
import { SpellbookInstance } from './spellbook-instance.entity.js';

@Entity('spellbook_instance_attribute')
export class SpellbookInstanceAttribute extends BaseEntity {
  @Column()
  value!: number;

  @Column()
  attributeId!: number;

  @ManyToOne(() => SpellbookAttribute)
  @JoinColumn({ name: 'attributeId' })
  attribute!: SpellbookAttribute;

  @Column({ nullable: true })
  skillId!: number;

  @ManyToOne(() => Skill)
  @JoinColumn({ name: 'skillId' })
  skill!: Skill;

  @Column({ nullable: true })
  slayerId!: number;

  @ManyToOne(() => SlayerType)
  @JoinColumn({ name: 'slayerId' })
  slayer!: SlayerType;

  @Column({ nullable: true })
  spellbookId!: number;

  @ManyToOne(() => SpellbookInstance)
  @JoinColumn({ name: 'spellbookId' })
  spellbook!: SpellbookInstance;
}
