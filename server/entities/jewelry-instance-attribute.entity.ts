import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { JewelryInstance } from './jewelry-instance.entity.js';
import { JewelryAttribute } from './jewelry-attribute.entity.js';
import { Skill } from './skill.entity.js';

@Entity('jewelry_instance_attribute')
export class JewelryInstanceAttribute extends BaseEntity {
  @Column()
  value!: number;

  @Column({ nullable: true })
  jewelryId!: number;

  @ManyToOne(() => JewelryInstance)
  @JoinColumn({ name: 'jewelryId' })
  jewelry!: JewelryInstance;

  @Column()
  attributeId!: number;

  @ManyToOne(() => JewelryAttribute)
  @JoinColumn({ name: 'attributeId' })
  attribute!: JewelryAttribute;

  @Column({ nullable: true })
  skillId!: number;

  @ManyToOne(() => Skill)
  @JoinColumn({ name: 'skillId' })
  skill!: Skill;
}
