import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { RunicToolFamily } from './runic-tool-family.entity.js';
import { RunicItemRuleGroup } from './runic-item-rule-group.entity.js';

@Entity('runic_tool_family_rule_group')
export class RunicToolFamilyRuleGroup extends BaseEntity {
  @Column()
  runicToolFamilyId!: number;

  @ManyToOne(() => RunicToolFamily)
  @JoinColumn({ name: 'runicToolFamilyId' })
  runicToolFamily!: RunicToolFamily;

  @Column()
  runicItemRuleGroupId!: number;

  @ManyToOne(() => RunicItemRuleGroup)
  @JoinColumn({ name: 'runicItemRuleGroupId' })
  runicItemRuleGroup!: RunicItemRuleGroup;
}
