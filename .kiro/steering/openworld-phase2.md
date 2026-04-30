---
inclusion: always
---

# Open World Game — Phase 2: Game Logic, API & Client

## Project Overview

This is the game application for a tabletop-style open world game. It consumes a read-only SQLite database of static game data produced by phase 1 (the schema project) and manages its own dynamic SQLite database for runtime/session data.

Phase 1 defines what exists in the game world. Phase 2 defines what happens in it.

## Tech Stack

- **Backend**: NestJS + TypeORM + better-sqlite3
- **Frontend**: Vue 3 + PrimeVue (Aura theme) + Pinia + TypeScript
- **Testing**: Vitest
- **Build**: Vite (client), nest build (server), concurrently (dev)

## Single-Database Architecture

This project uses a single SQLite database file containing both static game data and dynamic runtime data. The starting point is a copy of phase 1's `reference/dev.sqlite` with the dynamic tables from `reference/dynamic-tables.sql` applied on top.

### Static Tables (read-only by convention)

Core game definitions owned by phase 1:
- Monsters, races, skills, conditions, damage types, slayer types
- Weapons, armor classes, materials, gems, spells
- Special moves, equip locations, item categories
- Crafting recipes, loot tables

**Rules**:
- Never write to static tables at runtime — treat as read-only in application code
- Never alter static table schemas — phase 1 owns them
- Entity definitions must match the phase 1 schema exactly

### Dynamic Tables (read-write, data only)

Runtime/session data. Phase 1 owns the schema, phase 2 owns the data:
- Players, games, sessions
- Characters, character skills/conditions, inventories
- Spawned monster instances, their conditions and action state
- Generated/equipped weapon, armor, jewelry, spellbook instances
- Battles, combat state

**Rules**:
- Phase 2 owns dynamic table **data** — INSERT, UPDATE, DELETE at runtime
- Phase 2 does **not** own dynamic table **schemas** — no CREATE TABLE, ALTER TABLE, DROP TABLE
- If phase 2 needs a schema change, request it from phase 1
- Phase 1 will update `reference/dynamic-tables.sql` and cut a new schema release

### Source of Truth for Table Classification

`reference/dynamic-tables.sql` (from phase 1) is the canonical list of dynamic tables. Everything else in the database is static. The classification rule: "Does this data exist before any game session starts?" Yes → static. No → dynamic.

### TypeORM Configuration

- Single database connection, `synchronize: false`
- Database path: `data/game.sqlite` (gitignored — created by `npm run db:init`)
- Schema changes go through migrations, not auto-sync
- Real FK enforcement between static and dynamic tables (single DB = real constraints)
- Static table entities should be treated as read-only in service code

### Database Initialization

Run `npm run db:init` to create the local database. This script:
1. Copies `reference/dev.sqlite` from the phase 1 project (`../reboot/`)
2. Applies `reference/dynamic-tables.sql` to add runtime tables
3. Runs all phase 2 seed migrations from `migrations/*.sql` in order

The resulting `data/game.sqlite` is gitignored — it's a derived artifact, not source of truth. Any developer can recreate it by running the init script.

### Phase 2 Migrations

Phase 2 seed migrations live in `migrations/` and are numbered sequentially. They contain **DML only** (INSERT, UPDATE, DELETE) against **dynamic tables only**:

```
migrations/
  001-seed-test-player.sql
  002-default-game-config.sql
```

**Ownership rules**:
- **Phase 1 owns all DDL** — both static and dynamic table schemas. If phase 2 needs a schema change (new column, new table, altered constraint), it must be requested from phase 1.
- **Phase 1 owns all static table DML** — seed data for monsters, skills, weapons, etc. Phase 2 never writes to static tables.
- **Phase 2 owns dynamic table DML only** — seed data for test players, default game configs, etc.
- Phase 2 migrations must never contain `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE`, or any writes to static tables.

The `db:init` script runs phase 2 migrations after copying the database, so the local DB always starts in a known-good state. The database is ephemeral — it can be blown away and recreated at any time.

## Domain Language

Preserve the game's domain terminology in code. Key terms from the phase 1 glossary:

- **Storage type**: `backpack_slot` (slot-based) or `resource_weight` (weight-based) — lives on `item_category`
- **Item category**: Grouping + behavioral classification (storage type, stack behavior, equip metadata)
- **Equip location**: Wearable paperdoll slots (head, neck, arms, hands, legs, body) — for armor, jewelry
- **Held slot**: Hand paperdoll slots (main hand, off hand) — for weapons, shields, tools, spellbooks
- **Recipe family**: Backend grouping of recipes within a crafting discipline
