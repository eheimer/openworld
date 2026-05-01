import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

export interface ColumnMeta {
  name: string;
  type: string;
  nullable: boolean;
  isPrimary: boolean;
}

export interface RelationMeta {
  propertyName: string;
  relationType: string;
  targetEntity: string;
  targetRoute: string;
  joinColumn?: string;
}

export interface TableMeta {
  name: string;
  route: string;
  displayName: string;
  columns: ColumnMeta[];
  relations: RelationMeta[];
}

/**
 * Convert a PascalCase entity name to a kebab-case pluralized route.
 * Algorithm: split on uppercase boundaries → lowercase → join with hyphens → pluralize.
 */
export function toRoute(name: string): string {
  const kebab = name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();

  return pluralize(kebab);
}

/**
 * Insert spaces before uppercase letters to produce a human-readable display name.
 */
export function toDisplayName(name: string): string {
  return name.replace(/([A-Z])/g, ' $1').trim();
}

function pluralize(word: string): string {
  if (word.endsWith('sh') || word.endsWith('ch') || word.endsWith('x') || word.endsWith('z') || word.endsWith('s')) {
    return word + 'es';
  }
  if (word.endsWith('y')) {
    const beforeY = word[word.length - 2];
    const consonants = 'bcdfghjklmnpqrstvwxz';
    if (consonants.includes(beforeY)) {
      return word.slice(0, -1) + 'ies';
    }
  }
  return word + 's';
}

function mapColumnType(colType: string | Function): string {
  const type = typeof colType === 'function' ? colType.name.toLowerCase() : String(colType).toLowerCase();

  if (['varchar', 'character varying', 'char', 'character', 'uuid'].includes(type)) {
    return 'string';
  }
  if (['int', 'integer', 'smallint', 'bigint', 'float', 'double', 'decimal', 'numeric', 'real', 'number'].includes(type)) {
    return 'number';
  }
  if (['boolean', 'bool', 'tinyint'].includes(type)) {
    return 'boolean';
  }
  if (type === 'text') {
    return 'text';
  }
  return 'string';
}

@Injectable()
export class MetadataService {
  constructor(private dataSource: DataSource) {}

  getAll(): TableMeta[] {
    return this.dataSource.entityMetadatas
      .filter((meta) => meta.targetName)
      .map((meta) => {
        const columns: ColumnMeta[] = meta.columns
          .filter((col) => !['createdAt', 'updatedAt'].includes(col.propertyName))
          .map((col) => ({
            name: col.propertyName,
            type: mapColumnType(col.type),
            nullable: col.isNullable,
            isPrimary: col.isPrimary,
          }));

        const relations: RelationMeta[] = meta.relations.map((rel) => {
          const targetName = rel.inverseEntityMetadata.targetName;
          return {
            propertyName: rel.propertyName,
            relationType: rel.relationType,
            targetEntity: targetName,
            targetRoute: toRoute(targetName),
            joinColumn: rel.joinColumns?.[0]?.databaseName,
          };
        });

        const entityName = meta.targetName;
        return {
          name: entityName,
          route: toRoute(entityName),
          displayName: toDisplayName(entityName),
          columns,
          relations,
        };
      });
  }
}
