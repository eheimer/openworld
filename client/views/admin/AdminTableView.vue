<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMetadataStore } from '@/stores/metadata';
import CrudTable from '@/components/CrudTable.vue';

const route = useRoute();
const router = useRouter();
const metadata = useMetadataStore();

const tableMeta = computed(() => {
  const tableRoute = route.params.table as string;
  return metadata.getTable(tableRoute);
});

watch(tableMeta, (meta) => {
  if (!meta) {
    const groups = metadata.getGroupedTables();
    const firstTable = groups[0]?.[1]?.[0];
    if (firstTable) {
      router.replace(`/admin/${firstTable.route}`);
    }
  }
});
</script>

<template>
  <CrudTable v-if="tableMeta" :table-meta="tableMeta" />
</template>
