import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { RunicAffixPool } from './runic-affix-pool.entity.js';
import { MagicalProperty } from './magical-property.entity.js';

@Entity('runic_affix_pool_entry')
export class RunicAffixPoolEntry extends BaseEntity {
  @Column()
  runicAffixPoolId!: number;

  @ManyToOne(() => RunicAffixPool)
  @JoinColumn({ name: 'runicAffixPoolId' })
  runicAffixPool!: RunicAffixPool;

  @Column()
  magicalPropertyId!: number;

  @ManyToOne(() => MagicalProperty)
  @JoinColumn({ name: 'magicalPropertyId' })
  magicalProperty!: MagicalProperty;

  @Column({ nullable: true })
  valueMin!: number;

  @Column({ nullable: true })
  valueMax!: number;

  @Column({ nullable: true })
  stepSize!: number;

  @Column({ nullable: true })
  notes!: string;
}
