<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Toast from 'primevue/toast';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <Toast />
  <header v-if="authStore.isAuthenticated" class="app-header">
    <nav class="app-nav">
      <router-link to="/">Home</router-link>
      <router-link v-if="authStore.isAdmin" to="/admin">Admin</router-link>
      <button class="logout-btn" @click="authStore.logout()">Logout</button>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
.app-header {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--p-surface-200, #e2e8f0);
  background: var(--p-surface-0, #ffffff);
}

.app-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-nav a {
  text-decoration: none;
  color: var(--p-primary-color, #3b82f6);
  font-weight: 500;
}

.app-nav a.router-link-active {
  color: var(--p-primary-700, #1d4ed8);
}

.logout-btn {
  margin-left: auto;
  background: none;
  border: none;
  color: var(--p-text-muted-color, #64748b);
  cursor: pointer;
  font-size: 0.875rem;
}

.logout-btn:hover {
  color: var(--p-text-color, #1e293b);
}
</style>
