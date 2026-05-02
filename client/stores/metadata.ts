import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchMetadata, type TableMeta } from '@/api/client';

export type TableType = 'Canon' | 'Dynamic' | 'Junction';

export const TABLE_TYPE_MAP: Record<string, TableType> = {
  // Dynamic tables (⚡)
  'armor-instances': 'Dynamic',
  'armor-instance-attributes': 'Dynamic',
  'armor-instance-damage-reductions': 'Dynamic',
  'battles': 'Dynamic',
  'characters': 'Dynamic',
  'character-conditions': 'Dynamic',
  'character-skills': 'Dynamic',
  'games': 'Dynamic',
  'inventories': 'Dynamic',
  'jewelry-instances': 'Dynamic',
  'jewelry-instance-attributes': 'Dynamic',
  'monster-conditions': 'Dynamic',
  'monster-instances': 'Dynamic',
  'players': 'Dynamic',
  'shield-instances': 'Dynamic',
  'spellbook-instances': 'Dynamic',
  'spellbook-instance-attributes': 'Dynamic',
  'weapon-instances': 'Dynamic',
  'weapon-instance-attributes': 'Dynamic',
  'weapon-poisons': 'Dynamic',

  // Junction tables (🔗)
  'condition-overrides': 'Junction',
  'race-skills': 'Junction',
};

export const useMetadataStore = defineStore('metadata', () => {
  const tables = ref<TableMeta[]>([]);
  const loaded = ref(false);

  async function load() {
    if (loaded.value) return;
    tables.value = await fetchMetadata();
    loaded.value = true;
  }

  function getTable(route: string): TableMeta | undefined {
    return tables.value.find((t) => t.route === route);
  }

  function getGroupedTables() {
    const groups: Record<string, TableMeta[]> = {
      'Monsters': [],
      'Characters': [],
      'Combat': [],
      'Weapons': [],
      'Armor': [],
      'Jewelry & Spellbooks': [],
      'Magic': [],
      'Crafting': [],
      'Inventory': [],
      'Other': [],
    };

    const categoryMap: Record<string, string> = {
      // Monsters
      'monsters': 'Monsters',
      'monster-actions': 'Monsters',
      'monster-conditions': 'Monsters',
      'monster-instances': 'Monsters',

      // Characters
      'characters': 'Characters',
      'character-conditions': 'Characters',
      'character-skills': 'Characters',
      'races': 'Characters',
      'race-skills': 'Characters',
      'players': 'Characters',
      'games': 'Characters',

      // Combat
      'actions': 'Combat',
      'battles': 'Combat',
      'conditions': 'Combat',
      'condition-overrides': 'Combat',
      'damage-types': 'Combat',
      'poison-tiers': 'Combat',
      'slayer-types': 'Combat',
      'special-moves': 'Combat',

      // Weapons
      'weapons': 'Weapons',
      'weapon-attributes': 'Weapons',
      'weapon-instances': 'Weapons',
      'weapon-instance-attributes': 'Weapons',
      'weapon-poisons': 'Weapons',
      'weapon-skills': 'Weapons',

      // Armor
      'armors': 'Armor',
      'armor-attributes': 'Armor',
      'armor-bands': 'Armor',
      'armor-classes': 'Armor',
      'armor-class-damage-reductions': 'Armor',
      'armor-instances': 'Armor',
      'armor-instance-attributes': 'Armor',
      'armor-instance-damage-reductions': 'Armor',
      'armor-locations': 'Armor',
      'shields': 'Armor',
      'shield-instances': 'Armor',

      // Jewelry & Spellbooks
      'gems': 'Jewelry & Spellbooks',
      'gem-rarities': 'Jewelry & Spellbooks',
      'jewelry-attributes': 'Jewelry & Spellbooks',
      'jewelry-instances': 'Jewelry & Spellbooks',
      'jewelry-instance-attributes': 'Jewelry & Spellbooks',
      'jewelry-locations': 'Jewelry & Spellbooks',
      'spellbook-attributes': 'Jewelry & Spellbooks',
      'spellbook-instances': 'Jewelry & Spellbooks',
      'spellbook-instance-attributes': 'Jewelry & Spellbooks',

      // Magic
      'spells': 'Magic',
      'spell-schools': 'Magic',
      'magical-properties': 'Magic',

      // Crafting
      'materials': 'Crafting',
      'material-types': 'Crafting',
      'material-overlays': 'Crafting',
      'recipes': 'Crafting',
      'recipe-families': 'Crafting',
      'recipe-ingredients': 'Crafting',
      'runic-affix-pools': 'Crafting',
      'runic-affix-pool-entries': 'Crafting',
      'runic-item-rule-groups': 'Crafting',
      'runic-tool-families': 'Crafting',
      'runic-tool-family-rule-groups': 'Crafting',
      'runic-tool-tiers': 'Crafting',

      // Inventory
      'inventories': 'Inventory',
      'storage-items': 'Inventory',
      'storage-item-categories': 'Inventory',
      'storage-types': 'Inventory',
      'loot-tables': 'Inventory',

      // Other
      'equip-locations': 'Other',
      'held-slots': 'Other',
      'maps': 'Other',
      'reload-families': 'Other',
      'skills': 'Other',
    };

    for (const table of tables.value) {
      const group = categoryMap[table.route] || 'Other';
      const arr = groups[group];
      if (arr) arr.push(table);
    }

    return Object.entries(groups).filter(([, items]) => items.length > 0);
  }

  function getTableType(route: string): TableType {
    return TABLE_TYPE_MAP[route] ?? 'Canon';
  }

  function getTablesByType(): Record<TableType, TableMeta[]> {
    const grouped: Record<TableType, TableMeta[]> = {
      Canon: [],
      Dynamic: [],
      Junction: [],
    };
    for (const table of tables.value) {
      grouped[getTableType(table.route)].push(table);
    }
    return grouped;
  }

  return { tables, loaded, load, getTable, getGroupedTables, getTableType, getTablesByType };
});
