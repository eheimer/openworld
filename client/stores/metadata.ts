import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchMetadata, type TableMeta } from '@/api/client';

export type TableType = 'Canon' | 'Dynamic' | 'Junction';

export const TABLE_TYPE_MAP: Record<string, TableType> = {
  // Dynamic tables (⚡)
  'weapon-poisons': 'Dynamic',
  'monster-instances': 'Dynamic',
  'character-conditions': 'Dynamic',
  'monster-conditions': 'Dynamic',
  'weapon-instances': 'Dynamic',
  'spellbook-instances': 'Dynamic',
  'inventories': 'Dynamic',
  'players': 'Dynamic',
  'games': 'Dynamic',
  'characters': 'Dynamic',
  'character-skills': 'Dynamic',
  'battles': 'Dynamic',
  'armor-instances': 'Dynamic',
  'armor-instance-attributes': 'Dynamic',
  'armor-instance-damage-reductions': 'Dynamic',
  'jewelry-instances': 'Dynamic',
  'jewelry-instance-attributes': 'Dynamic',
  'weapon-instance-attributes': 'Dynamic',
  'spellbook-instance-attributes': 'Dynamic',

  // Junction tables (🔗)
  'condition-overrides': 'Junction',
  'race-skills': 'Junction',
  'monster-slayers': 'Junction',
  'armor-locations': 'Junction',
  'jewelry-locations': 'Junction',
  'player-games': 'Junction',
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
      'Combat': [],
      'Equipment': [],
      'Crafting': [],
      'Characters': [],
      'Lookup Tables': [],
    };

    const categoryMap: Record<string, string> = {
      'monsters': 'Combat',
      'monster-actions': 'Combat',
      'monster-instances': 'Combat',
      'monster-conditions': 'Combat',
      'damage-types': 'Combat',
      'conditions': 'Combat',
      'condition-overrides': 'Combat',
      'character-conditions': 'Combat',
      'slayer-types': 'Combat',
      'actions': 'Combat',
      'weapons': 'Equipment',
      'weapon-attributes': 'Equipment',
      'weapon-skills': 'Equipment',
      'weapon-instances': 'Equipment',
      'weapon-instance-attributes': 'Equipment',
      'weapon-poisons': 'Equipment',
      'special-moves': 'Equipment',
      'armor-classes': 'Equipment',
      'armor-attributes': 'Equipment',
      'armor-locations': 'Equipment',
      'armor-bands': 'Equipment',
      'armor-carry-costs': 'Equipment',
      'gems': 'Equipment',
      'gem-rarities': 'Equipment',
      'jewelry-attributes': 'Equipment',
      'jewelry-locations': 'Equipment',
      'spellbook-attributes': 'Equipment',
      'spellbook-instances': 'Equipment',
      'magical-properties': 'Equipment',
      'materials': 'Crafting',
      'material-types': 'Crafting',
      'races': 'Characters',
      'skills': 'Characters',
      'characters': 'Characters',
      'inventories': 'Characters',
      'items': 'Characters',
      'spells': 'Equipment',
      'spell-schools': 'Equipment',
      'loot-tables': 'Equipment',
      'equip-locations': 'Lookup Tables',
      'item-categories': 'Lookup Tables',
      'held-slots': 'Lookup Tables',
      'held-slot-occupancies': 'Lookup Tables',
      'storage-types': 'Lookup Tables',
      'reload-families': 'Lookup Tables',
    };

    for (const table of tables.value) {
      const group = categoryMap[table.route] || 'Lookup Tables';
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
