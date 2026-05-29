<template>
  <header class="topbar">
    <div class="topbar-left">
      <!-- On mobile and viewing a note detail or settings, show Back button. Otherwise show Sidebar toggle. -->
      <IconButton
        v-if="isMobile && (route.name === 'note-detail' || route.name === 'settings')"
        @click="goBack"
        aria-label="Back to Notes"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </IconButton>
      <IconButton
        v-else
        @click="uiStore.toggleSidebar"
        aria-label="Toggle Sidebar"
        :active="uiStore.isSidebarOpen"
      >
        <!-- Sidebar Toggle Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M9 3v18" />
        </svg>
      </IconButton>

      <router-link to="/" class="logo-link">
        <span class="logo-aether">Aether</span>
        <span class="logo-notes">Notes</span>
      </router-link>
    </div>

    <div class="topbar-right">
      <!-- Search Cmd+K Trigger -->
      <button class="search-trigger" @click="uiStore.toggleSearch" aria-label="Search">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span class="search-placeholder font-ui">Search notes...</span>
        <kbd class="shortcut font-ui">⌘K</kbd>
      </button>

      <!-- Theme Switcher -->
      <IconButton @click="toggleTheme" aria-label="Toggle Theme">
        <!-- System Theme Icon -->
        <svg v-if="settingsStore.theme === 'system'" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round">
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
        <!-- Dark Theme Icon -->
        <svg v-else-if="settingsStore.theme === 'dark'" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
        <!-- Light Theme Icon -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </IconButton>

      <!-- Toggle Outline Sidebar -->
      <IconButton
        v-if="route.name !== 'settings'"
        @click="uiStore.toggleOutline"
        aria-label="Toggle Outline"
        :active="uiStore.isOutlineOpen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="8" x2="21" y1="6" y2="6" />
          <line x1="8" x2="21" y1="12" y2="12" />
          <line x1="8" x2="21" y1="18" y2="18" />
          <line x1="3" x2="3.01" y1="6" y2="6" />
          <line x1="3" x2="3.01" y1="12" y2="12" />
          <line x1="3" x2="3.01" y1="18" y2="18" />
        </svg>
      </IconButton>

      <!-- Settings Panel Shortcut -->
      <IconButton @click="navigateToSettings" aria-label="Settings" :active="route.name === 'settings'">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </IconButton>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import IconButton from '@/components/shared/IconButton.vue';
import { useUiStore } from '@/stores/ui';
import { useSettingsStore } from '@/stores/settings';
import { useRouter, useRoute } from 'vue-router';
import { useWindowSize } from '@vueuse/core';

const uiStore = useUiStore();
const settingsStore = useSettingsStore();
const router = useRouter();
const route = useRoute();

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

function toggleTheme() {
  const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
  const nextIdx = (themes.indexOf(settingsStore.theme) + 1) % themes.length;
  settingsStore.setSetting('theme', themes[nextIdx]);
}

function navigateToSettings() {
  if (route.name === 'settings') {
    router.push('/note');
  } else {
    router.push('/settings');
  }
}

function goBack() {
  router.push('/note');
}
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--topbar-height);
  padding: 0 var(--space-md);
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
  z-index: 50;
  user-select: none;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.logo-link {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.logo-aether {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 20px;
  font-style: italic;
  color: var(--text-primary);
}

.logo-notes {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.search-trigger {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 var(--space-sm) 0 var(--space-md);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-sunken);
  color: var(--text-muted);
  cursor: pointer;
  width: 180px;
  transition: all var(--duration-fast) var(--ease-out);
}

.search-trigger:hover {
  border-color: var(--text-muted);
  color: var(--text-secondary);
}

.search-icon {
  margin-right: var(--space-sm);
  color: var(--text-muted);
  flex-shrink: 0;
}

.search-placeholder {
  font-size: 11px;
  text-align: left;
  flex: 1;
}

.shortcut {
  font-size: 10px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1px 4px;
  color: var(--text-secondary);
  margin-left: var(--space-xs);
  flex-shrink: 0;
}

@media (max-width: 767px) {
  .search-trigger {
    width: 32px;
    padding: 0;
    justify-content: center;
    background: transparent;
    border: none;
  }

  .search-trigger:hover {
    background: var(--bg-sunken);
  }

  .search-icon {
    margin-right: 0;
  }

  .search-placeholder,
  .shortcut {
    display: none;
  }
}
</style>
