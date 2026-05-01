import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('inventory')
export class Inventory extends BaseEntity {
  // Polymorphic owner: 'character', 'pack_animal', 'monster_instance', 'chest', 'bank', 'ship', 'vendor'
  @Column()
  ownerType!: string;

  @Column()
  ownerId!: number;

  @Column({ nullable: true })
  name!: string;
}
