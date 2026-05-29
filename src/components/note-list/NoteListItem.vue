<template>
  <div
    :class="[
      'note-item',
      'note-item-animate',
      { 'active': active, 'pinned': note.isPinned }
    ]"
    @click="emit('select')"
    @contextmenu.prevent="onContextMenu($event)"
  >
    <div class="note-item-header">
      <h4 class="note-title font-body">{{ note.title || 'Untitled Note' }}</h4>
      <div class="note-badges">
        <span v-if="note.isPinned" class="pin-badge" title="Pinned">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <line x1="12" x2="12" y1="17" y2="22" />
            <path d="M5 17h14v-1.76a2 2 0 0 0-.44-1.24l-2.78-3.5A2 2 0 0 1 15 9.26V5a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4.26a2 2 0 0 1-.78 1.24l-2.78 3.5a2 2 0 0 0-.44 1.24Z" />
          </svg>
        </span>
        <span v-if="note.isFavorite" class="favorite-badge" title="Favorite">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </span>
      </div>
    </div>
    
    <p class="note-excerpt font-body">{{ excerpt }}</p>
    
    <div class="note-metadata font-ui">
      <span class="note-time">{{ timeLabel }}</span>
      <span class="note-tags" v-if="note.tags.length">
        <span v-for="tag in note.tags.slice(0, 2)" :key="tag" class="note-tag">@{{ tag }}</span>
        <span v-if="note.tags.length > 2" class="note-tag-more">+{{ note.tags.length - 2 }}</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Note } from '@/types';

const props = defineProps<{
  note: Note;
  active: boolean;
}>();

const emit = defineEmits(['select', 'contextmenu']);

const excerpt = computed(() => {
  if (props.note.encryptedWith === 'vault') {
    return '🔒 Encrypted Content';
  }
  let text = props.note.content
    .replace(/^#+\s+/gm, '') // Strip headings
    .replace(/[*_`~]/g, '')  // Strip formatting
    .replace(/\[x\]|\[ \]/g, '') // Strip checkboxes
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Strip links but keep text
    .trim();
  
  if (text.length > 80) {
    return text.substring(0, 80) + '...';
  }
  return text || 'No content';
});

const timeLabel = computed(() => {
  const diff = Date.now() - props.note.updatedAt;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  
  const date = new Date(props.note.updatedAt);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
});

function onContextMenu(event: MouseEvent) {
  emit('contextmenu', { event, note: props.note });
}
</script>

<style scoped>
.note-item {
  display: flex;
  flex-direction: column;
  padding: var(--space-md);
  border-bottom: 1px solid var(--border-subtle);
  cursor: pointer;
  background: var(--bg-elevated);
  transition: background var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out);
  position: relative;
}

.note-item:hover {
  background: var(--hover-bg);
}

.note-item.active {
  background: var(--accent-subtle);
  border-left: 3px solid var(--accent);
  padding-left: calc(var(--space-md) - 3px);
}

.note-item-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 4px;
  gap: var(--space-xs);
}

.note-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.note-badges {
  display: flex;
  gap: var(--space-xs);
  flex-shrink: 0;
}

.pin-badge,
.favorite-badge {
  color: var(--accent);
  display: inline-flex;
}

.note-excerpt {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.note-metadata {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  color: var(--text-muted);
}

.note-tags {
  display: flex;
  gap: 4px;
}

.note-tag {
  background: var(--bg-sunken);
  color: var(--text-secondary);
  padding: 1px 4px;
  border-radius: 3px;
}

.note-tag-more {
  color: var(--text-muted);
}
</style>
