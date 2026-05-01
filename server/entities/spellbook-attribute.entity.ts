import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('spellbook_attribute')
export class SpellbookAttribute extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  value!: string;
}
