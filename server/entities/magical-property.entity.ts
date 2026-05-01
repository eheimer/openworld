import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('magical_property')
export class MagicalProperty extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true })
  family!: string;

  @Column({ nullable: true })
  valueType!: string;

  @Column({ nullable: true })
  formulaStage!: string;

  @Column({ default: false })
  appliesToWeapon!: boolean;

  @Column({ default: false })
  appliesToArmor!: boolean;

  @Column({ default: false })
  appliesToJewelry!: boolean;

  @Column({ default: false })
  appliesToSpellbook!: boolean;

  @Column({ nullable: true })
  capValue!: number;

  @Column({ nullable: true })
  stackingRule!: string;

  @Column({ type: 'text', nullable: true })
  exclusions!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;
}
