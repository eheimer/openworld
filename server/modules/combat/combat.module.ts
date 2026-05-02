import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Action } from '../../entities/action.entity.js';
import { Battle } from '../../entities/battle.entity.js';
import { Condition } from '../../entities/condition.entity.js';
import { ConditionOverride } from '../../entities/condition-override.entity.js';
import { CharacterCondition } from '../../entities/character-condition.entity.js';
import { DamageType } from '../../entities/damage-type.entity.js';
import { Monster } from '../../entities/monster.entity.js';
import { MonsterAction } from '../../entities/monster-action.entity.js';
import { MonsterCondition } from '../../entities/monster-condition.entity.js';
import { MonsterInstance } from '../../entities/monster-instance.entity.js';
import { SlayerType } from '../../entities/slayer-type.entity.js';

// Services
import { ActionService } from './action.service.js';
import { BattleService } from './battle.service.js';
import { ConditionService } from './condition.service.js';
import { ConditionOverrideService } from './condition-override.service.js';
import { CharacterConditionService } from './character-condition.service.js';
import { DamageTypeService } from './damage-type.service.js';
import { MonsterService } from './monster.service.js';
import { MonsterActionService } from './monster-action.service.js';
import { MonsterConditionService } from './monster-condition.service.js';
import { MonsterInstanceService } from './monster-instance.service.js';
import { SlayerTypeService } from './slayer-type.service.js';

// Controllers
import { ActionController } from './action.controller.js';
import { BattleController } from './battle.controller.js';
import { ConditionController } from './condition.controller.js';
import { ConditionOverrideController } from './condition-override.controller.js';
import { CharacterConditionController } from './character-condition.controller.js';
import { DamageTypeController } from './damage-type.controller.js';
import { MonsterController } from './monster.controller.js';
import { MonsterActionController } from './monster-action.controller.js';
import { MonsterConditionController } from './monster-condition.controller.js';
import { MonsterInstanceController } from './monster-instance.controller.js';
import { SlayerTypeController } from './slayer-type.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Action, Battle, Condition, ConditionOverride, CharacterCondition,
      DamageType, Monster, MonsterAction, MonsterCondition,
      MonsterInstance, SlayerType,
    ]),
  ],
  providers: [
    ActionService, BattleService, ConditionService, ConditionOverrideService,
    CharacterConditionService, DamageTypeService, MonsterService,
    MonsterActionService, MonsterConditionService, MonsterInstanceService,
    SlayerTypeService,
  ],
  controllers: [
    ActionController, BattleController, ConditionController, ConditionOverrideController,
    CharacterConditionController, DamageTypeController, MonsterController,
    MonsterActionController, MonsterConditionController, MonsterInstanceController,
    SlayerTypeController,
  ],
  exports: [
    ActionService, BattleService, ConditionService, ConditionOverrideService,
    CharacterConditionService, DamageTypeService, MonsterService,
    MonsterActionService, MonsterConditionService, MonsterInstanceService,
    SlayerTypeService,
  ],
})
export class CombatModule {}
