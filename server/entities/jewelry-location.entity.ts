import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { EquipLocation } from './equip-location.entity.js';

@Entity('jewelry_location')
export class JewelryLocation extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true })
  locationId!: number;

  @OneToOne(() => EquipLocation)
  @JoinColumn({ name: 'locationId' })
  location!: EquipLocation;
}
