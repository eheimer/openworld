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

### Dynamic Tables (read-write)

Runtime/session data owned by this project:
- Players, games, sessions
- Characters, character skills/conditions, inventories
- Spawned monster instances, their conditions and action state
- Generated/equipped weapon, armor, jewelry, spellbook instances
- Battles, combat state

**Rules**:
- This project owns dynamic table schemas — may add columns, tables, indexes as needed
- If dynamic table schemas are modified, communicate changes back to phase 1 for reference updates

### Source of Truth for Table Classification

`reference/dynamic-tables.sql` (from phase 1) is the canonical list of dynamic tables. Everything else in the database is static. The classification rule: "Does this data exist before any game session starts?" Yes → static. No → dynamic.

### TypeORM Configuration

- Single database connection, `synchronize: false`
- Schema changes go through migrations, not auto-sync
- Real FK enforcement between static and dynamic tables (single DB = real constraints)
- Static table entities should be treated as read-only in service code

## Domain Language

Preserve the game's domain terminology in code. Key terms from the phase 1 glossary:

- **Storage type**: `backpack_slot` (slot-based) or `resource_weight` (weight-based) — lives on `item_category`
- **Item category**: Grouping + behavioral classification (storage type, stack behavior, equip metadata)
- **Equip location**: Wearable paperdoll slots (head, neck, arms, hands, legs, body) — for armor, jewelry
- **Held slot**: Hand paperdoll slots (main hand, off hand) — for weapons, shields, tools, spellbooks
- **Recipe family**: Backend grouping of recipes within a crafting discipline
