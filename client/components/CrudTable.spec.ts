import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import CrudTable from './CrudTable.vue'
import type { TableMeta } from '@/api/client'

vi.mock('@/api/client', () => ({
  fetchAll: vi.fn(),
  deleteEntity: vi.fn(),
  createEntity: vi.fn(),
  updateEntity: vi.fn(),
}))

vi.mock('primevue/usetoast', () => ({
  useToast: () => ({ add: vi.fn() }),
}))

vi.mock('primevue/useconfirm', () => ({
  useConfirm: () => ({ require: vi.fn() }),
}))

import { fetchAll } from '@/api/client'

const mockTableMeta: TableMeta = {
  name: 'Monster',
  route: 'monsters',
  displayName: 'Monster',
  columns: [
    { name: 'id', type: 'number', nullable: false, isPrimary: true },
    { name: 'name', type: 'string', nullable: false, isPrimary: false },
    { name: 'isActive', type: 'boolean', nullable: false, isPrimary: false },
    { name: 'damageTypeId', type: 'number', nullable: true, isPrimary: false },
  ],
  relations: [
    {
      propertyName: 'damageType',
      relationType: 'many-to-one',
      targetEntity: 'DamageType',
      targetRoute: 'damage-types',
      joinColumn: 'damageTypeId',
    },
  ],
}

const mockPaginatedResponse = {
  data: [
    { id: 1, name: 'Dragon', isActive: true, damageTypeId: 1, damageType: { id: 1, name: 'Fire' } },
    { id: 2, name: 'Skeleton', isActive: false, damageTypeId: 2, damageType: { id: 2, name: 'Physical' } },
  ],
  total: 2,
  page: 1,
  limit: 25,
  totalPages: 1,
}

// Stub that renders column info and invokes the body slot with each row
const ColumnStub = defineComponent({
  name: 'Column',
  props: ['field', 'header'],
  setup(props, { slots }) {
    return () => {
      const children = []
      if (props.header) {
        children.push(h('span', { class: 'col-header' }, props.header))
      }
      if (slots.body) {
        for (const row of mockPaginatedResponse.data) {
          children.push(h('div', { class: 'col-body' }, slots.body({ data: row })))
        }
      }
      return h('div', { class: 'column-stub', 'data-field': props.field, 'data-header': props.header }, children)
    }
  },
})

describe('CrudTable', () => {
  beforeEach(() => {
    vi.mocked(fetchAll).mockResolvedValue(mockPaginatedResponse)
  })

  function mountComponent() {
    return mount(CrudTable, {
      props: { tableMeta: mockTableMeta },
      global: {
        stubs: {
          DataTable: defineComponent({
            name: 'DataTable',
            setup(_, { slots }) {
              return () => h('div', { class: 'datatable-stub' }, slots.default?.())
            },
          }),
          Column: ColumnStub,
          Button: true,
          Dialog: true,
          ConfirmDialog: true,
          EntityForm: true,
        },
      },
    })
  }

  it('renders columns from metadata excluding PK columns', async () => {
    const wrapper = mountComponent()
    await flushPromises()

    const columns = wrapper.findAll('.column-stub')
    const headers = columns.map((c) => c.attributes('data-header'))

    // The ID column is rendered separately with header "ID"
    expect(headers).toContain('ID')
    // Non-PK columns that aren't FK relation columns should appear
    expect(headers).toContain('name')
    expect(headers).toContain('isActive')
    // FK id column (damageTypeId) should be hidden since it has a relation
    expect(headers).not.toContain('damageTypeId')
    // Relation column should appear
    expect(headers).toContain('damageType')
    // The raw 'id' should not appear as a displayColumn header
    const nonIdHeaders = headers.filter((h) => h !== 'ID')
    expect(nonIdHeaders).not.toContain('id')
  })

  it('renders boolean columns with check/times icons', async () => {
    const wrapper = mountComponent()
    await flushPromises()

    // Find the isActive column
    const isActiveCol = wrapper.findAll('.column-stub').find(
      (c) => c.attributes('data-header') === 'isActive'
    )
    expect(isActiveCol).toBeDefined()

    const html = isActiveCol!.html()
    // Dragon has isActive=true → pi-check, Skeleton has isActive=false → pi-times
    expect(html).toContain('pi-check')
    expect(html).toContain('pi-times')
  })

  it('renders relation columns showing entity name', async () => {
    const wrapper = mountComponent()
    await flushPromises()

    // Find the damageType relation column
    const relCol = wrapper.findAll('.column-stub').find(
      (c) => c.attributes('data-header') === 'damageType'
    )
    expect(relCol).toBeDefined()

    const html = relCol!.html()
    // Should show the related entity's name, not the FK ID
    expect(html).toContain('Fire')
    expect(html).toContain('Physical')
  })
})
