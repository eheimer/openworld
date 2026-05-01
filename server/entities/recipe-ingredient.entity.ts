import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity.js';
import { Recipe } from './recipe.entity.js';
import { MaterialType } from './material-type.entity.js';

@Entity('recipe_ingredient')
export class RecipeIngredient extends BaseEntity {
  @Column()
  recipeId!: number;

  @ManyToOne(() => Recipe)
  @JoinColumn({ name: 'recipeId' })
  recipe!: Recipe;

  @Column({ nullable: true })
  materialTypeId!: number;

  @ManyToOne(() => MaterialType)
  @JoinColumn({ name: 'materialTypeId' })
  materialType!: MaterialType;

  @Column()
  quantity!: number;

  @Column({ nullable: true })
  notes!: string;
}
