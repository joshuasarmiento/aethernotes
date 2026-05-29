<template>
  <div
    :class="[
      'app-shell',
      {
        'sidebar-closed': !uiStore.isSidebarOpen,
        'focus-mode-active': uiStore.isFocusMode
      }
    ]"
  >
    <!-- Organic Noise Overlay -->
    <div class="noise-overlay"></div>

    <!-- Topbar Header Navigation -->
    <TopBar />

    <!-- Three/Two/One Pane Layout Grid -->
    <div class="layout-body">
      <!-- Sidebar Pane -->
      <Sidebar class="pane-sidebar" />

      <!-- Note Selection List Pane -->
      <NoteList v-if="showNoteList" class="pane-notelist" />

      <!-- Main Content Editor/Settings Pane -->
      <div v-if="showContent" class="pane-content">
        <router-view v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </router-view>
      </div>
    </div>

    <!-- Footer Status info -->
    <StatusBar />

    <!-- Command Palette (Ctrl/Cmd+K Search Modal) -->
    <CommandPalette />

    <!-- PWA Installation Prompt Dialog -->
    <PwaInstallPrompt />

    <!-- Documentation Dialog -->
    <DocsDialog v-if="uiStore.isDocsOpen" @close="uiStore.isDocsOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useUiStore } from '@/stores/ui';
import { useNotesStore } from '@/stores/notes';
import { useFoldersStore } from '@/stores/folders';
import { useSettingsStore } from '@/stores/settings';
import { useTheme } from '@/composables/useTheme';
import { useKeyboard } from '@/composables/useKeyboard';
import { useWindowSize } from '@vueuse/core';

import TopBar from './TopBar.vue';
import Sidebar from '@/components/sidebar/Sidebar.vue';
import NoteList from '@/components/note-list/NoteList.vue';
import StatusBar from './StatusBar.vue';
import CommandPalette from '@/components/search/CommandPalette.vue';
import PwaInstallPrompt from './PwaInstallPrompt.vue';
import DocsDialog from './DocsDialog.vue';

const route = useRoute();
const uiStore = useUiStore();
const notesStore = useNotesStore();
const foldersStore = useFoldersStore();
const settingsStore = useSettingsStore();

// Register hooks
useTheme();
useKeyboard();

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

// Show list for note views and trash
const showNoteList = computed(() => {
  if (isMobile.value) {
    return route.name === 'note-empty' || route.name === 'trash';
  }
  return route.name !== 'settings';
});

const showContent = computed(() => {
  if (isMobile.value) {
    return route.name === 'note-detail' || route.name === 'settings';
  }
  return true;
});

let handlePwaPrompt: ((e: any) => void) | null = null;

onMounted(async () => {
  // Load preferences first (critical for encryption setup and theme)
  await settingsStore.loadSettings();

  // Load folders and notes
  await foldersStore.loadFolders();
  await notesStore.loadNotes();

  // Clean old trashed items automatically
  await notesStore.purgeOldTrash(30);

  // Sync captured prompt
  if ((window as any).deferredPrompt) {
    uiStore.setPwaInstallPrompt((window as any).deferredPrompt);
  }

  // Listen for beforeinstallprompt in case it fires later
  handlePwaPrompt = (e: any) => {
    e.preventDefault();
    (window as any).deferredPrompt = e;
    uiStore.setPwaInstallPrompt(e);
  };
  window.addEventListener('beforeinstallprompt', handlePwaPrompt);
});

onBeforeUnmount(() => {
  if (handlePwaPrompt) {
    window.removeEventListener('beforeinstallprompt', handlePwaPrompt);
  }
});
</script>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: var(--bg);
}

.layout-body {
  display: flex;
  flex: 1;
  width: 100%;
  overflow: hidden;
  position: relative;
}

/* Default Mobile: Sidebar is absolute overlay drawer */
.pane-sidebar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  transition: transform var(--duration-base) var(--ease-out);
}

.sidebar-closed .pane-sidebar {
  transform: translateX(-100%);
}

.pane-notelist {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
}

.pane-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Responsive Overrides (breakpoints, desktop first or mobile first?) -> We use mobile first, so min-width */
@media (min-width: 768px) {
  .pane-sidebar {
    position: relative;
    left: auto;
    top: auto;
    bottom: auto;
    z-index: 10;
    transition: transform var(--duration-base) var(--ease-out), margin var(--duration-base) var(--ease-out);
  }

  .sidebar-closed .pane-sidebar {
    transform: translateX(-100%);
    margin-right: calc(-1 * var(--sidebar-width));
  }

  /* Focus Mode Layout overrides */
  .focus-mode-active .pane-sidebar {
    transform: translateX(-100%);
    margin-right: calc(-1 * var(--sidebar-width));
    pointer-events: none;
  }

  .pane-notelist {
    width: var(--note-list-width);
    transition: transform var(--duration-base) var(--ease-out), margin var(--duration-base) var(--ease-out);
  }

  .focus-mode-active .pane-notelist {
    transform: translateX(-100%);
    margin-right: calc(-1 * var(--note-list-width));
    pointer-events: none;
  }

  .pane-content {
    flex: 1;
    width: auto;
  }
}

@media (min-width: 768px) and (max-width: 1279px) {
  /* Tablet layout: Collapsible list becomes sheet or collapses */
  .sidebar-closed .pane-notelist {
    margin-left: 0;
  }
}
</style>
