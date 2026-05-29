<template>
  <node-view-wrapper class="code-block-wrapper">
    <div class="code-block-actions font-ui" contenteditable="false">
      <!-- Copy Button -->
      <button class="action-btn copy-btn" @click="copyCode" :class="{ 'is-copied': copied }" title="Copy Code">
        <template v-if="copied">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Copied
        </template>
        <template v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          Copy
        </template>
      </button>

      <!-- Delete Button -->
      <button class="action-btn delete-btn" @click="deleteBlock" title="Delete Code Block">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>
        Delete
      </button>
    </div>

    <pre><node-view-content as="code" /></pre>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from '@tiptap/vue-3';

const props = defineProps(nodeViewProps);

const copied = ref(false);

function copyCode() {
  const text = props.node.textContent;
  navigator.clipboard.writeText(text).then(() => {
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  });
}

function deleteBlock() {
  props.deleteNode();
}
</script>

<style scoped>
.code-block-wrapper {
  position: relative;
  margin: 1.5rem 0;
  border-radius: var(--radius-lg);
  background: var(--bg-sunken);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
}

.code-block-actions {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--bg-sunken);
  border: 1px solid transparent;
  border-radius: var(--radius);
  padding: 2px 4px;
  z-index: 10;
  transition: all var(--duration-fast) var(--ease-out);
  opacity: 0.6;
}

.code-block-wrapper:hover .code-block-actions {
  background: var(--bg-elevated);
  border-color: var(--border);
  box-shadow: var(--shadow-sm);
  opacity: 1;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 11px;
  padding: 4px 6px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.action-btn:hover {
  background: var(--bg-sunken);
  color: var(--text-primary);
}

.copy-btn.is-copied {
  color: var(--notion-green);
}

.delete-btn:hover {
  background: rgba(229, 115, 115, 0.1);
  color: var(--notion-red);
}

pre {
  margin: 0;
  padding: 2.5rem var(--space-lg) var(--space-md);
  overflow-x: auto;
  font-family: var(--editor-font-family, monospace);
  font-size: 0.9em;
  background: transparent;
}
</style>
