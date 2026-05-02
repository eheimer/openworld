<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import EntityForm from './EntityForm.vue'
import {
  fetchAll,
  deleteEntity,
  createEntity,
  updateEntity,
  type TableMeta,
  type PaginatedResponse,
  type QueryParams,
} from '@/api/client'

const props = defineProps<{
  tableMeta: TableMeta
}>()

const toast = useToast()
const confirm = useConfirm()

const loading = ref(false)
const rows = ref<any[]>([])
const lazyParams = ref<QueryParams>({
  page: 1,
  limit: 10000,
  sortBy: 'id',
  sortOrder: 'ASC',
})

// Dialog state
const dialogVisible = ref(false)
const editingEntity = ref<any>(null)
const isNew = ref(false)

// Columns to display (exclude PKs)
const displayColumns = computed(() => {
  return props.tableMeta.columns.filter((col) => {
    if (col.isPrimary) return false
    return true
  })
})

// Relations that are ManyToOne or OneToOne (shown as columns)
const columnRelations = computed(() =>
  props.tableMeta.relations.filter(
    (r) => r.relationType === 'many-to-one' || r.relationType === 'one-to-one'
  )
)

async function loadData() {
  loading.value = true
  try {
    const result: PaginatedResponse<any> = await fetchAll(props.tableMeta.route, lazyParams.value)
    rows.value = result.data
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: e.message, life: 3000 })
  } finally {
    loading.value = false
  }
}

function onSort(event: any) {
  lazyParams.value.sortBy = event.sortField
  lazyParams.value.sortOrder = event.sortOrder === 1 ? 'ASC' : 'DESC'
  loadData()
}

function openNew() {
  editingEntity.value = {}
  isNew.value = true
  dialogVisible.value = true
}

function openEdit(row: any) {
  editingEntity.value = { ...row }
  isNew.value = false
  dialogVisible.value = true
}

async function onSave(formData: any) {
  try {
    if (isNew.value) {
      await createEntity(props.tableMeta.route, formData)
      toast.add({ severity: 'success', summary: 'Created', detail: 'Record created', life: 2000 })
    } else {
      await updateEntity(props.tableMeta.route, formData.id, formData)
      toast.add({ severity: 'success', summary: 'Updated', detail: 'Record updated', life: 2000 })
    }
    dialogVisible.value = false
    loadData()
  } catch (e: any) {
    toast.add({ severity: 'error', summary: 'Error', detail: e.response?.data?.message || e.message, life: 5000 })
  }
}

function confirmDelete(row: any) {
  confirm.require({
    message: `Delete "${row.name || row.id}"?`,
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await deleteEntity(props.tableMeta.route, row.id)
        toast.add({ severity: 'success', summary: 'Deleted', life: 2000 })
        loadData()
      } catch (e: any) {
        toast.add({ severity: 'error', summary: 'Error', detail: e.response?.data?.message || e.message, life: 5000 })
      }
    },
  })
}

// Get display value for a relation column
function getRelationDisplay(row: any, rel: any): string {
  const related = row[rel.propertyName]
  if (!related) return '—'
  return related.name || related.id || '—'
}

const TEXT_MAX_LENGTH = 60

// Truncate long text values for display
function truncate(value: any): string {
  if (value == null) return '—'
  const str = String(value)
  if (str.length <= TEXT_MAX_LENGTH) return str
  return str.slice(0, TEXT_MAX_LENGTH) + '…'
}

// Return full text for tooltip, or empty string if not truncated
function fullText(value: any): string {
  if (value == null) return ''
  const str = String(value)
  return str.length > TEXT_MAX_LENGTH ? str : ''
}

// Check if a column is a FK id column that has a corresponding relation
function isRelationIdColumn(colName: string): boolean {
  return columnRelations.value.some((r) => r.joinColumn === colName)
}

watch(() => props.tableMeta.route, () => {
  lazyParams.value = { page: 1, limit: 10000, sortBy: 'id', sortOrder: 'ASC' }
  loadData()
})

onMounted(loadData)
</script>

<template>
  <div class="crud-wrapper">
    <ConfirmDialog />

    <div class="crud-header">
      <h2>{{ tableMeta.displayName }}</h2>
      <Button label="New" icon="pi pi-plus" @click="openNew" />
    </div>

    <DataTable
    :value="rows"
    :loading="loading"
    @sort="onSort"
    scrollable
    removableSort
    stripedRows
    size="small"
    class="crud-table"
  >
    <Column field="id" header="ID" sortable style="width: 60px" />

    <template v-for="col in displayColumns" :key="col.name">
      <!-- Skip FK id columns that have a relation — we show the relation name instead -->
      <Column
        v-if="!isRelationIdColumn(col.name)"
        :field="col.name"
        :header="col.name"
        sortable
      >
        <template #body="{ data }">
          <span v-if="col.type === 'boolean'">
            <i :class="data[col.name] ? 'pi pi-check text-green' : 'pi pi-times text-red'" />
          </span>
          <span v-else :title="fullText(data[col.name])" class="cell-text">{{ truncate(data[col.name]) }}</span>
        </template>
      </Column>
    </template>

    <!-- Relation columns -->
    <Column
      v-for="rel in columnRelations"
      :key="rel.propertyName"
      :header="rel.propertyName"
    >
      <template #body="{ data }">
        {{ getRelationDisplay(data, rel) }}
      </template>
    </Column>

    <Column header="Actions" style="width: 120px" frozen alignFrozen="right">
      <template #body="{ data }">
        <div class="action-buttons">
          <Button icon="pi pi-pencil" text rounded size="small" @click="openEdit(data)" />
          <Button icon="pi pi-trash" text rounded size="small" severity="danger" @click="confirmDelete(data)" />
        </div>
      </template>
    </Column>
  </DataTable>

  <Dialog
    v-model:visible="dialogVisible"
    :header="isNew ? `New ${tableMeta.displayName}` : `Edit ${tableMeta.displayName}`"
    :modal="true"
    :style="{ width: '600px' }"
  >
    <EntityForm
      v-if="dialogVisible"
      :tableMeta="tableMeta"
      :entity="editingEntity"
      :isNew="isNew"
      @save="onSave"
      @cancel="dialogVisible = false"
    />
  </Dialog>
  </div>
</template>

<style scoped>
.crud-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

:deep(.crud-table) {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

:deep(.crud-table .p-datatable-table-container) {
  flex: 1;
  overflow: auto;
}

.crud-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-shrink: 0;
}
.crud-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #1e293b;
}
.action-buttons {
  display: flex;
  gap: 0.25rem;
}
.text-green { color: #22c55e; }
.text-red { color: #ef4444; }
.cell-text {
  display: inline-block;
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
</style>
