<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import Checkbox from 'primevue/checkbox'
import Select from 'primevue/select'
import MultiSelect from 'primevue/multiselect'
import Button from 'primevue/button'
import { fetchAll, type TableMeta } from '@/api/client'

const props = defineProps<{
  tableMeta: TableMeta
  entity: any
  isNew: boolean
}>()

const emit = defineEmits<{
  save: [data: any]
  cancel: []
}>()

const formData = ref<Record<string, any>>({})
const relationOptions = ref<Record<string, any[]>>({})
const manyToManySelections = ref<Record<string, number[]>>({})

// Editable columns (exclude id, createdAt, updatedAt)
const editableColumns = computed(() =>
  props.tableMeta.columns.filter(
    (col) => !col.isPrimary && !['createdAt', 'updatedAt'].includes(col.name)
  )
)

// ManyToOne / OneToOne relations (rendered as dropdowns)
const fkRelations = computed(() =>
  props.tableMeta.relations.filter(
    (r) => r.relationType === 'many-to-one' || r.relationType === 'one-to-one'
  )
)

// ManyToMany relations (rendered as multi-select)
const m2mRelations = computed(() =>
  props.tableMeta.relations.filter((r) => r.relationType === 'many-to-many')
)

// FK column names to skip in the regular field list (we render them as dropdowns)
const fkColumnNames = computed(() =>
  new Set(fkRelations.value.map((r) => r.joinColumn).filter(Boolean))
)

// Columns that are NOT FK join columns
const regularColumns = computed(() =>
  editableColumns.value.filter((col) => !fkColumnNames.value.has(col.name))
)

function fieldLabel(name: string): string {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim()
}

async function loadRelationOptions() {
  const allRelations = [...fkRelations.value, ...m2mRelations.value]
  for (const rel of allRelations) {
    try {
      const result = await fetchAll(rel.targetRoute, { limit: 500 })
      relationOptions.value[rel.propertyName] = result.data
    } catch {
      relationOptions.value[rel.propertyName] = []
    }
  }
}

function initFormData() {
  const data: Record<string, any> = {}

  if (!props.isNew) {
    // Copy all scalar fields
    for (const col of props.tableMeta.columns) {
      data[col.name] = props.entity[col.name] ?? null
    }
  } else {
    // Default boolean fields to false for new entities
    for (const col of editableColumns.value) {
      if (col.type === 'boolean') {
        data[col.name] = false
      }
    }
  }

  formData.value = data

  // Init many-to-many selections
  for (const rel of m2mRelations.value) {
    const existing = props.entity[rel.propertyName]
    manyToManySelections.value[rel.propertyName] = Array.isArray(existing)
      ? existing.map((e: any) => e.id)
      : []
  }
}

function onSubmit() {
  const payload: Record<string, any> = { ...formData.value }

  // Remove read-only fields for new entities
  if (props.isNew) {
    delete payload.id
  }
  delete payload.createdAt
  delete payload.updatedAt

  // Add many-to-many as arrays of ids
  for (const rel of m2mRelations.value) {
    const ids = manyToManySelections.value[rel.propertyName] || []
    payload[rel.propertyName] = ids.map((id: number) => ({ id }))
  }

  emit('save', payload)
}

onMounted(() => {
  initFormData()
  loadRelationOptions()
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="entity-form">
    <!-- Regular fields -->
    <div v-for="col in regularColumns" :key="col.name" class="form-field">
      <label :for="col.name">{{ fieldLabel(col.name) }}</label>

      <Checkbox
        v-if="col.type === 'boolean'"
        v-model="formData[col.name]"
        :binary="true"
        :inputId="col.name"
      />

      <InputNumber
        v-else-if="col.type === 'number'"
        v-model="formData[col.name]"
        :inputId="col.name"
        :useGrouping="false"
        class="w-full"
      />

      <Textarea
        v-else-if="col.type === 'text'"
        v-model="formData[col.name]"
        :id="col.name"
        rows="3"
        class="w-full"
      />

      <InputText
        v-else
        v-model="formData[col.name]"
        :id="col.name"
        class="w-full"
      />
    </div>

    <!-- FK relation dropdowns -->
    <div v-for="rel in fkRelations" :key="rel.propertyName" class="form-field">
      <label>{{ fieldLabel(rel.propertyName) }}</label>
      <Select
        v-model="formData[rel.joinColumn!]"
        :options="relationOptions[rel.propertyName] || []"
        optionLabel="name"
        optionValue="id"
        :placeholder="`Select ${fieldLabel(rel.propertyName)}`"
        :showClear="true"
        class="w-full"
      />
    </div>

    <!-- ManyToMany multi-selects -->
    <div v-for="rel in m2mRelations" :key="rel.propertyName" class="form-field">
      <label>{{ fieldLabel(rel.propertyName) }}</label>
      <MultiSelect
        v-model="manyToManySelections[rel.propertyName]"
        :options="relationOptions[rel.propertyName] || []"
        optionLabel="name"
        optionValue="id"
        :placeholder="`Select ${fieldLabel(rel.propertyName)}`"
        display="chip"
        class="w-full"
      />
    </div>

    <div class="form-actions">
      <Button label="Cancel" severity="secondary" text @click="$emit('cancel')" />
      <Button type="submit" :label="isNew ? 'Create' : 'Save'" />
    </div>
  </form>
</template>

<style scoped>
.entity-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-field label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
}

.w-full {
  width: 100%;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}
</style>
