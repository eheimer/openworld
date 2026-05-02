<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMetadataStore } from '@/stores/metadata';

const router = useRouter();
const route = useRoute();
const metadata = useMetadataStore();

const typeEmoji: Record<string, string> = {
  Canon: '📖',
  Dynamic: '⚡',
  Junction: '🔗',
};

const typeLabel: Record<string, string> = {
  Canon: 'Canon — static game data (read-only)',
  Dynamic: 'Dynamic — runtime session data',
  Junction: 'Junction — relationship table',
};

const groupedTables = computed(() => {
  return metadata.getGroupedTables().map(([label, tables]) => ({
    label,
    icon: groupIcon(label),
    tables: tables.map((t) => ({
      ...t,
      path: `/admin/${t.route}`,
      active: route.path === `/admin/${t.route}`,
      emoji: typeEmoji[metadata.getTableType(t.route)] ?? '',
      typeTitle: typeLabel[metadata.getTableType(t.route)] ?? '',
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
        <div v-for="group in groupedTables" :key="group.label" class="sidebar-group">
          <div class="menu-group">
            <i :class="group.icon" />
            <span>{{ group.label }}</span>
          </div>
          <router-link
            v-for="t in group.tables"
            :key="t.route"
            :to="t.path"
            class="menu-link"
            :class="{ 'active-menu-item': t.active }"
          >
            <span>{{ t.displayName }}</span>
            <span v-if="t.emoji" class="type-badge" :title="t.typeTitle">{{ t.emoji }}</span>
          </router-link>
        </div>
      </nav>
    </aside>
    <main class="admin-main">
      <router-view v-slot="{ Component }">
        <component :is="Component" style="display: flex; flex-direction: column; flex: 1; min-height: 0;" />
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
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

.sidebar-group {
  margin-bottom: 0.75rem;
}

.admin-main {
  flex: 1;
  padding: 1.5rem;
  overflow: hidden;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
</style>
