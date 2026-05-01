import { createRouter, createWebHistory, type NavigationGuardWithThis } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const adminGuard: NavigationGuardWithThis<undefined> = () => {
  const auth = useAuthStore();
  if (!auth.isAuthenticated) {
    return { name: 'login' };
  }
  if (!auth.isAdmin) {
    return { path: '/' };
  }
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { public: true },
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      beforeEnter: adminGuard,
      children: [
        {
          path: ':table',
          name: 'admin-table',
          component: () => import('@/views/admin/AdminTableView.vue'),
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (!to.meta.public && !auth.isAuthenticated) {
    return { name: 'login' };
  }
  if (to.name === 'login' && auth.isAuthenticated) {
    return { name: 'home' };
  }
});

export default router;
