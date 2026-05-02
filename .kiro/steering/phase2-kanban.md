---
inclusion: always
---

# Phase II Kanban — Incoming Work from Phase 1

## Location

The Phase II kanban board lives in the **phase 1 project** at:

```
../reboot/Obsidian Kanbans/Phase II/Phase II Kanban.md
```

It is an Obsidian Kanban plugin board (markdown format). Phase 1 owns this file and adds cards to it whenever schema changes are made that require phase 2 to update.

## What to Expect

Cards appear in the **Backlog** lane from two sources:

**From phase 1 (schema changes):**
- New entities/tables added to the schema
- Existing entity columns added, renamed, or removed
- Relations between entities change
- Seed data changes that affect how the admin UI should behave

**From the user directly:**
- Bug reports for the phase 2 client or server
- New feature requests for the client UI
- Improvements or refactors to existing functionality

Each card may link to a detail note (Obsidian `[[note-name]]` syntax) in the same directory with enough context to accomplish the task.

## How to Process Cards

When the user asks to check for incoming work, scan the kanban, or asks "what's new from phase 1":

1. Read `../reboot/Obsidian Kanbans/Phase II/Phase II Kanban.md`
2. Look for cards in the **Backlog** lane (lines matching `- [ ] ...`)
3. If a card links to a note (`[[note-name]]`), read the note from `../reboot/Obsidian Kanbans/Phase II/note-name.md`
4. Present the backlog items to the user with their details

When working on a card:
- When the user says "spec out task X" or promotes a card, move it from **Backlog** to **Current Iteration** (prioritized for this iteration)
- When actively implementing, move it to **In progress**
- When complete, move it to **Done** and append a brief note to the card summarizing what was done

Lane lifecycle: **Backlog** → **Current Iteration** (prioritized/planned) → **In progress** (actively being worked) → **Done**

## What Phase 2 Updates Typically Involve

**For schema changes from phase 1:**
1. **Re-initialize the database**: `npm run db:init` (copies fresh phase 1 DB + applies dynamic DDL + runs migrations)
2. **Update or create entity files** in `server/entities/` to match the new schema
3. **Update or create services/controllers** in the appropriate domain module (`server/modules/combat/`, `equipment/`, etc.)
4. **Register new entities** in the domain module's `TypeOrmModule.forFeature([...])` array
5. **Update the metadata store's category map** in `client/stores/metadata.ts` if new tables need sidebar categorization

**For bugs and feature requests:**
- Read the card details, investigate the issue or requirement, implement the fix or feature, and move the card to Done.

## Kanban File Format

The board is a markdown file with Obsidian Kanban plugin frontmatter. Lanes are `##` headings, cards are `- [ ]` checkboxes under each lane. Example:

```markdown
## Backlog

- [ ] Add new Potion entity and CRUD module
- [ ] [[schema-v1.5-changes]]

## Current Iteration

- [ ] Update monster entity with new traits column

## Done

- [x] Port initial 53 entities from phase 1
```

Cards with `[[...]]` link to detail notes in the same directory.
