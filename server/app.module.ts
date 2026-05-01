import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { join } from 'path';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

// Core modules
import { AuthModule } from './modules/auth/auth.module.js';
import { MetadataModule } from './modules/metadata/metadata.module.js';
import { PlayersModule } from './modules/players/players.module.js';

// Entity CRUD modules
import { ActionModule } from './modules/action/action.module.js';
import { ArmorModule } from './modules/armor/armor.module.js';
import { ArmorAttributeModule } from './modules/armor-attribute/armor-attribute.module.js';
import { ArmorBandModule } from './modules/armor-band/armor-band.module.js';
import { ArmorClassModule } from './modules/armor-class/armor-class.module.js';
import { ArmorLocationModule } from './modules/armor-location/armor-location.module.js';
import { CharacterModule } from './modules/character/character.module.js';
import { CharacterConditionModule } from './modules/character-condition/character-condition.module.js';
import { ConditionModule } from './modules/condition/condition.module.js';
import { ConditionOverrideModule } from './modules/condition-override/condition-override.module.js';
import { DamageTypeModule } from './modules/damage-type/damage-type.module.js';
import { EquipLocationModule } from './modules/equip-location/equip-location.module.js';
import { GemModule } from './modules/gem/gem.module.js';
import { GemRarityModule } from './modules/gem-rarity/gem-rarity.module.js';
import { HeldSlotModule } from './modules/held-slot/held-slot.module.js';
import { InventoryModule } from './modules/inventory/inventory.module.js';
import { JewelryAttributeModule } from './modules/jewelry-attribute/jewelry-attribute.module.js';
import { JewelryLocationModule } from './modules/jewelry-location/jewelry-location.module.js';
import { LootTableModule } from './modules/loot-table/loot-table.module.js';
import { MagicalPropertyModule } from './modules/magical-property/magical-property.module.js';
import { MaterialModule } from './modules/material/material.module.js';
import { MaterialTypeModule } from './modules/material-type/material-type.module.js';
import { MonsterModule } from './modules/monster/monster.module.js';
import { MonsterActionModule } from './modules/monster-action/monster-action.module.js';
import { MonsterConditionModule } from './modules/monster-condition/monster-condition.module.js';
import { MonsterInstanceModule } from './modules/monster-instance/monster-instance.module.js';
import { RaceModule } from './modules/race/race.module.js';
import { RecipeModule } from './modules/recipe/recipe.module.js';
import { RecipeFamilyModule } from './modules/recipe-family/recipe-family.module.js';
import { RecipeIngredientModule } from './modules/recipe-ingredient/recipe-ingredient.module.js';
import { ReloadFamilyModule } from './modules/reload-family/reload-family.module.js';
import { RunicAffixPoolModule } from './modules/runic-affix-pool/runic-affix-pool.module.js';
import { RunicAffixPoolEntryModule } from './modules/runic-affix-pool-entry/runic-affix-pool-entry.module.js';
import { RunicItemRuleGroupModule } from './modules/runic-item-rule-group/runic-item-rule-group.module.js';
import { RunicToolFamilyModule } from './modules/runic-tool-family/runic-tool-family.module.js';
import { RunicToolFamilyRuleGroupModule } from './modules/runic-tool-family-rule-group/runic-tool-family-rule-group.module.js';
import { RunicToolTierModule } from './modules/runic-tool-tier/runic-tool-tier.module.js';
import { ShieldModule } from './modules/shield/shield.module.js';
import { SkillModule } from './modules/skill/skill.module.js';
import { SlayerTypeModule } from './modules/slayer-type/slayer-type.module.js';
import { SpecialMoveModule } from './modules/special-move/special-move.module.js';
import { SpellModule } from './modules/spell/spell.module.js';
import { SpellSchoolModule } from './modules/spell-school/spell-school.module.js';
import { SpellbookAttributeModule } from './modules/spellbook-attribute/spellbook-attribute.module.js';
import { SpellbookInstanceModule } from './modules/spellbook-instance/spellbook-instance.module.js';
import { StorageItemModule } from './modules/storage-item/storage-item.module.js';
import { StorageItemCategoryModule } from './modules/storage-item-category/storage-item-category.module.js';
import { StorageTypeModule } from './modules/storage-type/storage-type.module.js';
import { WeaponModule } from './modules/weapon/weapon.module.js';
import { WeaponAttributeModule } from './modules/weapon-attribute/weapon-attribute.module.js';
import { WeaponInstanceModule } from './modules/weapon-instance/weapon-instance.module.js';
import { WeaponPoisonModule } from './modules/weapon-poison/weapon-poison.module.js';
import { WeaponSkillModule } from './modules/weapon-skill/weapon-skill.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./config/.env.${process.env.NODE_ENV || 'dev'}`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/{*path}'],
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: join(__dirname, '..', '..', 'data', 'game.sqlite'),
      autoLoadEntities: true,
      synchronize: false,
    }),

    // Core
    AuthModule,
    MetadataModule,
    PlayersModule,

    // Combat
    ActionModule,
    ConditionModule,
    ConditionOverrideModule,
    DamageTypeModule,
    MonsterModule,
    MonsterActionModule,
    MonsterConditionModule,
    MonsterInstanceModule,
    SlayerTypeModule,

    // Equipment
    ArmorModule,
    ArmorAttributeModule,
    ArmorBandModule,
    ArmorClassModule,
    ArmorLocationModule,
    GemModule,
    GemRarityModule,
    JewelryAttributeModule,
    JewelryLocationModule,
    MagicalPropertyModule,
    ShieldModule,
    SpecialMoveModule,
    SpellbookAttributeModule,
    SpellbookInstanceModule,
    WeaponModule,
    WeaponAttributeModule,
    WeaponInstanceModule,
    WeaponPoisonModule,
    WeaponSkillModule,

    // Magic
    SpellModule,
    SpellSchoolModule,

    // Crafting
    MaterialModule,
    MaterialTypeModule,
    RecipeModule,
    RecipeFamilyModule,
    RecipeIngredientModule,
    RunicAffixPoolModule,
    RunicAffixPoolEntryModule,
    RunicItemRuleGroupModule,
    RunicToolFamilyModule,
    RunicToolFamilyRuleGroupModule,
    RunicToolTierModule,

    // Characters & Items
    CharacterModule,
    CharacterConditionModule,
    InventoryModule,
    RaceModule,
    SkillModule,
    LootTableModule,
    StorageItemModule,
    StorageItemCategoryModule,
    StorageTypeModule,
    ReloadFamilyModule,

    // Lookup
    EquipLocationModule,
    HeldSlotModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
