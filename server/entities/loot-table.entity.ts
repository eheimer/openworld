import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { StorageItem } from './storage-item.entity.js';

@Entity('loot_table')
export class LootTable extends BaseEntity {
  @Column()
  sourceType!: string;

  @Column()
  sourceId!: number;

  @Column({ nullable: true })
  itemId!: number;

  @ManyToOne(() => StorageItem)
  @JoinColumn({ name: 'itemId' })
  item!: StorageItem;

  @Column({ nullable: true })
  dropWeight!: number;

  @Column({ nullable: true })
  quantityMin!: number;

  @Column({ nullable: true })
  quantityMax!: number;

  @Column({ nullable: true })
  minIntensity!: number;

  @Column({ nullable: true })
  maxIntensity!: number;

  @Column({ type: 'text', nullable: true })
  propertyPoolIds!: string;
}
