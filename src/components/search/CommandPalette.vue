<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="uiStore.isSearchOpen" class="search-overlay" @click="closeSearch">
        <div class="search-modal animate-slide-down" @click.stop>
          
          <!-- Search Header Input -->
          <div class="search-input-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-modal-icon">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              class="search-modal-input font-ui"
              placeholder="Search notes or type a command..."
              @keydown.down.prevent="navigateDown"
              @keydown.up.prevent="navigateUp"
              @keydown.enter.prevent="selectActiveItem"
              @keydown.esc="closeSearch"
            />
            <span class="esc-hint font-ui">esc</span>
          </div>

          <!-- Search Results / Commands list -->
          <div ref="resultsContainer" class="search-results-list font-ui">
            <!-- Results matching query -->
            <div v-if="searchQuery.trim()" class="section-container">
              <div v-if="searchResults.length > 0">
                <div class="section-title">Notes</div>
                <div
                  v-for="(result, index) in searchResults"
                  :key="result.item.id"
                  :class="['result-item', { 'active': activeIndex === index }]"
                  @mouseenter="activeIndex = index"
                  @click="selectNote(result.item.id)"
                >
                  <div class="result-note-title font-body">{{ result.item.title }}</div>
                  <div class="result-note-excerpt font-body">{{ getSnippet(result.item) }}</div>
                </div>
              </div>
              <div v-else class="search-empty font-body">
                No matching notes found.
              </div>
            </div>

            <!-- Commands when query is empty -->
            <div v-else class="section-container">
              <div class="section-title">Quick Actions</div>
              <div
                v-for="(cmd, index) in commandActions"
                :key="cmd.label"
                :class="['result-item', 'command-item', { 'active': activeIndex === index }]"
                @mouseenter="activeIndex = index"
                @click="executeCommand(cmd)"
              >
                <span class="command-icon">
                  <component :is="cmd.icon" />
                </span>
                <span class="command-label">{{ cmd.label }}</span>
                <span class="command-shortcut" v-if="cmd.shortcut">{{ cmd.shortcut }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, markRaw, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '@/stores/ui';
import { useNotesStore } from '@/stores/notes';
import { useSettingsStore } from '@/stores/settings';
import { useSearch } from '@/composables/useSearch';
import type { Note } from '@/types';

const router = useRouter();
const uiStore = useUiStore();
const notesStore = useNotesStore();
const settingsStore = useSettingsStore();

const { searchQuery, searchResults } = useSearch();

const searchInput = ref<HTMLInputElement | null>(null);
const resultsContainer = ref<HTMLElement | null>(null);
const activeIndex = ref(0);

// Icons for commands (represented inline to keep zero bundle dependencies)
const IconNewNote = markRaw({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M5 12h14M12 5v14"/>
    </svg>
  `
});

const IconTheme = markRaw({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  `
});

const IconSettings = markRaw({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  `
});

const IconTrash = markRaw({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    </svg>
  `
});

interface Command {
  label: string;
  icon: any;
  shortcut?: string;
  action: () => void;
}

const commandActions = computed<Command[]>(() => [
  {
    label: 'New Note',
    icon: IconNewNote,
    shortcut: '⌘N',
    action: async () => {
      const newNote = await notesStore.createNote(uiStore.activeFolderId);
      router.push(`/note/${newNote.id}`);
    }
  },
  {
    label: 'Toggle Theme',
    icon: IconTheme,
    shortcut: '⌘⇧L',
    action: () => {
      const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
      const nextIdx = (themes.indexOf(settingsStore.theme) + 1) % themes.length;
      settingsStore.setSetting('theme', themes[nextIdx]);
    }
  },
  {
    label: 'Go to Settings',
    icon: IconSettings,
    action: () => {
      router.push('/settings');
    }
  },
  {
    label: 'Go to Trash',
    icon: IconTrash,
    action: () => {
      router.push('/trash');
    }
  }
]);

// Watch command modal visibility and focus input
watch(() => uiStore.isSearchOpen, (open) => {
  if (open) {
    searchQuery.value = '';
    activeIndex.value = 0;
    nextTick(() => {
      searchInput.value?.focus();
    });
  }
});

// Watch query updates and reset index
watch(searchQuery, () => {
  activeIndex.value = 0;
});

function closeSearch() {
  uiStore.isSearchOpen = false;
}

function navigateDown() {
  const max = searchQuery.value.trim() ? searchResults.value.length : commandActions.value.length;
  if (max === 0) return;
  activeIndex.value = (activeIndex.value + 1) % max;
  scrollActiveIntoView();
}

function navigateUp() {
  const max = searchQuery.value.trim() ? searchResults.value.length : commandActions.value.length;
  if (max === 0) return;
  activeIndex.value = (activeIndex.value - 1 + max) % max;
  scrollActiveIntoView();
}

function selectActiveItem() {
  if (searchQuery.value.trim()) {
    const result = searchResults.value[activeIndex.value];
    if (result) {
      selectNote(result.item.id);
    }
  } else {
    const cmd = commandActions.value[activeIndex.value];
    if (cmd) {
      executeCommand(cmd);
    }
  }
}

function selectNote(noteId: string) {
  closeSearch();
  router.push(`/note/${noteId}`);
}

function executeCommand(cmd: Command) {
  closeSearch();
  cmd.action();
}

function getSnippet(note: Note): string {
  if (note.encryptedWith === 'vault') {
    return '🔒 Encrypted Content';
  }
  const clean = note.content
    .replace(/^#+\s+/gm, '') // headings
    .replace(/[*_`~]/g, '')
    .trim();
  return clean.slice(0, 100) || 'Empty note';
}

function scrollActiveIntoView() {
  nextTick(() => {
    const activeEl = resultsContainer.value?.querySelector('.result-item.active') as HTMLElement;
    if (activeEl && resultsContainer.value) {
      const container = resultsContainer.value;
      const top = activeEl.offsetTop;
      const bottom = top + activeEl.offsetHeight;
      const viewTop = container.scrollTop;
      const viewBottom = viewTop + container.offsetHeight;

      if (top < viewTop) {
        container.scrollTop = top;
      } else if (bottom > viewBottom) {
        container.scrollTop = bottom - container.offsetHeight;
      }
    }
  });
}
</script>

<style scoped>
.search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  padding-top: 14vh;
  z-index: 10000;
}

.search-modal {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  width: 90%;
  max-width: 540px;
  max-height: 380px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 var(--space-md);
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}

.search-modal-icon {
  color: var(--text-muted);
  margin-right: var(--space-sm);
  flex-shrink: 0;
}

.search-modal-input {
  flex: 1;
  font-size: 14px;
  color: var(--text-primary);
  border: none;
  background: transparent;
  outline: none;
}

.search-modal-input::placeholder {
  color: var(--text-muted);
  opacity: 0.8;
}

.esc-hint {
  font-size: 10px;
  background: var(--bg-sunken);
  border: 1px solid var(--border);
  color: var(--text-muted);
  border-radius: 4px;
  padding: 2px 5px;
}

.search-results-list {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-sm) 0;
}

.section-container {
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 10px;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 600;
  padding: var(--space-xs) var(--space-md);
  letter-spacing: 0.5px;
}

.result-item {
  display: flex;
  flex-direction: column;
  padding: 10px var(--space-md);
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease-out);
}

.result-item.active {
  background: var(--accent-subtle);
}

.result-note-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.result-note-excerpt {
  font-size: 12px;
  color: var(--text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.command-item {
  flex-direction: row;
  align-items: center;
  height: 36px;
  padding: 0 var(--space-md);
}

.command-icon {
  margin-right: var(--space-sm);
  color: var(--text-secondary);
  display: inline-flex;
}

.result-item.active .command-icon {
  color: var(--accent);
}

.command-label {
  flex: 1;
  font-size: 12px;
  color: var(--text-primary);
}

.command-shortcut {
  font-size: 10px;
  color: var(--text-muted);
  background: var(--bg-sunken);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  padding: 1px 4px;
}

.search-empty {
  font-size: 13px;
  color: var(--text-secondary);
  padding: var(--space-md);
  text-align: center;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--duration-base) var(--ease-out);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
