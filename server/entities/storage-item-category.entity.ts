import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { StorageType } from './storage-type.entity.js';
import { ReloadFamily } from './reload-family.entity.js';

@Entity('storage_item_category')
export class StorageItemCategory extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true })
  storageTypeId!: number;

  @ManyToOne(() => StorageType)
  @JoinColumn({ name: 'storageTypeId' })
  storageType!: StorageType;

  @Column({ nullable: true })
  carrySlotCost!: number;

  @Column({ nullable: true })
  defaultWeight!: number;

  @Column({ default: 0 })
  equippable!: number;

  @Column({ default: 0 })
  requiresEquipToUse!: number;

  @Column({ nullable: true })
  reloadFamilyId!: number;

  @ManyToOne(() => ReloadFamily)
  @JoinColumn({ name: 'reloadFamilyId' })
  reloadFamily!: ReloadFamily;
}
