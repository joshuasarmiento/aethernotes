<template>
  <div class="sidebar-actions font-ui">
    <button class="action-btn new-note" @click="emit('new-note')">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
      <span>New Note</span>
    </button>
    
    <button class="action-btn new-folder" @click="emit('new-folder')" title="New Folder">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
        <path d="M12 10v6" />
        <path d="M9 13h6" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['new-note', 'new-folder']);
</script>

<style scoped>
.sidebar-actions {
  display: flex;
  gap: var(--space-xs);
  padding: var(--space-md);
  border-bottom: 1px solid var(--border-subtle);
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.new-note {
  flex: 1;
  background: var(--accent);
  color: var(--bg-elevated);
  gap: var(--space-xs);
  font-size: 12px;
  font-weight: 500;
}

.new-note:hover {
  opacity: 0.95;
  transform: translateY(-0.5px);
}

.new-folder {
  width: 32px;
  background: var(--bg-sunken);
  color: var(--text-secondary);
  border: 1px solid var(--border);
}

.new-folder:hover {
  background: var(--border-subtle);
  color: var(--text-primary);
}
</style>
