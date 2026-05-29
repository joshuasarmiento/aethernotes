<template>
  <div v-if="notesStore.tagsList.length" class="tag-list font-ui">
    <div class="tag-list-header">Tags</div>
    <div class="tags-container">
      <button
        v-for="tag in notesStore.tagsList"
        :key="tag.name"
        :class="['tag-item', { 'active': uiStore.activeTag === tag.name }]"
        @click="selectTag(tag.name)"
      >
        <span class="tag-hash">@</span>
        <span class="tag-name">{{ tag.name }}</span>
        <span class="tag-count">{{ tag.count }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotesStore } from '@/stores/notes';
import { useUiStore } from '@/stores/ui';

const notesStore = useNotesStore();
const uiStore = useUiStore();

function selectTag(tagName: string) {
  if (uiStore.activeTag === tagName) {
    uiStore.selectTag(null); // Toggle off if clicked again
  } else {
    uiStore.selectTag(tagName);
  }
}
</script>

<style scoped>
.tag-list {
  display: flex;
  flex-direction: column;
}

.tag-list-header {
  font-size: 11px;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: var(--space-md) var(--space-md) var(--space-xs);
  font-weight: 500;
  letter-spacing: 0.5px;
}

.tags-container {
  display: flex;
  flex-direction: column;
  padding: 0 var(--space-sm);
}

.tag-item {
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 var(--space-sm);
  border-radius: var(--radius);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 12px;
  transition: all var(--duration-fast) var(--ease-out);
  text-align: left;
}

.tag-item:hover {
  background: var(--sidebar-hover);
  color: var(--text-primary);
}

.tag-item.active {
  background: var(--accent-subtle);
  color: var(--accent);
  font-weight: 500;
}

.tag-hash {
  margin-right: 2px;
  opacity: 0.7;
}

.tag-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tag-count {
  font-size: 10px;
  background: var(--border-subtle);
  color: var(--text-muted);
  padding: 1px 5px;
  border-radius: 10px;
  margin-left: var(--space-xs);
}

.tag-item.active .tag-count {
  background: rgba(196, 93, 62, 0.2);
  color: var(--accent);
}
</style>
