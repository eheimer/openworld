import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { ArmorBand } from './armor-band.entity.js';
import { MaterialType } from './material-type.entity.js';

@Entity('armor_class')
export class ArmorClass extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  durability!: number;

  @Column({ nullable: true })
  armorBandId!: number;

  @ManyToOne(() => ArmorBand)
  @JoinColumn({ name: 'armorBandId' })
  armorBand!: ArmorBand;

  @Column({ nullable: true })
  materialTypeId!: number;

  @ManyToOne(() => MaterialType)
  @JoinColumn({ name: 'materialTypeId' })
  materialType!: MaterialType;
}
