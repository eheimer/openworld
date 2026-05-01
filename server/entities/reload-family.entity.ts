import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('reload_family')
export class ReloadFamily extends BaseEntity {
  @Column()
  name!: string;
}
