import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { ArmorClass } from './armor-class.entity.js';
import { ArmorLocation } from './armor-location.entity.js';
import { Inventory } from './inventory.entity.js';

@Entity('armor_instance')
export class ArmorInstance extends BaseEntity {
  @Column()
  equipped!: boolean;

  @Column()
  damaged!: boolean;

  @Column()
  armorClassId!: number;

  @ManyToOne(() => ArmorClass)
  @JoinColumn({ name: 'armorClassId' })
  armorClass!: ArmorClass;

  @Column()
  locationId!: number;

  @ManyToOne(() => ArmorLocation)
  @JoinColumn({ name: 'locationId' })
  location!: ArmorLocation;

  @Column()
  inventoryId!: number;

  @ManyToOne(() => Inventory)
  @JoinColumn({ name: 'inventoryId' })
  inventory!: Inventory;
}
