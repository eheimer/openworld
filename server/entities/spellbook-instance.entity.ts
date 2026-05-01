import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { Inventory } from './inventory.entity.js';
import { HeldSlot } from './held-slot.entity.js';

@Entity('spellbook_instance')
export class SpellbookInstance extends BaseEntity {
  @Column({ default: 0 })
  held!: number;

  @Column({ default: 0 })
  disarmed!: number;

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
