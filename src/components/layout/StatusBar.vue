<template>
  <footer class="statusbar font-ui">
    <div class="statusbar-left">
      <span>{{ notesCountLabel }}</span>
    </div>
    
    <div class="statusbar-right">
      <div v-if="hasStats" class="stats">
        <span>{{ uiStore.wordCount }} words</span>
        <span class="divider">·</span>
        <span>{{ uiStore.charCount }} chars</span>
      </div>
      <span v-if="hasStats" class="divider">·</span>
      
      <!-- Save Indicator -->
      <div :class="['save-indicator', uiStore.saveStatus]">
        <span v-if="uiStore.saveStatus === 'saved'">Saved ✓</span>
        <span v-else-if="uiStore.saveStatus === 'saving'" class="saving">Saving...</span>
        <span v-else class="error">Save Error ⚠</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useNotesStore } from '@/stores/notes';
import { useUiStore } from '@/stores/ui';
import { useRoute } from 'vue-router';

const notesStore = useNotesStore();
const uiStore = useUiStore();
const route = useRoute();

const notesCountLabel = computed(() => {
  const count = notesStore.activeNotes.length;
  if (count === 0) return 'No notes';
  if (count === 1) return '1 note';
  return `${count} notes`;
});

const hasStats = computed(() => {
  // Only show stats when we are in a note route (not settings or empty state)
  return route.name === 'note-detail' && (uiStore.wordCount > 0 || uiStore.charCount > 0);
});
</script>

<style scoped>
.statusbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--statusbar-height);
  padding: 0 var(--space-md);
  background: var(--bg-sunken);
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 11px;
  user-select: none;
  z-index: 50;
}

.statusbar-right {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.stats {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.divider {
  color: var(--text-muted);
  opacity: 0.5;
}

.save-indicator {
  font-weight: 500;
}

.save-indicator.saved {
  color: var(--text-muted);
}

.save-indicator.saving {
  color: var(--accent);
}

.save-indicator.error {
  color: var(--accent);
  font-weight: bold;
}
</style>
