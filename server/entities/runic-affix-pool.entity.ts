import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { RunicItemRuleGroup } from './runic-item-rule-group.entity.js';

@Entity('runic_affix_pool')
export class RunicAffixPool extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  runicItemRuleGroupId!: number;

  @ManyToOne(() => RunicItemRuleGroup)
  @JoinColumn({ name: 'runicItemRuleGroupId' })
  runicItemRuleGroup!: RunicItemRuleGroup;

  @Column({ nullable: true })
  notes!: string;
}
