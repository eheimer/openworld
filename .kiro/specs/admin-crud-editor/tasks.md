# Implementation Plan: Admin CRUD Editor

## Overview

Port the phase 1 admin app's metadata-driven CRUD functionality into the phase 2 project. The implementation spans four layers: server metadata introspection, admin authorization guard, client metadata store, and client UI components (admin layout, CrudTable, EntityForm). All admin routes are lazy-loaded and gated behind admin authentication.

Phase 1 reference implementations exist in `reboot/` and should be ported/adapted to phase 2 conventions (TypeScript strict mode, `.js` import extensions, JWT auth, PrimeVue 4 API).

## Tasks

- [x] 1. Implement AdminGuard and MetadataService on the server
  - [x] 1.1 Create the AdminGuard
    - Create `server/guards/admin.guard.ts`
    - Implement `CanActivate` guard that reads `request.user` and checks `player.isAdmin === true`
    - Throw `ForbiddenException` if not admin or no user
    - _Requirements: 2.1, 2.2_

  - [x] 1.2 Create the MetadataService with `toRoute()` and `toDisplayName()` helpers
    - Create `server/modules/metadata/metadata.service.ts`
    - Implement `toRoute()`: PascalCase → kebab-case → pluralized (handle -s, -x, -z, -ch, -sh → 'es'; -y after consonant → 'ies')
    - Implement `toDisplayName()`: insert spaces before uppercase letters
    - Implement `getAll()`: introspect `DataSource.entityMetadatas`, map columns (excluding `createdAt`/`updatedAt`) and relations to `TableMeta[]`
    - Define `ColumnMeta`, `RelationMeta`, `TableMeta` interfaces
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [x] 1.3 Create the MetadataController and MetadataModule
    - Create `server/modules/metadata/metadata.controller.ts` with `GET /metadata/tables` endpoint
    - Apply `@UseGuards(AdminGuard)` on the controller class
    - Create `server/modules/metadata/metadata.module.ts`
    - Register `MetadataModule` in `AppModule`
    - _Requirements: 1.1, 2.3_

  - [x] 1.4 Write unit tests for AdminGuard
    - Test admin player returns `true`
    - Test non-admin player throws `ForbiddenException`
    - Test missing user throws `ForbiddenException`
    - _Requirements: 2.1, 2.2_

  - [x] 1.5 Write unit tests for MetadataService
    - Test `toRoute()` with representative PascalCase names (single word, multi-word, -y, -s, -x, -ch, -sh suffixes)
    - Test `toDisplayName()` conversion
    - Test `getAll()` with mocked `DataSource.entityMetadatas` — verify structure, excluded columns, derived routes
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 2. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Implement client metadata types, API function, and metadata store
  - [x] 3.1 Add metadata types and `fetchMetadata()` to the API client
    - Add `ColumnMeta`, `RelationMeta`, `TableMeta` interfaces to `client/api/client.ts`
    - Add `fetchMetadata()` function that calls `GET /metadata/tables`
    - _Requirements: 1.1, 3.1_

  - [x] 3.2 Create the metadata Pinia store
    - Create `client/stores/metadata.ts`
    - Implement `load()` action: fetch from API, cache result, skip if already loaded
    - Implement `getTable(route)` getter
    - Implement `getGroupedTables()` with `CATEGORY_MAP` (Combat, Equipment, Crafting, Characters, Lookup Tables)
    - Implement `getTableType(route)` with `DYNAMIC_ROUTES` set (Canon vs Dynamic classification)
    - Port category and type mappings from phase 1 `reboot/client/stores/metadata.ts`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [x] 3.3 Write unit tests for the metadata store
    - Test `load()` fetches and caches data
    - Test `load()` called twice only makes one API call
    - Test `getTable()` returns correct table by route
    - Test `getGroupedTables()` groups tables under correct categories
    - Test `getTableType()` classifies Canon vs Dynamic
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 4. Implement admin routing, layout, and navigation
  - [x] 4.1 Add admin routes with router guard and lazy loading
    - Add `/admin` route with `beforeEnter` guard that checks auth + admin status
    - Add `/admin/:table` child route for `AdminTableView`
    - Use dynamic `() => import()` for all admin components
    - _Requirements: 4.1, 4.2, 4.3, 9.1, 9.2_

  - [x] 4.2 Create the AdminLayout component
    - Create `client/views/admin/AdminLayout.vue`
    - Sidebar: list tables grouped by category from metadata store
    - Visually distinguish Canon vs Dynamic tables (icon or color)
    - Content area: `<router-view>` for selected table
    - On mount: load metadata, redirect to first table if none selected
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 4.3 Create the AdminTableView component
    - Create `client/views/admin/AdminTableView.vue`
    - Read `:table` route param, look up metadata from store
    - Pass `tableMeta` to `CrudTable`
    - Handle invalid route param by redirecting to first available table
    - _Requirements: 5.2_

  - [x] 4.4 Add admin navigation item to App.vue
    - Show "Admin" link to `/admin` when `authStore.isAdmin` is `true`
    - Hide for non-admin users
    - _Requirements: 8.1, 8.2_

- [x] 5. Implement CrudTable and EntityForm components
  - [x] 5.1 Create the CrudTable component
    - Create `client/components/CrudTable.vue`
    - Port from phase 1 `reboot/client/components/CrudTable.vue`, adapting to phase 2 conventions
    - PrimeVue DataTable with lazy pagination and server-side sorting
    - Render columns from metadata, hide PK columns, show relation names instead of FK IDs
    - Boolean columns as check/cross icons
    - "New" button opens dialog with EntityForm in create mode
    - Row edit button opens dialog with EntityForm in edit mode
    - Row delete button with PrimeVue ConfirmDialog
    - Watch `tableMeta.route` — reset pagination and reload on change
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8_

  - [x] 5.2 Create the EntityForm component
    - Create `client/components/EntityForm.vue`
    - Port from phase 1 `reboot/client/components/EntityForm.vue`, adapting to phase 2 conventions
    - Render fields for editable columns (exclude id, createdAt, updatedAt)
    - Input type mapping: string → InputText, number → InputNumber, boolean → Checkbox, text → Textarea
    - ManyToOne relations → Select dropdown populated from related entity's route
    - Create mode: booleans default to `false`, others empty
    - Edit mode: pre-populate all fields
    - Emit `save` with form data, `cancel` to close
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

  - [x] 5.3 Write unit tests for CrudTable
    - Test columns render from metadata (excluding PKs)
    - Test boolean columns render as icons
    - Test relation columns show entity name
    - _Requirements: 6.3, 6.4_

  - [x] 5.4 Write unit tests for EntityForm
    - Test correct input types render per column type
    - Test id/createdAt/updatedAt fields are excluded
    - Test create mode defaults booleans to false
    - Test edit mode pre-populates fields
    - _Requirements: 7.1, 7.2, 7.4, 7.5_

- [x] 6. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Phase 1 reference implementations in `reboot/` serve as porting sources — adapt to phase 2 conventions (`.js` import extensions, `!` definite assignment assertions, PrimeVue 4 API, JWT auth headers)
- The `@` alias maps to `./client/` in Vite/vitest config
- Server imports require `.js` extensions (nodenext module resolution)
- All admin routes use dynamic imports for code splitting (Requirement 9)
- The metadata service auto-derives routes from entity names — no hardcoded route map
