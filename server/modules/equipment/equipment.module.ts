import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Armor } from '../../entities/armor.entity.js';
import { ArmorAttribute } from '../../entities/armor-attribute.entity.js';
import { ArmorBand } from '../../entities/armor-band.entity.js';
import { ArmorClass } from '../../entities/armor-class.entity.js';
import { ArmorLocation } from '../../entities/armor-location.entity.js';
import { Gem } from '../../entities/gem.entity.js';
import { GemRarity } from '../../entities/gem-rarity.entity.js';
import { JewelryAttribute } from '../../entities/jewelry-attribute.entity.js';
import { JewelryLocation } from '../../entities/jewelry-location.entity.js';
import { LootTable } from '../../entities/loot-table.entity.js';
import { MagicalProperty } from '../../entities/magical-property.entity.js';
import { Shield } from '../../entities/shield.entity.js';
import { SpecialMove } from '../../entities/special-move.entity.js';
import { SpellbookAttribute } from '../../entities/spellbook-attribute.entity.js';
import { SpellbookInstance } from '../../entities/spellbook-instance.entity.js';
import { Weapon } from '../../entities/weapon.entity.js';
import { WeaponAttribute } from '../../entities/weapon-attribute.entity.js';
import { WeaponInstance } from '../../entities/weapon-instance.entity.js';
import { WeaponPoison } from '../../entities/weapon-poison.entity.js';
import { WeaponSkill } from '../../entities/weapon-skill.entity.js';

// Services
import { ArmorService } from './armor.service.js';
import { ArmorAttributeService } from './armor-attribute.service.js';
import { ArmorBandService } from './armor-band.service.js';
import { ArmorClassService } from './armor-class.service.js';
import { ArmorLocationService } from './armor-location.service.js';
import { GemService } from './gem.service.js';
import { GemRarityService } from './gem-rarity.service.js';
import { JewelryAttributeService } from './jewelry-attribute.service.js';
import { JewelryLocationService } from './jewelry-location.service.js';
import { LootTableService } from './loot-table.service.js';
import { MagicalPropertyService } from './magical-property.service.js';
import { ShieldService } from './shield.service.js';
import { SpecialMoveService } from './special-move.service.js';
import { SpellbookAttributeService } from './spellbook-attribute.service.js';
import { SpellbookInstanceService } from './spellbook-instance.service.js';
import { WeaponService } from './weapon.service.js';
import { WeaponAttributeService } from './weapon-attribute.service.js';
import { WeaponInstanceService } from './weapon-instance.service.js';
import { WeaponPoisonService } from './weapon-poison.service.js';
import { WeaponSkillService } from './weapon-skill.service.js';

// Controllers
import { ArmorController } from './armor.controller.js';
import { ArmorAttributeController } from './armor-attribute.controller.js';
import { ArmorBandController } from './armor-band.controller.js';
import { ArmorClassController } from './armor-class.controller.js';
import { ArmorLocationController } from './armor-location.controller.js';
import { GemController } from './gem.controller.js';
import { GemRarityController } from './gem-rarity.controller.js';
import { JewelryAttributeController } from './jewelry-attribute.controller.js';
import { JewelryLocationController } from './jewelry-location.controller.js';
import { LootTableController } from './loot-table.controller.js';
import { MagicalPropertyController } from './magical-property.controller.js';
import { ShieldController } from './shield.controller.js';
import { SpecialMoveController } from './special-move.controller.js';
import { SpellbookAttributeController } from './spellbook-attribute.controller.js';
import { SpellbookInstanceController } from './spellbook-instance.controller.js';
import { WeaponController } from './weapon.controller.js';
import { WeaponAttributeController } from './weapon-attribute.controller.js';
import { WeaponInstanceController } from './weapon-instance.controller.js';
import { WeaponPoisonController } from './weapon-poison.controller.js';
import { WeaponSkillController } from './weapon-skill.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Armor,
      ArmorAttribute,
      ArmorBand,
      ArmorClass,
      ArmorLocation,
      Gem,
      GemRarity,
      JewelryAttribute,
      JewelryLocation,
      LootTable,
      MagicalProperty,
      Shield,
      SpecialMove,
      SpellbookAttribute,
      SpellbookInstance,
      Weapon,
      WeaponAttribute,
      WeaponInstance,
      WeaponPoison,
      WeaponSkill,
    ]),
  ],
  providers: [
    ArmorService,
    ArmorAttributeService,
    ArmorBandService,
    ArmorClassService,
    ArmorLocationService,
    GemService,
    GemRarityService,
    JewelryAttributeService,
    JewelryLocationService,
    LootTableService,
    MagicalPropertyService,
    ShieldService,
    SpecialMoveService,
    SpellbookAttributeService,
    SpellbookInstanceService,
    WeaponService,
    WeaponAttributeService,
    WeaponInstanceService,
    WeaponPoisonService,
    WeaponSkillService,
  ],
  controllers: [
    ArmorController,
    ArmorAttributeController,
    ArmorBandController,
    ArmorClassController,
    ArmorLocationController,
    GemController,
    GemRarityController,
    JewelryAttributeController,
    JewelryLocationController,
    LootTableController,
    MagicalPropertyController,
    ShieldController,
    SpecialMoveController,
    SpellbookAttributeController,
    SpellbookInstanceController,
    WeaponController,
    WeaponAttributeController,
    WeaponInstanceController,
    WeaponPoisonController,
    WeaponSkillController,
  ],
  exports: [
    ArmorService,
    ArmorAttributeService,
    ArmorBandService,
    ArmorClassService,
    ArmorLocationService,
    GemService,
    GemRarityService,
    JewelryAttributeService,
    JewelryLocationService,
    LootTableService,
    MagicalPropertyService,
    ShieldService,
    SpecialMoveService,
    SpellbookAttributeService,
    SpellbookInstanceService,
    WeaponService,
    WeaponAttributeService,
    WeaponInstanceService,
    WeaponPoisonService,
    WeaponSkillService,
  ],
})
export class EquipmentModule {}
