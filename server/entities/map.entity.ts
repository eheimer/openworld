import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('map')
export class Map extends BaseEntity {
  @Column()
  tileIndex!: number;

  @Column()
  terrain!: number;
}
