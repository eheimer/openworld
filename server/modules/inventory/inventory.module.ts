import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from '../../entities/inventory.entity.js';
import { StorageItem } from '../../entities/storage-item.entity.js';
import { StorageItemCategory } from '../../entities/storage-item-category.entity.js';
import { StorageType } from '../../entities/storage-type.entity.js';
import { ReloadFamily } from '../../entities/reload-family.entity.js';
import { EquipLocation } from '../../entities/equip-location.entity.js';
import { HeldSlot } from '../../entities/held-slot.entity.js';
import { InventoryService } from './inventory.service.js';
import { InventoryController } from './inventory.controller.js';
import { StorageItemService } from './storage-item.service.js';
import { StorageItemController } from './storage-item.controller.js';
import { StorageItemCategoryService } from './storage-item-category.service.js';
import { StorageItemCategoryController } from './storage-item-category.controller.js';
import { StorageTypeService } from './storage-type.service.js';
import { StorageTypeController } from './storage-type.controller.js';
import { ReloadFamilyService } from './reload-family.service.js';
import { ReloadFamilyController } from './reload-family.controller.js';
import { EquipLocationService } from './equip-location.service.js';
import { EquipLocationController } from './equip-location.controller.js';
import { HeldSlotService } from './held-slot.service.js';
import { HeldSlotController } from './held-slot.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Inventory,
      StorageItem,
      StorageItemCategory,
      StorageType,
      ReloadFamily,
      EquipLocation,
      HeldSlot,
    ]),
  ],
  providers: [
    InventoryService,
    StorageItemService,
    StorageItemCategoryService,
    StorageTypeService,
    ReloadFamilyService,
    EquipLocationService,
    HeldSlotService,
  ],
  controllers: [
    InventoryController,
    StorageItemController,
    StorageItemCategoryController,
    StorageTypeController,
    ReloadFamilyController,
    EquipLocationController,
    HeldSlotController,
  ],
  exports: [
    InventoryService,
    StorageItemService,
    StorageItemCategoryService,
    StorageTypeService,
    ReloadFamilyService,
    EquipLocationService,
    HeldSlotService,
  ],
})
export class InventoryModule {}
