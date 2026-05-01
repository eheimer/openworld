import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { RecipeFamily } from './recipe-family.entity.js';

@Entity('recipe')
export class Recipe extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  baseItemType!: string;

  @Column()
  baseItemId!: number;

  @Column({ nullable: true })
  minSkillLevel!: number;

  @Column({ nullable: true })
  difficulty!: number;

  @Column({ nullable: true })
  recipeFamilyId!: number;

  @ManyToOne(() => RecipeFamily)
  @JoinColumn({ name: 'recipeFamilyId' })
  recipeFamily!: RecipeFamily;

  @Column({ nullable: true })
  notes!: string;
}
