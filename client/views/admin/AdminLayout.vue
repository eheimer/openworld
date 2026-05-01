<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMetadataStore } from '@/stores/metadata';
import PanelMenu from 'primevue/panelmenu';

const router = useRouter();
const route = useRoute();
const metadata = useMetadataStore();

const typeEmoji: Record<string, string> = {
  Canon: '📖',
  Dynamic: '⚡',
  Junction: '🔗',
};

const menuItems = computed(() => {
  const groups = metadata.getGroupedTables();
  return groups.map(([label, tables]) => ({
    label,
    icon: groupIcon(label),
    items: tables.map((t) => ({
      label: t.displayName,
      route: `/admin/${t.route}`,
      class: route.path === `/admin/${t.route}` ? 'active-menu-item' : '',
      typeEmoji: typeEmoji[metadata.getTableType(t.route)] ?? '',
    })),
  }));
});

function groupIcon(label: string): string {
  const icons: Record<string, string> = {
    'Combat': 'pi pi-bolt',
    'Equipment': 'pi pi-shield',
    'Crafting': 'pi pi-wrench',
    'Characters': 'pi pi-users',
    'Lookup Tables': 'pi pi-list',
  };
  return icons[label] || 'pi pi-table';
}

onMounted(async () => {
  await metadata.load();
  if (route.path === '/admin') {
    const groups = metadata.getGroupedTables();
    const firstTable = groups[0]?.[1]?.[0];
    if (firstTable) {
      router.replace(`/admin/${firstTable.route}`);
    }
  }
});
</script>

<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <router-link to="/admin" class="sidebar-header">
        <h2>⚔️ Open World</h2>
        <span class="subtitle">Admin Editor</span>
      </router-link>
      <nav class="sidebar-nav">
        <PanelMenu :model="menuItems" class="sidebar-menu">
          <template #item="{ item }">
            <router-link v-if="item.route" :to="item.route" class="menu-link" :class="item.class">
              <span>{{ item.label }}</span>
              <span v-if="item.typeEmoji" class="type-badge">{{ item.typeEmoji }}</span>
            </router-link>
            <span v-else class="menu-group">
              <i :class="item.icon" />
              <span>{{ item.label }}</span>
            </span>
          </template>
        </PanelMenu>
      </nav>
    </aside>
    <main class="admin-main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 260px;
  background: #1e293b;
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-header {
  display: block;
  padding: 1.25rem;
  border-bottom: 1px solid #334155;
  text-decoration: none;
  color: inherit;
}

.sidebar-header h2 {
  font-size: 1.25rem;
  margin: 0;
}

.subtitle {
  font-size: 0.8rem;
  color: #94a3b8;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.menu-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  color: #cbd5e1;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: background 0.15s;
}

.type-badge {
  font-size: 0.75rem;
  flex-shrink: 0;
}

.menu-link:hover {
  background: #334155;
  color: #f1f5f9;
}

.active-menu-item {
  background: #3b82f6 !important;
  color: #fff !important;
}

.menu-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.admin-main {
  flex: 1;
  padding: 1.5rem;
  overflow-x: auto;
  background: #f8f9fa;
}

:deep(.p-panelmenu) {
  background: transparent;
  border: none;
}

:deep(.p-panelmenu-panel) {
  background: transparent;
  border: none;
  margin-bottom: 0.25rem;
}

:deep(.p-panelmenu-header-content) {
  background: transparent !important;
  border: none !important;
  color: #e2e8f0 !important;
}

:deep(.p-panelmenu-content) {
  background: transparent !important;
  border: none !important;
}
</style>
