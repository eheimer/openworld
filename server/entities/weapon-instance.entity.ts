import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { Weapon } from './weapon.entity.js';
import { Material } from './material.entity.js';
import { Inventory } from './inventory.entity.js';
import { HeldSlot } from './held-slot.entity.js';

@Entity('weapon_instance')
export class WeaponInstance extends BaseEntity {
  @Column({ default: 0 })
  held!: number;

  @Column({ default: 0 })
  disarmed!: number;

  @Column()
  damaged!: number;

  @Column()
  weaponId!: number;

  @ManyToOne(() => Weapon)
  @JoinColumn({ name: 'weaponId' })
  weapon!: Weapon;

  @Column()
  materialId!: number;

  @ManyToOne(() => Material)
  @JoinColumn({ name: 'materialId' })
  material!: Material;

  @Column()
  inventoryId!: number;

  @ManyToOne(() => Inventory)
  @JoinColumn({ name: 'inventoryId' })
  inventory!: Inventory;

  @Column({ nullable: true })
  heldSlotId!: number;

  @ManyToOne(() => HeldSlot)
  @JoinColumn({ name: 'heldSlotId' })
  heldSlot!: HeldSlot;
}
