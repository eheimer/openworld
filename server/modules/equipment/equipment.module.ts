import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Armor } from '../../entities/armor.entity.js';
import { ArmorAttribute } from '../../entities/armor-attribute.entity.js';
import { ArmorBand } from '../../entities/armor-band.entity.js';
import { ArmorClass } from '../../entities/armor-class.entity.js';
import { ArmorClassDamageReduction } from '../../entities/armor-class-damage-reduction.entity.js';
import { ArmorInstance } from '../../entities/armor-instance.entity.js';
import { ArmorInstanceAttribute } from '../../entities/armor-instance-attribute.entity.js';
import { ArmorInstanceDamageReduction } from '../../entities/armor-instance-damage-reduction.entity.js';
import { ArmorLocation } from '../../entities/armor-location.entity.js';
import { Gem } from '../../entities/gem.entity.js';
import { GemRarity } from '../../entities/gem-rarity.entity.js';
import { JewelryAttribute } from '../../entities/jewelry-attribute.entity.js';
import { JewelryInstance } from '../../entities/jewelry-instance.entity.js';
import { JewelryInstanceAttribute } from '../../entities/jewelry-instance-attribute.entity.js';
import { JewelryLocation } from '../../entities/jewelry-location.entity.js';
import { LootTable } from '../../entities/loot-table.entity.js';
import { MagicalProperty } from '../../entities/magical-property.entity.js';
import { PoisonTier } from '../../entities/poison-tier.entity.js';
import { Shield } from '../../entities/shield.entity.js';
import { ShieldInstance } from '../../entities/shield-instance.entity.js';
import { SpecialMove } from '../../entities/special-move.entity.js';
import { SpellbookAttribute } from '../../entities/spellbook-attribute.entity.js';
import { SpellbookInstance } from '../../entities/spellbook-instance.entity.js';
import { SpellbookInstanceAttribute } from '../../entities/spellbook-instance-attribute.entity.js';
import { Weapon } from '../../entities/weapon.entity.js';
import { WeaponAttribute } from '../../entities/weapon-attribute.entity.js';
import { WeaponInstance } from '../../entities/weapon-instance.entity.js';
import { WeaponInstanceAttribute } from '../../entities/weapon-instance-attribute.entity.js';
import { WeaponPoison } from '../../entities/weapon-poison.entity.js';
import { WeaponSkill } from '../../entities/weapon-skill.entity.js';

// Services
import { ArmorService } from './armor.service.js';
import { ArmorAttributeService } from './armor-attribute.service.js';
import { ArmorBandService } from './armor-band.service.js';
import { ArmorClassService } from './armor-class.service.js';
import { ArmorClassDamageReductionService } from './armor-class-damage-reduction.service.js';
import { ArmorInstanceService } from './armor-instance.service.js';
import { ArmorInstanceAttributeService } from './armor-instance-attribute.service.js';
import { ArmorInstanceDamageReductionService } from './armor-instance-damage-reduction.service.js';
import { ArmorLocationService } from './armor-location.service.js';
import { GemService } from './gem.service.js';
import { GemRarityService } from './gem-rarity.service.js';
import { JewelryAttributeService } from './jewelry-attribute.service.js';
import { JewelryInstanceService } from './jewelry-instance.service.js';
import { JewelryInstanceAttributeService } from './jewelry-instance-attribute.service.js';
import { JewelryLocationService } from './jewelry-location.service.js';
import { LootTableService } from './loot-table.service.js';
import { MagicalPropertyService } from './magical-property.service.js';
import { PoisonTierService } from './poison-tier.service.js';
import { ShieldService } from './shield.service.js';
import { ShieldInstanceService } from './shield-instance.service.js';
import { SpecialMoveService } from './special-move.service.js';
import { SpellbookAttributeService } from './spellbook-attribute.service.js';
import { SpellbookInstanceService } from './spellbook-instance.service.js';
import { SpellbookInstanceAttributeService } from './spellbook-instance-attribute.service.js';
import { WeaponService } from './weapon.service.js';
import { WeaponAttributeService } from './weapon-attribute.service.js';
import { WeaponInstanceService } from './weapon-instance.service.js';
import { WeaponInstanceAttributeService } from './weapon-instance-attribute.service.js';
import { WeaponPoisonService } from './weapon-poison.service.js';
import { WeaponSkillService } from './weapon-skill.service.js';

// Controllers
import { ArmorController } from './armor.controller.js';
import { ArmorAttributeController } from './armor-attribute.controller.js';
import { ArmorBandController } from './armor-band.controller.js';
import { ArmorClassController } from './armor-class.controller.js';
import { ArmorClassDamageReductionController } from './armor-class-damage-reduction.controller.js';
import { ArmorInstanceController } from './armor-instance.controller.js';
import { ArmorInstanceAttributeController } from './armor-instance-attribute.controller.js';
import { ArmorInstanceDamageReductionController } from './armor-instance-damage-reduction.controller.js';
import { ArmorLocationController } from './armor-location.controller.js';
import { GemController } from './gem.controller.js';
import { GemRarityController } from './gem-rarity.controller.js';
import { JewelryAttributeController } from './jewelry-attribute.controller.js';
import { JewelryInstanceController } from './jewelry-instance.controller.js';
import { JewelryInstanceAttributeController } from './jewelry-instance-attribute.controller.js';
import { JewelryLocationController } from './jewelry-location.controller.js';
import { LootTableController } from './loot-table.controller.js';
import { MagicalPropertyController } from './magical-property.controller.js';
import { PoisonTierController } from './poison-tier.controller.js';
import { ShieldController } from './shield.controller.js';
import { ShieldInstanceController } from './shield-instance.controller.js';
import { SpecialMoveController } from './special-move.controller.js';
import { SpellbookAttributeController } from './spellbook-attribute.controller.js';
import { SpellbookInstanceController } from './spellbook-instance.controller.js';
import { SpellbookInstanceAttributeController } from './spellbook-instance-attribute.controller.js';
import { WeaponController } from './weapon.controller.js';
import { WeaponAttributeController } from './weapon-attribute.controller.js';
import { WeaponInstanceController } from './weapon-instance.controller.js';
import { WeaponInstanceAttributeController } from './weapon-instance-attribute.controller.js';
import { WeaponPoisonController } from './weapon-poison.controller.js';
import { WeaponSkillController } from './weapon-skill.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Armor,
      ArmorAttribute,
      ArmorBand,
      ArmorClass,
      ArmorClassDamageReduction,
      ArmorInstance,
      ArmorInstanceAttribute,
      ArmorInstanceDamageReduction,
      ArmorLocation,
      Gem,
      GemRarity,
      JewelryAttribute,
      JewelryInstance,
      JewelryInstanceAttribute,
      JewelryLocation,
      LootTable,
      MagicalProperty,
      PoisonTier,
      Shield,
      ShieldInstance,
      SpecialMove,
      SpellbookAttribute,
      SpellbookInstance,
      SpellbookInstanceAttribute,
      Weapon,
      WeaponAttribute,
      WeaponInstance,
      WeaponInstanceAttribute,
      WeaponPoison,
      WeaponSkill,
    ]),
  ],
  providers: [
    ArmorService,
    ArmorAttributeService,
    ArmorBandService,
    ArmorClassService,
    ArmorClassDamageReductionService,
    ArmorInstanceService,
    ArmorInstanceAttributeService,
    ArmorInstanceDamageReductionService,
    ArmorLocationService,
    GemService,
    GemRarityService,
    JewelryAttributeService,
    JewelryInstanceService,
    JewelryInstanceAttributeService,
    JewelryLocationService,
    LootTableService,
    MagicalPropertyService,
    PoisonTierService,
    ShieldService,
    ShieldInstanceService,
    SpecialMoveService,
    SpellbookAttributeService,
    SpellbookInstanceService,
    SpellbookInstanceAttributeService,
    WeaponService,
    WeaponAttributeService,
    WeaponInstanceService,
    WeaponInstanceAttributeService,
    WeaponPoisonService,
    WeaponSkillService,
  ],
  controllers: [
    ArmorController,
    ArmorAttributeController,
    ArmorBandController,
    ArmorClassController,
    ArmorClassDamageReductionController,
    ArmorInstanceController,
    ArmorInstanceAttributeController,
    ArmorInstanceDamageReductionController,
    ArmorLocationController,
    GemController,
    GemRarityController,
    JewelryAttributeController,
    JewelryInstanceController,
    JewelryInstanceAttributeController,
    JewelryLocationController,
    LootTableController,
    MagicalPropertyController,
    PoisonTierController,
    ShieldController,
    ShieldInstanceController,
    SpecialMoveController,
    SpellbookAttributeController,
    SpellbookInstanceController,
    SpellbookInstanceAttributeController,
    WeaponController,
    WeaponAttributeController,
    WeaponInstanceController,
    WeaponInstanceAttributeController,
    WeaponPoisonController,
    WeaponSkillController,
  ],
  exports: [
    ArmorService,
    ArmorAttributeService,
    ArmorBandService,
    ArmorClassService,
    ArmorClassDamageReductionService,
    ArmorInstanceService,
    ArmorInstanceAttributeService,
    ArmorInstanceDamageReductionService,
    ArmorLocationService,
    GemService,
    GemRarityService,
    JewelryAttributeService,
    JewelryInstanceService,
    JewelryInstanceAttributeService,
    JewelryLocationService,
    LootTableService,
    MagicalPropertyService,
    PoisonTierService,
    ShieldService,
    ShieldInstanceService,
    SpecialMoveService,
    SpellbookAttributeService,
    SpellbookInstanceService,
    SpellbookInstanceAttributeService,
    WeaponService,
    WeaponAttributeService,
    WeaponInstanceService,
    WeaponInstanceAttributeService,
    WeaponPoisonService,
    WeaponSkillService,
  ],
})
export class EquipmentModule {}
