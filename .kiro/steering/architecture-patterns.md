---
inclusion: always
---

# Architecture Patterns

These patterns are derived from the original openworld_api project (reference) and the phase 1 admin app. They define how code should be structured in this project.

## Library Documentation via Context7

When implementing features that involve TypeORM, NestJS, PrimeVue, Pinia, Vue Router, Passport, or any other library in the stack, use the Context7 MCP tool to look up current documentation before writing code. This ensures we use up-to-date APIs and avoid deprecated patterns. Context7 is especially important for:

- **TypeORM**: entity decorators, query builder, relations, migrations, subscriber API
- **NestJS**: module system, guards, interceptors, pipes, middleware, Swagger decorators
- **PrimeVue**: component props, events, slots, theming API
- **Passport/JWT**: strategy configuration, guard patterns
- **Vue 3**: Composition API, reactivity, lifecycle hooks
- **Pinia**: store definition, actions, getters

Always prefer Context7 docs over guessing at API signatures.

## Entity Pattern

All entities extend a shared `BaseEntity` abstract class:

```typescript
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

Entity conventions:
- Class name: PascalCase (`MonsterInstance`)
- Table name: snake_case via `@Entity('monster_instance')`
- FK columns: explicit `@Column({ nullable: true }) skillId: number` alongside the `@ManyToOne` relation
- Relations: `@ManyToOne(() => Target) @JoinColumn({ name: 'skillId' }) skill: Target`
- Nullable FKs: `{ nullable: true }` on both the column and the relation

### Abstract Entity Classes for Shared Patterns

When multiple entities share the same column structure, use abstract base classes (not interfaces). Examples from the old project:
- `ActiveCondition` — shared by `CharacterCondition` and `MonsterCondition`
- `MagicalItemAttribute` — shared by weapon/armor/jewelry/spellbook instance attributes

## Module Organization

### Static Entity Modules (read-only data)

Simple CRUD modules that extend the base classes. One module per entity:

```
server/modules/<entity-name>/
  <entity-name>.module.ts
  <entity-name>.service.ts
  <entity-name>.controller.ts
```

Entity files live in `server/entities/` (shared across modules).

### Game Logic Modules (dynamic data with business logic)

Richer modules with DTOs, custom service methods, guards, and subscribers:

```
server/modules/<domain>/
  dto/
    create-<entity>.dto.ts
    update-<entity>.dto.ts
    <entity>.dto.ts
    <entity>-detail.dto.ts
  subscribers/
    <entity>-<relation>.subscriber.ts
  <domain>.module.ts
  <domain>.service.ts
  <domain>.controller.ts
```

### Nested Domain Modules

Related entities can nest under a parent domain module. From the old project:

```
games/
  characters/    — nested under games
  battles/       — nested under games
items/
  weapons/       — nested under items
  armor/         — nested under items
  jewelry/       — nested under items
  spellbooks/    — nested under items
```

This keeps related game logic co-located rather than scattered across flat directories.

## Naming Conventions

| Artifact | Convention | Example |
|---|---|---|
| Entity class | PascalCase | `MonsterInstance` |
| Entity table | snake_case | `monster_instance` |
| Module/Service/Controller | PascalCase + suffix | `MonstersModule`, `MonstersService` |
| Controller route | kebab-case, plural | `@Controller('monsters')` |
| API endpoint | kebab-case | `/api/monsters` |
| File names | kebab-case | `monster-instance.entity.ts` |
| FK column | camelCase + Id | `monsterId`, `weaponId` |
| Relation property | camelCase, no Id | `monster`, `weapon` |
| DTO class | PascalCase + Dto | `MonsterDto`, `CreateMonsterDto` |

## Authentication & Authorization

### Auth Pattern (from old project)

- **JWT + Passport**: `@nestjs/passport` with `passport-jwt` and `passport-local`
- **Global JWT guard**: `JwtAuthGuard` registered as `APP_GUARD` — all routes require auth by default
- **Public routes**: `@Public()` decorator (sets `IS_PUBLIC_KEY` metadata) to opt out of auth
- **Login flow**: `POST /api/auth/login` with `LocalAuthGuard` → returns JWT token
- **Registration**: `POST /api/auth/register` with `@Public()` — scrypt password hashing with random salt
- **Current player**: `@CurrentPlayer()` param decorator extracts `request.user` (populated by JWT strategy)

### Authorization Guards

Resource-level guards that verify ownership/membership:
- `CharacterOwnerGuard` — verifies current player owns the character
- `GameOwnerGuard` — verifies current player owns the game
- `GamePlayerGuard` — verifies current player is a member of the game
- `InventoryOwnerGuard` — verifies current player owns the inventory

Pattern: inject the relevant service, look up the resource, check against `request.user.id`.

## DTO & Serialization Pattern

### Response DTOs with class-transformer

The old project uses `@Expose()` and `@Transform()` from `class-transformer` to control API responses:

```typescript
export class MonsterDto {
  @Expose() id: number;
  @Expose() name: string;
}
```

### DTO Inheritance for Detail Views

Base DTO for list views, extended DTO for detail views:

```typescript
export class CharacterDto {
  @Expose() id: number;
  @Expose() name: string;
}

export class CharacterDetailDto extends CharacterDto {
  @Expose() strength: number;
  @Expose() hp: number;
  // ... computed fields via @Transform
}
```

### Serialize Interceptor

Custom `@Serialize(PublicDto, DetailDto)` decorator that:
- Strips all properties not marked with `@Expose()`
- Supports conditional serialization (public vs detail DTO based on ownership)
- Handles nested DTO conversion via `@DTO()` decorator

### Input DTOs with class-validator

```typescript
export class CreateCharacterDto {
  @IsString() @IsNotEmpty() name: string;
  @IsNumber() @IsNotEmpty() raceId: number;
  @IsArray() @IsNotEmpty() skills: CharacterSkillDto[];
}
```

## TypeORM Subscribers

Used for cascade cleanup when entities are deleted. Pattern:

```typescript
@EventSubscriber()
export class GamePlayerSubscriber implements EntitySubscriberInterface<Player> {
  listenTo() { return Player; }
  async beforeRemove(event: RemoveEvent<Player>) {
    // Clean up related games when a player is deleted
  }
}
```

Use subscribers for cross-entity side effects that don't belong in the service layer.

## Environment Configuration

### Config Pattern (from old project)

- `@nestjs/config` with `ConfigModule.forRoot({ isGlobal: true })`
- Environment files in `config/` directory: `.env.dev`, `.env.test`, `.env.prod`
- `NODE_ENV` determines which env file loads
- Database config loaded via `ConfigModule` and injected into `TypeOrmModule.forRootAsync()`
- JWT secret from environment variables, validated at startup

## Client Architecture

### State Management

The old project used a composable-based state machine (`useGameState`) with:
- Reactive state: `player`, `game`, `character`, `battle`
- Computed routing: screen determined by which state properties are populated
- localStorage persistence with debounced saves
- Auto-loading: selecting a game auto-loads the player's character, selecting a character auto-loads active battle

The new project uses Pinia stores, but the state machine concept carries forward.

### API Client

Axios-based singleton with:
- Base URL: `/api`
- JWT token injection via request interceptor
- 401 handling: clear token, redirect to login
- Typed helper methods: `get`, `post`, `put`, `delete`
- Request/response logging (useful for development)

### Component Patterns

- Screen-per-state: each game state (login, game select, character, battle) gets its own view component
- Composables for shared logic (game state, API calls)
- PrimeVue components for UI (DataTable, Dialog, Toast, etc.)

## Testing Strategy

### Unit & Component Tests (Vitest)

- Config: `vitest.config.ts` at root
- Includes: `server/**/*.spec.ts` and `client/**/*.spec.ts`
- Environment: jsdom with globals enabled
- Server tests: mock TypeORM Repository, instantiate service directly
- Client tests: `@vue/test-utils` for mounting and asserting on components
- Run: `npm test`

### End-to-End Tests (Playwright)

- Config: `playwright.config.ts` at root
- Test directory: `e2e/`
- Browser: Chromium (headless)
- Web server: Playwright auto-builds and starts the production server before tests
- Base URL: `http://localhost:3000`
- Run: `npm run test:e2e` (headless) or `npm run test:e2e:headed` (visible browser)
- Tests exercise real user flows against the full stack (client + API + database)
