import { MetadataService, toRoute, toDisplayName } from './metadata.service';
import { DataSource } from 'typeorm';

describe('toRoute()', () => {
  it('pluralizes a single word', () => {
    expect(toRoute('Monster')).toBe('monsters');
  });

  it('converts multi-word PascalCase to kebab-case plural', () => {
    expect(toRoute('MonsterAction')).toBe('monster-actions');
  });

  it('handles -y after consonant → ies', () => {
    expect(toRoute('ItemCategory')).toBe('item-categories');
  });

  it('handles -s suffix → es', () => {
    expect(toRoute('ArmorClass')).toBe('armor-classes');
  });

  it('handles -x suffix → es', () => {
    expect(toRoute('DamageBox')).toBe('damage-boxes');
  });

  it('handles -ch suffix → es', () => {
    expect(toRoute('Witch')).toBe('witches');
  });

  it('handles -sh suffix → es', () => {
    expect(toRoute('Brush')).toBe('brushes');
  });
});

describe('toDisplayName()', () => {
  it('inserts spaces before uppercase letters', () => {
    expect(toDisplayName('MonsterAction')).toBe('Monster Action');
  });

  it('returns single word unchanged', () => {
    expect(toDisplayName('Monster')).toBe('Monster');
  });
});

describe('MetadataService.getAll()', () => {
  it('returns table metadata with correct structure, excludes timestamps, and derives routes', () => {
    const mockDataSource = {
      entityMetadatas: [
        {
          targetName: 'MonsterAction',
          columns: [
            { propertyName: 'id', type: 'integer', isNullable: false, isPrimary: true },
            { propertyName: 'name', type: 'varchar', isNullable: false, isPrimary: false },
            { propertyName: 'isActive', type: 'boolean', isNullable: false, isPrimary: false },
            { propertyName: 'createdAt', type: 'datetime', isNullable: false, isPrimary: false },
            { propertyName: 'updatedAt', type: 'datetime', isNullable: false, isPrimary: false },
          ],
          relations: [
            {
              propertyName: 'monster',
              relationType: 'many-to-one',
              inverseEntityMetadata: { targetName: 'Monster' },
              joinColumns: [{ databaseName: 'monsterId' }],
            },
          ],
        },
      ],
    } as unknown as DataSource;

    const service = new MetadataService(mockDataSource);
    const result = service.getAll();

    expect(result).toHaveLength(1);

    const table = result[0];
    expect(table.name).toBe('MonsterAction');
    expect(table.route).toBe('monster-actions');
    expect(table.displayName).toBe('Monster Action');

    // createdAt and updatedAt excluded
    const columnNames = table.columns.map((c) => c.name);
    expect(columnNames).toContain('id');
    expect(columnNames).toContain('name');
    expect(columnNames).toContain('isActive');
    expect(columnNames).not.toContain('createdAt');
    expect(columnNames).not.toContain('updatedAt');

    // Column types mapped correctly
    const idCol = table.columns.find((c) => c.name === 'id')!;
    expect(idCol.type).toBe('number');
    expect(idCol.isPrimary).toBe(true);

    const nameCol = table.columns.find((c) => c.name === 'name')!;
    expect(nameCol.type).toBe('string');

    const boolCol = table.columns.find((c) => c.name === 'isActive')!;
    expect(boolCol.type).toBe('boolean');

    // Relation mapped correctly
    expect(table.relations).toHaveLength(1);
    const rel = table.relations[0];
    expect(rel.propertyName).toBe('monster');
    expect(rel.relationType).toBe('many-to-one');
    expect(rel.targetEntity).toBe('Monster');
    expect(rel.targetRoute).toBe('monsters');
    expect(rel.joinColumn).toBe('monsterId');
  });
});
