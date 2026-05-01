import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('storage_type')
export class StorageType extends BaseEntity {
  @Column()
  name!: string;
}
