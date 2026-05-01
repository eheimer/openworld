# Requirements Document

## Introduction

The Admin CRUD Editor provides admin users with a web-based interface to browse and edit all database tables in the Open World game application. It ports the phase 1 admin app's CRUD functionality into the phase 2 project, gated behind admin authentication. The editor auto-generates table views and forms from TypeORM entity metadata, so new entities are automatically available in the admin UI without additional frontend code.

## Glossary

- **Metadata_Service**: A NestJS service that introspects TypeORM entity metadata at runtime to produce table schema descriptors (columns, types, relations) for all registered entities.
- **Admin_Guard**: A NestJS route guard that restricts access to admin-only endpoints by verifying the requesting player has `isAdmin: true`.
- **Metadata_Store**: A Pinia store that fetches and caches table metadata from the Metadata_Service API, providing table grouping and classification to frontend components.
- **Admin_Router_Guard**: A Vue Router navigation guard that prevents non-admin users from accessing `/admin/*` routes.
- **CrudTable_Component**: A reusable Vue component that auto-generates a PrimeVue DataTable view from table metadata, with lazy pagination, sorting, and CRUD operations.
- **EntityForm_Component**: A reusable Vue component that auto-generates create/edit forms from table metadata, rendering appropriate input types and FK dropdowns.
- **Admin_Layout**: A Vue layout component with a sidebar listing all tables grouped by category and a content area for the selected table's CRUD view.
- **Canon_Table**: A static/read-only table whose schema and data are owned by phase 1. Data exists before any game session starts.
- **Dynamic_Table**: A runtime table whose data is owned by phase 2. Created during gameplay sessions.
- **Table_Category**: A grouping label (Combat, Equipment, Crafting, Characters, Lookup Tables) used to organize tables in the admin sidebar.

## Requirements

### Requirement 1: Metadata Service

**User Story:** As an admin user, I want the backend to expose table schema information for all registered entities, so that the frontend can auto-generate CRUD views without hardcoded table definitions.

#### Acceptance Criteria

1. WHEN a GET request is made to `/api/metadata/tables`, THE Metadata_Service SHALL return an array of table descriptors containing the entity name, route, display name, columns, and relations for every registered TypeORM entity.
2. THE Metadata_Service SHALL derive each table's API route from the entity class name by converting PascalCase to kebab-case and pluralizing, so that no hardcoded route map is required.
3. THE Metadata_Service SHALL exclude the `createdAt` and `updatedAt` columns from each table's column list.
4. THE Metadata_Service SHALL include for each column its property name, data type, nullability, and whether it is a primary key.
5. THE Metadata_Service SHALL include for each relation its property name, relation type, target entity name, target route, and join column name.

### Requirement 2: Admin Guard

**User Story:** As a system administrator, I want admin-only endpoints protected by an authorization guard, so that non-admin users cannot access sensitive metadata or perform unauthorized operations.

#### Acceptance Criteria

1. WHEN a request is made to an endpoint decorated with the Admin_Guard, THE Admin_Guard SHALL verify that the authenticated player's `isAdmin` property is `true`.
2. IF the authenticated player's `isAdmin` property is `false`, THEN THE Admin_Guard SHALL reject the request with a 403 Forbidden response.
3. THE Admin_Guard SHALL be applied to the metadata tables endpoint so that only admin users can retrieve table schema information.

### Requirement 3: Metadata Store

**User Story:** As a frontend developer, I want a Pinia store that fetches and caches table metadata, so that admin components can access table schemas without redundant API calls.

#### Acceptance Criteria

1. WHEN the Metadata_Store `load` action is called, THE Metadata_Store SHALL fetch table metadata from `/api/metadata/tables` and cache the result.
2. WHEN the Metadata_Store has already loaded metadata, THE Metadata_Store SHALL return the cached data without making another API request.
3. THE Metadata_Store SHALL provide a `getGroupedTables` method that returns tables organized by Table_Category (Combat, Equipment, Crafting, Characters, Lookup Tables).
4. THE Metadata_Store SHALL provide a `getTableType` method that classifies each table as Canon_Table or Dynamic_Table based on a known mapping of dynamic table routes.
5. THE Metadata_Store SHALL provide a `getTable` method that returns the metadata for a single table given its route.

### Requirement 4: Admin Router Guard

**User Story:** As a system administrator, I want the admin section of the application restricted to admin users on the client side, so that non-admin users cannot navigate to admin views.

#### Acceptance Criteria

1. WHEN a non-admin user navigates to any route under `/admin`, THE Admin_Router_Guard SHALL redirect the user to the home page.
2. WHEN an admin user navigates to any route under `/admin`, THE Admin_Router_Guard SHALL allow the navigation to proceed.
3. WHEN an unauthenticated user navigates to any route under `/admin`, THE Admin_Router_Guard SHALL redirect the user to the login page.

### Requirement 5: Admin Layout

**User Story:** As an admin user, I want a dedicated admin interface with a sidebar listing all tables grouped by category, so that I can quickly navigate between tables.

#### Acceptance Criteria

1. THE Admin_Layout SHALL display a sidebar containing all tables returned by the Metadata_Store, organized under their Table_Category headings.
2. WHEN an admin user clicks a table name in the sidebar, THE Admin_Layout SHALL display the CrudTable_Component for the selected table in the content area.
3. THE Admin_Layout SHALL visually distinguish Canon_Table entries from Dynamic_Table entries in the sidebar.
4. WHEN the admin route is accessed without a specific table selected, THE Admin_Layout SHALL display the first available table by default.

### Requirement 6: CrudTable Component

**User Story:** As an admin user, I want an auto-generated table view for any entity, so that I can browse, create, edit, and delete records without custom per-entity UI code.

#### Acceptance Criteria

1. WHEN a table is selected, THE CrudTable_Component SHALL fetch and display paginated records from the table's API route using lazy loading.
2. THE CrudTable_Component SHALL support server-side sorting by clicking column headers.
3. THE CrudTable_Component SHALL render columns based on the table metadata, displaying appropriate formatting for boolean values.
4. THE CrudTable_Component SHALL display ManyToOne relation values using the related entity's `name` or `id` property instead of raw FK IDs.
5. WHEN the admin user clicks the "New" button, THE CrudTable_Component SHALL open a dialog containing the EntityForm_Component in create mode.
6. WHEN the admin user clicks the edit button on a row, THE CrudTable_Component SHALL open a dialog containing the EntityForm_Component pre-populated with the row's data.
7. WHEN the admin user clicks the delete button on a row, THE CrudTable_Component SHALL display a confirmation dialog before executing the delete operation.
8. WHEN the selected table changes, THE CrudTable_Component SHALL reset pagination and reload data for the new table.

### Requirement 7: EntityForm Component

**User Story:** As an admin user, I want auto-generated create and edit forms for any entity, so that I can manage records without custom per-entity form code.

#### Acceptance Criteria

1. THE EntityForm_Component SHALL render form fields for all editable columns (excluding primary key, `createdAt`, and `updatedAt`).
2. THE EntityForm_Component SHALL render the appropriate input type for each column: text input for strings, number input for numbers, checkbox for booleans, and textarea for text fields.
3. THE EntityForm_Component SHALL render a dropdown select for each ManyToOne relation, populated with records fetched from the related entity's API route.
4. WHEN the form is in create mode, THE EntityForm_Component SHALL initialize boolean fields to `false` and leave other fields empty.
5. WHEN the form is in edit mode, THE EntityForm_Component SHALL pre-populate all fields with the existing entity's values.
6. WHEN the user submits the form, THE EntityForm_Component SHALL emit the form data to the parent component for persistence.

### Requirement 8: Admin Navigation Item

**User Story:** As an admin user, I want to see an "Admin" link in the application layout, so that I can access the admin editor from the main application.

#### Acceptance Criteria

1. WHILE the authenticated player has `isAdmin` set to `true`, THE application layout SHALL display an "Admin" navigation item linking to `/admin`.
2. WHILE the authenticated player has `isAdmin` set to `false`, THE application layout SHALL hide the "Admin" navigation item.

### Requirement 9: Lazy Loading of Admin Components

**User Story:** As a non-admin user, I want the admin editor code excluded from my initial page load, so that the application loads faster for regular users.

#### Acceptance Criteria

1. THE Vue Router SHALL use dynamic imports for all admin route components so that admin code is split into a separate bundle.
2. WHEN a non-admin user loads the application, THE application SHALL not download any admin component code.
