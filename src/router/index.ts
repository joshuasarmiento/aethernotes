import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import AppShell from '@/components/layout/AppShell.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/LandingPage.vue'),
  },
  {
    path: '/download',
    name: 'download',
    component: () => import('@/views/DownloadPage.vue'),
  },
  {
    path: '/',
    component: AppShell,
    children: [
      {
        path: 'note',
        name: 'note-empty',
        component: () => import('@/components/editor/NoteEditor.vue'),
      },
      {
        path: 'note/:id',
        name: 'note-detail',
        component: () => import('@/components/editor/NoteEditor.vue'),
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/components/settings/SettingsPanel.vue'),
      },
      {
        path: 'trash',
        name: 'trash',
        component: () => import('@/components/editor/NoteEditor.vue'),
      }
    ]
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
