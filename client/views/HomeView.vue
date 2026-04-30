<script setup lang="ts">
import Button from 'primevue/button';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
</script>

<template>
  <main class="home">
    <h1>Open World</h1>
    <p>Welcome, {{ auth.player?.username }}.</p>
    <p v-if="auth.isAdmin" class="admin-badge">Admin</p>
    <Button label="Logout" severity="secondary" @click="auth.logout()" />
  </main>
</template>

<style scoped>
.home {
  padding: 2rem;
}

.admin-badge {
  display: inline-block;
  background: #3b82f6;
  color: white;
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
</style>
