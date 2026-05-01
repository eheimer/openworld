import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { GemRarity } from './gem-rarity.entity.js';
import { StorageItemCategory } from './storage-item-category.entity.js';

@Entity('gem')
export class Gem extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  weight!: number;

  @Column()
  image!: string;

  @Column()
  level!: number;

  @Column({ nullable: true })
  rarityId!: number;

  @ManyToOne(() => GemRarity)
  @JoinColumn({ name: 'rarityId' })
  rarity!: GemRarity;

  @Column({ nullable: true })
  categoryId!: number;

  @ManyToOne(() => StorageItemCategory)
  @JoinColumn({ name: 'categoryId' })
  category!: StorageItemCategory;
}
