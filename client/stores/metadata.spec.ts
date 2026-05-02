import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useMetadataStore } from './metadata';
import type { TableMeta } from '@/api/client';

vi.mock('@/api/client', () => ({
  fetchMetadata: vi.fn(),
}));

import { fetchMetadata } from '@/api/client';

const mockTables: TableMeta[] = [
  {
    name: 'Monster',
    route: 'monsters',
    displayName: 'Monster',
    columns: [{ name: 'id', type: 'number', nullable: false, isPrimary: true }],
    relations: [],
  },
  {
    name: 'Weapon',
    route: 'weapons',
    displayName: 'Weapon',
    columns: [{ name: 'id', type: 'number', nullable: false, isPrimary: true }],
    relations: [],
  },
  {
    name: 'Material',
    route: 'materials',
    displayName: 'Material',
    columns: [{ name: 'id', type: 'number', nullable: false, isPrimary: true }],
    relations: [],
  },
  {
    name: 'Character',
    route: 'characters',
    displayName: 'Character',
    columns: [{ name: 'id', type: 'number', nullable: false, isPrimary: true }],
    relations: [],
  },
  {
    name: 'MonsterInstance',
    route: 'monster-instances',
    displayName: 'Monster Instance',
    columns: [{ name: 'id', type: 'number', nullable: false, isPrimary: true }],
    relations: [],
  },
];

describe('Metadata Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.mocked(fetchMetadata).mockReset();
    vi.mocked(fetchMetadata).mockResolvedValue(mockTables);
  });

  it('load() fetches and caches data', async () => {
    const store = useMetadataStore();
    await store.load();

    expect(fetchMetadata).toHaveBeenCalledOnce();
    expect(store.tables).toEqual(mockTables);
    expect(store.loaded).toBe(true);
  });

  it('load() called twice only makes one API call', async () => {
    const store = useMetadataStore();
    await store.load();
    await store.load();

    expect(fetchMetadata).toHaveBeenCalledTimes(1);
  });

  it('getTable() returns correct table by route', async () => {
    const store = useMetadataStore();
    await store.load();

    expect(store.getTable('weapons')).toEqual(mockTables[1]);
    expect(store.getTable('nonexistent')).toBeUndefined();
  });

  it('getGroupedTables() groups tables under correct categories', async () => {
    const store = useMetadataStore();
    await store.load();

    const grouped = store.getGroupedTables();
    const groupMap = Object.fromEntries(grouped);

    // 'monsters' → Monsters
    expect(groupMap['Monsters']).toContainEqual(expect.objectContaining({ route: 'monsters' }));
    // 'weapons' → Weapons
    expect(groupMap['Weapons']).toContainEqual(expect.objectContaining({ route: 'weapons' }));
    // 'materials' → Crafting
    expect(groupMap['Crafting']).toContainEqual(expect.objectContaining({ route: 'materials' }));
    // 'characters' → Characters
    expect(groupMap['Characters']).toContainEqual(expect.objectContaining({ route: 'characters' }));
  });

  it('getTableType() classifies Canon vs Dynamic', async () => {
    const store = useMetadataStore();

    // 'monster-instances' is in TABLE_TYPE_MAP as Dynamic
    expect(store.getTableType('monster-instances')).toBe('Dynamic');
    // 'monsters' is not in TABLE_TYPE_MAP, defaults to Canon
    expect(store.getTableType('monsters')).toBe('Canon');
  });
});
