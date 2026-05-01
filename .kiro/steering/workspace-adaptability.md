---
inclusion: always
---

# Workspace-Specific Patterns

## Project Structure

**Unified monorepo**: NestJS backend in `server/`, Vue 3 frontend in `client/`, single `package.json` at root.

## Build

**Full build**: `npm run build` (builds UI first, then API).
**API only**: `npm run build:api` (uses `nest build`).
**UI only**: `npm run build:ui` (uses `vite build`).

## Development

**Both servers**: `npm run dev` (concurrently runs API + UI).
**API dev**: `npm run dev:api` (nest start --watch on port 3000).
**UI dev**: `npm run dev:ui` (vite on port 5173, proxies /api to :3000).

## Testing

**Test runner**: Vitest (not Jest). Run with `npm test` which executes `vitest --run`.
**Config**: `vitest.config.ts` at root, includes both `server/**/*.spec.ts` and `client/**/*.spec.ts`.
**Environment**: jsdom with globals enabled.
**Test pattern**: Service unit tests live alongside their module files (e.g., `server/modules/combat/combat.service.spec.ts`). Tests mock the TypeORM Repository and instantiate the service directly.

## TypeScript

**Server tsconfig**: `tsconfig.server.json` — ES2023, nodenext modules, emitDecoratorMetadata.
**Client tsconfig**: `tsconfig.client.json` — extends `@vue/tsconfig/tsconfig.dom.json`, `@/*` alias to `./client/*`.
**Root tsconfig**: project references only, no direct compilation.

## Server Conventions

- All API routes prefixed with `/api/`.
- Swagger docs at `/api/docs`.
- `@nestjs/serve-static` serves built Vue app from `dist/client/` in production.
- Base CRUD pattern in `server/common/` — extend `BaseCrudService` and `BaseCrudController`.
- Server uses `.js` extensions in imports (nodenext module resolution).
- Entity definitions in `server/entities/` (flat directory, all entities together).
- Domain modules in `server/modules/` (grouped by functional area).

## Module Architecture

Modules are grouped by domain. Each module registers multiple related entities, services, and controllers:

```
server/modules/
  auth/          — Login, register, JWT (custom, not CRUD)
  metadata/      — Entity introspection for admin UI (custom)
  players/       — Player CRUD + auth-related lookups
  combat/        — Monster, MonsterAction, MonsterInstance, MonsterCondition,
                   Action, Condition, ConditionOverride, CharacterCondition,
                   DamageType, SlayerType
  equipment/     — Weapon, WeaponAttribute, WeaponSkill, WeaponInstance,
                   WeaponPoison, SpecialMove, Armor, ArmorAttribute, ArmorBand,
                   ArmorClass, ArmorLocation, Shield, Gem, GemRarity,
                   JewelryAttribute, JewelryLocation, SpellbookAttribute,
                   SpellbookInstance, MagicalProperty, LootTable
  magic/         — Spell, SpellSchool
  crafting/      — Material, MaterialType, Recipe, RecipeFamily,
                   RecipeIngredient, RunicAffixPool, RunicAffixPoolEntry,
                   RunicItemRuleGroup, RunicToolFamily,
                   RunicToolFamilyRuleGroup, RunicToolTier
  characters/    — Character, Race, Skill
  inventory/     — Inventory, StorageItem, StorageItemCategory, StorageType,
                   ReloadFamily, EquipLocation, HeldSlot
```

Each service file is named after its entity (e.g., `monster.service.ts` inside `combat/`). Each controller file follows the same pattern. The module file (e.g., `combat.module.ts`) registers all entities, services, and controllers for the group.

## Cross-Module Dependencies (Game Logic)

When adding game logic that requires services from other modules, follow these rules to avoid circular dependencies:

### Rule 1: Prefer Repository injection over Service injection

If you only need simple queries against another module's entity, inject the TypeORM Repository directly instead of importing the other module's service. Repositories are globally available via `TypeOrmModule.forFeature()` — no module import needed.

```typescript
// GOOD: No cross-module dependency
@Injectable()
export class CombatService {
  constructor(
    @InjectRepository(Weapon) private weaponRepo: Repository<Weapon>,
  ) {}
}

// AVOID: Creates a module dependency
@Injectable()
export class CombatService {
  constructor(private weaponService: WeaponService) {}
}
```

### Rule 2: When you genuinely need another module's service

If you need business logic from another module (not just data access), import the module:

```typescript
@Module({
  imports: [EquipmentModule],  // Makes exported services available
  // ...
})
export class CombatModule {}
```

This is safe as long as the dependency is one-directional. Check the dependency direction before adding imports.

### Rule 3: Break circular dependencies with a shared module

If Module A needs Module B's service AND Module B needs Module A's service, extract the shared logic into a new module that both depend on:

```
BEFORE (circular):  CombatModule ↔ EquipmentModule
AFTER (resolved):   CombatModule → SharedCombatEquipModule ← EquipmentModule
```

### Rule 4: Use forwardRef() as a last resort

NestJS `forwardRef()` can break circular module references, but it makes the dependency graph harder to reason about. Prefer restructuring over forwardRef.

### Rule 5: Entity files can cross-reference freely

Entity files (in `server/entities/`) are plain TypeORM-decorated classes. They can import each other for relation decorators without any NestJS module system concerns. The circular dependency risk is only at the module/service level.

### Dependency flow (current, no game logic yet)

All modules are currently independent leaf nodes — no module imports another domain module. The only shared dependency is `TypeOrmModule.forFeature()` for entity registration. This will change as game logic is added.

## Client Conventions

- PrimeVue with Aura theme, ToastService, ConfirmationService.
- Axios-based API client at `client/api/client.ts` with typed helpers.
- Pinia for state management.
- `@` alias maps to `./client/`.

## Database

**Initialization**: `npm run db:init` — copies phase 1 database, applies dynamic DDL, runs phase 2 migrations.
**Location**: `data/game.sqlite` (gitignored, recreatable).
**Phase 1 source**: `../reboot/reference/dev.sqlite` + `../reboot/reference/dynamic-tables.sql`.
**Phase 2 migrations**: `migrations/*.sql` — numbered sequentially, run by `db:init`.

## Git Workflow

**Branch strategy**: This project commits directly to `master`. No feature branches, no pull requests.

When the user says "commit and push", commit all staged changes to `master` and push to `origin/master`. Do not create feature branches or suggest PRs.

```bash
git add <files>
git commit -m "descriptive message"
git push origin master
```

If the push is rejected due to remote changes, pull with rebase first: `git pull --rebase origin master`, then push again.
