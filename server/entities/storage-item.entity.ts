import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { StorageItemCategory } from './storage-item-category.entity.js';

@Entity('storage_item')
export class StorageItem extends BaseEntity {
  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ nullable: true })
  slotCost!: number;

  @Column({ nullable: true })
  weight!: number;

  @Column({ nullable: true })
  categoryId!: number;

  @ManyToOne(() => StorageItemCategory)
  @JoinColumn({ name: 'categoryId' })
  category!: StorageItemCategory;
}
