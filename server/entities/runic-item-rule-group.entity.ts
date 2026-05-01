import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('runic_item_rule_group')
export class RunicItemRuleGroup extends BaseEntity {
  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  notes!: string;
}
