import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent } from 'vue'
import EntityForm from './EntityForm.vue'
import type { TableMeta } from '@/api/client'

vi.mock('@/api/client', () => ({
  fetchAll: vi.fn().mockResolvedValue({ data: [], total: 0, page: 1, limit: 500, totalPages: 0 }),
}))

// Create stub components that expose modelValue as an attribute for inspection
const InputTextStub = defineComponent({
  name: 'InputText',
  props: ['modelValue', 'id'],
  template: '<input class="input-text-stub" :data-value="modelValue" />',
})

const InputNumberStub = defineComponent({
  name: 'InputNumber',
  props: ['modelValue', 'inputId', 'useGrouping'],
  template: '<input class="input-number-stub" :data-value="modelValue" />',
})

const CheckboxStub = defineComponent({
  name: 'Checkbox',
  props: ['modelValue', 'binary', 'inputId'],
  template: '<input class="checkbox-stub" type="checkbox" :data-value="modelValue" />',
})

const TextareaStub = defineComponent({
  name: 'Textarea',
  props: ['modelValue', 'id', 'rows'],
  template: '<textarea class="textarea-stub" :data-value="modelValue" />',
})

const mockTableMeta: TableMeta = {
  name: 'Monster',
  route: 'monsters',
  displayName: 'Monster',
  columns: [
    { name: 'id', type: 'number', nullable: false, isPrimary: true },
    { name: 'name', type: 'string', nullable: false, isPrimary: false },
    { name: 'hp', type: 'number', nullable: false, isPrimary: false },
    { name: 'isActive', type: 'boolean', nullable: false, isPrimary: false },
    { name: 'description', type: 'text', nullable: true, isPrimary: false },
    { name: 'createdAt', type: 'string', nullable: false, isPrimary: false },
    { name: 'updatedAt', type: 'string', nullable: false, isPrimary: false },
  ],
  relations: [],
}

describe('EntityForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  function mountComponent(props: { isNew: boolean; entity?: any }) {
    return mount(EntityForm, {
      props: {
        tableMeta: mockTableMeta,
        entity: props.entity ?? {},
        isNew: props.isNew,
      },
      global: {
        stubs: {
          InputText: InputTextStub,
          InputNumber: InputNumberStub,
          Textarea: TextareaStub,
          Checkbox: CheckboxStub,
          Select: true,
          MultiSelect: true,
          Button: true,
        },
      },
    })
  }

  it('renders correct input types per column type', async () => {
    const wrapper = mountComponent({ isNew: true })
    await flushPromises()

    // string → InputText
    expect(wrapper.find('.input-text-stub').exists()).toBe(true)
    // number → InputNumber
    expect(wrapper.find('.input-number-stub').exists()).toBe(true)
    // boolean → Checkbox
    expect(wrapper.find('.checkbox-stub').exists()).toBe(true)
    // text → Textarea
    expect(wrapper.find('.textarea-stub').exists()).toBe(true)
  })

  it('excludes id, createdAt, and updatedAt fields', async () => {
    const wrapper = mountComponent({ isNew: true })
    await flushPromises()

    const labels = wrapper.findAll('label').map((l) => l.text())
    // These fields should not appear
    expect(labels.join(' ')).not.toContain('Id')
    expect(labels.join(' ')).not.toContain('Created At')
    expect(labels.join(' ')).not.toContain('Updated At')
    // Editable fields should appear
    expect(labels).toContain('Name')
    expect(labels).toContain('Hp')
  })

  it('defaults booleans to false in create mode', async () => {
    const wrapper = mountComponent({ isNew: true })
    await flushPromises()

    const checkbox = wrapper.findComponent(CheckboxStub)
    expect(checkbox.props('modelValue')).toBe(false)
  })

  it('pre-populates fields in edit mode', async () => {
    const entity = { id: 1, name: 'Dragon', hp: 100, isActive: true, description: 'A big dragon', createdAt: '2024-01-01', updatedAt: '2024-01-02' }
    const wrapper = mountComponent({ isNew: false, entity })
    await flushPromises()

    const inputText = wrapper.findComponent(InputTextStub)
    expect(inputText.props('modelValue')).toBe('Dragon')

    const inputNumber = wrapper.findComponent(InputNumberStub)
    expect(inputNumber.props('modelValue')).toBe(100)

    const checkbox = wrapper.findComponent(CheckboxStub)
    expect(checkbox.props('modelValue')).toBe(true)

    const textarea = wrapper.findComponent(TextareaStub)
    expect(textarea.props('modelValue')).toBe('A big dragon')
  })
})
