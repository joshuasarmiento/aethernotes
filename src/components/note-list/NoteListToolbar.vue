<template>
  <div class="list-toolbar font-ui">
    <div class="toolbar-left">
      <span class="view-title">{{ activeTitle }}</span>
    </div>
    
    <div class="toolbar-right">
      <!-- Sort Order Toggle -->
      <button
        v-if="!isTrash"
        class="sort-button"
        @click="toggleSort"
        :title="sortBy === 'updated' ? 'Sorting by date' : 'Sorting by title'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <span>{{ sortBy === 'updated' ? 'Date' : 'Title' }}</span>
      </button>
      
      <!-- Empty Trash Action -->
      <button
        v-else
        class="empty-trash-btn"
        @click="emit('empty-trash')"
      >
        Empty Trash
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFoldersStore } from '@/stores/folders';
import { useUiStore } from '@/stores/ui';

const props = defineProps<{
  sortBy: 'updated' | 'title';
  isTrash: boolean;
}>();

const emit = defineEmits(['update:sortBy', 'empty-trash']);

const uiStore = useUiStore();
const foldersStore = useFoldersStore();

const activeTitle = computed(() => {
  if (props.isTrash) return 'Trash';
  if (uiStore.activeTag) return `#${uiStore.activeTag}`;
  if (uiStore.activeFolderId) {
    const folder = foldersStore.folders.find(f => f.id === uiStore.activeFolderId);
    return folder ? folder.name : 'Folder';
  }
  return 'All Notes';
});

function toggleSort() {
  const next = props.sortBy === 'updated' ? 'title' : 'updated';
  emit('update:sortBy', next);
}
</script>

<style scoped>
.list-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 38px;
  padding: 0 var(--space-md);
  border-bottom: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  user-select: none;
  flex-shrink: 0;
}

.view-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
}

.sort-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 11px;
  color: var(--text-muted);
  cursor: pointer;
  padding: 3px 6px;
  border-radius: var(--radius);
  transition: all var(--duration-fast) var(--ease-out);
}

.sort-button:hover {
  background: var(--bg-sunken);
  color: var(--text-primary);
}

.empty-trash-btn {
  font-size: 11px;
  color: var(--accent);
  font-weight: 500;
  cursor: pointer;
  padding: 3px 8px;
  border-radius: var(--radius);
  background: var(--accent-subtle);
  transition: all var(--duration-fast) var(--ease-out);
}

.empty-trash-btn:hover {
  background: var(--accent);
  color: var(--bg-elevated);
}
</style>
