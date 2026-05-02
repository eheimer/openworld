import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { Shield } from './shield.entity.js';
import { Material } from './material.entity.js';
import { Inventory } from './inventory.entity.js';
import { HeldSlot } from './held-slot.entity.js';

@Entity('shield_instance')
export class ShieldInstance extends BaseEntity {
  @Column({ default: 0 })
  held!: number;

  @Column({ default: 0 })
  disarmed!: number;

  @Column()
  damaged!: boolean;

  @Column()
  shieldId!: number;

  @ManyToOne(() => Shield)
  @JoinColumn({ name: 'shieldId' })
  shield!: Shield;

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
