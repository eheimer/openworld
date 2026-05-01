import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { ArmorClass } from './armor-class.entity.js';
import { ArmorLocation } from './armor-location.entity.js';
import { StorageItem } from './storage-item.entity.js';

@Entity('armor')
export class Armor extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  armorClassId!: number;

  @ManyToOne(() => ArmorClass)
  @JoinColumn({ name: 'armorClassId' })
  armorClass!: ArmorClass;

  @Column()
  armorLocationId!: number;

  @ManyToOne(() => ArmorLocation)
  @JoinColumn({ name: 'armorLocationId' })
  armorLocation!: ArmorLocation;

  @Column({ nullable: true })
  storageItemId!: number;

  @ManyToOne(() => StorageItem)
  @JoinColumn({ name: 'storageItemId' })
  storageItem!: StorageItem;
}
