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
- Entity definitions in `server/entities/`.
- Feature modules in `server/modules/<entity-name>/` (module, service, controller).

## Client Conventions

- PrimeVue with Aura theme, ToastService, ConfirmationService.
- Axios-based API client at `client/api/client.ts` with typed helpers.
- Pinia for state management.
- `@` alias maps to `./client/`.

## Git Workflow

**Branch strategy**: This project commits directly to `master`. No feature branches, no pull requests.

When the user says "commit and push", commit all staged changes to `master` and push to `origin/master`. Do not create feature branches or suggest PRs.

```bash
git add <files>
git commit -m "descriptive message"
git push origin master
```

If the push is rejected due to remote changes, pull with rebase first: `git pull --rebase origin master`, then push again.
