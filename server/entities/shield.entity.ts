import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { StorageItem } from './storage-item.entity.js';
import { MaterialType } from './material-type.entity.js';

@Entity('shield')
export class Shield extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true })
  storageItemId!: number;

  @ManyToOne(() => StorageItem)
  @JoinColumn({ name: 'storageItemId' })
  storageItem!: StorageItem;

  @Column({ nullable: true })
  materialTypeId!: number;

  @ManyToOne(() => MaterialType)
  @JoinColumn({ name: 'materialTypeId' })
  materialType!: MaterialType;
}
