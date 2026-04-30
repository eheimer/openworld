import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { login as apiLogin, fetchMe, type PlayerInfo } from '@/api/client';
import router from '@/router';

export const useAuthStore = defineStore('auth', () => {
  const player = ref<PlayerInfo | null>(null);
  const token = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => player.value?.isAdmin ?? false);

  function loadFromStorage() {
    const storedToken = localStorage.getItem('jwt_token');
    const storedPlayer = localStorage.getItem('player');
    if (storedToken) {
      token.value = storedToken;
    }
    if (storedPlayer) {
      try {
        player.value = JSON.parse(storedPlayer);
      } catch {
        player.value = null;
      }
    }
  }

  async function login(username: string, password: string) {
    const response = await apiLogin(username, password);
    token.value = response.token;
    player.value = response.player;
    localStorage.setItem('jwt_token', response.token);
    localStorage.setItem('player', JSON.stringify(response.player));
  }

  function logout() {
    token.value = null;
    player.value = null;
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('player');
    router.push({ name: 'login' });
  }

  async function refreshPlayer() {
    if (!token.value) return;
    try {
      player.value = await fetchMe();
      localStorage.setItem('player', JSON.stringify(player.value));
    } catch {
      logout();
    }
  }

  // Listen for 401 logout events from the API interceptor
  window.addEventListener('auth:logout', () => {
    token.value = null;
    player.value = null;
    router.push({ name: 'login' });
  });

  // Restore state on store creation
  loadFromStorage();

  return {
    player,
    token,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    refreshPlayer,
  };
});
