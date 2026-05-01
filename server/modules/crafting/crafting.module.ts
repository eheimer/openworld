import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Material } from '../../entities/material.entity.js';
import { MaterialType } from '../../entities/material-type.entity.js';
import { Recipe } from '../../entities/recipe.entity.js';
import { RecipeFamily } from '../../entities/recipe-family.entity.js';
import { RecipeIngredient } from '../../entities/recipe-ingredient.entity.js';
import { RunicAffixPool } from '../../entities/runic-affix-pool.entity.js';
import { RunicAffixPoolEntry } from '../../entities/runic-affix-pool-entry.entity.js';
import { RunicItemRuleGroup } from '../../entities/runic-item-rule-group.entity.js';
import { RunicToolFamily } from '../../entities/runic-tool-family.entity.js';
import { RunicToolFamilyRuleGroup } from '../../entities/runic-tool-family-rule-group.entity.js';
import { RunicToolTier } from '../../entities/runic-tool-tier.entity.js';

// Services
import { MaterialService } from './material.service.js';
import { MaterialTypeService } from './material-type.service.js';
import { RecipeService } from './recipe.service.js';
import { RecipeFamilyService } from './recipe-family.service.js';
import { RecipeIngredientService } from './recipe-ingredient.service.js';
import { RunicAffixPoolService } from './runic-affix-pool.service.js';
import { RunicAffixPoolEntryService } from './runic-affix-pool-entry.service.js';
import { RunicItemRuleGroupService } from './runic-item-rule-group.service.js';
import { RunicToolFamilyService } from './runic-tool-family.service.js';
import { RunicToolFamilyRuleGroupService } from './runic-tool-family-rule-group.service.js';
import { RunicToolTierService } from './runic-tool-tier.service.js';

// Controllers
import { MaterialController } from './material.controller.js';
import { MaterialTypeController } from './material-type.controller.js';
import { RecipeController } from './recipe.controller.js';
import { RecipeFamilyController } from './recipe-family.controller.js';
import { RecipeIngredientController } from './recipe-ingredient.controller.js';
import { RunicAffixPoolController } from './runic-affix-pool.controller.js';
import { RunicAffixPoolEntryController } from './runic-affix-pool-entry.controller.js';
import { RunicItemRuleGroupController } from './runic-item-rule-group.controller.js';
import { RunicToolFamilyController } from './runic-tool-family.controller.js';
import { RunicToolFamilyRuleGroupController } from './runic-tool-family-rule-group.controller.js';
import { RunicToolTierController } from './runic-tool-tier.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Material,
      MaterialType,
      Recipe,
      RecipeFamily,
      RecipeIngredient,
      RunicAffixPool,
      RunicAffixPoolEntry,
      RunicItemRuleGroup,
      RunicToolFamily,
      RunicToolFamilyRuleGroup,
      RunicToolTier,
    ]),
  ],
  controllers: [
    MaterialController,
    MaterialTypeController,
    RecipeController,
    RecipeFamilyController,
    RecipeIngredientController,
    RunicAffixPoolController,
    RunicAffixPoolEntryController,
    RunicItemRuleGroupController,
    RunicToolFamilyController,
    RunicToolFamilyRuleGroupController,
    RunicToolTierController,
  ],
  providers: [
    MaterialService,
    MaterialTypeService,
    RecipeService,
    RecipeFamilyService,
    RecipeIngredientService,
    RunicAffixPoolService,
    RunicAffixPoolEntryService,
    RunicItemRuleGroupService,
    RunicToolFamilyService,
    RunicToolFamilyRuleGroupService,
    RunicToolTierService,
  ],
  exports: [
    MaterialService,
    MaterialTypeService,
    RecipeService,
    RecipeFamilyService,
    RecipeIngredientService,
    RunicAffixPoolService,
    RunicAffixPoolEntryService,
    RunicItemRuleGroupService,
    RunicToolFamilyService,
    RunicToolFamilyRuleGroupService,
    RunicToolTierService,
  ],
})
export class CraftingModule {}
