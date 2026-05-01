import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { WeaponSkill } from './weapon-skill.entity.js';
import { SpecialMove } from './special-move.entity.js';
import { MaterialType } from './material-type.entity.js';
import { StorageItem } from './storage-item.entity.js';

@Entity('weapon')
export class Weapon extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  damage!: string;

  @Column()
  range!: number;

  @Column()
  speed!: number;

  @Column()
  strength!: number;

  @Column()
  hand!: number;

  @Column({ nullable: true })
  skillId!: number;

  @ManyToOne(() => WeaponSkill)
  @JoinColumn({ name: 'skillId' })
  skill!: WeaponSkill;

  @Column({ nullable: true })
  primaryMoveId!: number;

  @ManyToOne(() => SpecialMove)
  @JoinColumn({ name: 'primaryMoveId' })
  primaryMove!: SpecialMove;

  @Column({ nullable: true })
  secondaryMoveId!: number;

  @ManyToOne(() => SpecialMove)
  @JoinColumn({ name: 'secondaryMoveId' })
  secondaryMove!: SpecialMove;

  @Column({ nullable: true })
  materialId!: number;

  @ManyToOne(() => MaterialType)
  @JoinColumn({ name: 'materialId' })
  material!: MaterialType;

  @Column({ nullable: true })
  storageItemId!: number;

  @ManyToOne(() => StorageItem)
  @JoinColumn({ name: 'storageItemId' })
  storageItem!: StorageItem;
}
