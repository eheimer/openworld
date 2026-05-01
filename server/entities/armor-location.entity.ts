import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { EquipLocation } from './equip-location.entity.js';

@Entity('armor_location')
export class ArmorLocation extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true })
  locationId!: number;

  @OneToOne(() => EquipLocation)
  @JoinColumn({ name: 'locationId' })
  location!: EquipLocation;
}
