---
inclusion: always
---

# Workspace-Specific Patterns

## Purpose

This document captures project-specific patterns, conventions, and quirks for this tabletop game project.

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

## Client Conventions

- PrimeVue with Aura theme, ToastService, ConfirmationService.
- Axios-based API client at `client/api/client.ts` with typed helpers.
- Pinia for state management.
- `@` alias maps to `./client/`.
