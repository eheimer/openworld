import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { Gem } from './gem.entity.js';
import { JewelryLocation } from './jewelry-location.entity.js';
import { Inventory } from './inventory.entity.js';

@Entity('jewelry_instance')
export class JewelryInstance extends BaseEntity {
  @Column()
  equipped!: boolean;

  @Column()
  damaged!: boolean;

  @Column()
  gemId!: number;

  @ManyToOne(() => Gem)
  @JoinColumn({ name: 'gemId' })
  gem!: Gem;

  @Column()
  locationId!: number;

  @ManyToOne(() => JewelryLocation)
  @JoinColumn({ name: 'locationId' })
  location!: JewelryLocation;

  @Column()
  inventoryId!: number;

  @ManyToOne(() => Inventory)
  @JoinColumn({ name: 'inventoryId' })
  inventory!: Inventory;
}
