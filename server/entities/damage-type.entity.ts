import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';

@Entity('damage_type')
export class DamageType extends BaseEntity {
  @Column()
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column()
  chaos!: boolean;

  @Column()
  display!: boolean;

  @Column()
  soundurl!: string;

  @Column()
  imgurl!: string;
}
