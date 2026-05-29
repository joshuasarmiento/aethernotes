<template>
  <Teleport to="body">
    <div
      v-if="show"
      ref="menuRef"
      class="context-menu font-ui"
      :style="{ top: `${y}px`, left: `${x}px` }"
      @click.stop
    >
      <slot></slot>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';

const props = defineProps<{
  show: boolean;
  x: number;
  y: number;
}>();

const emit = defineEmits(['close']);

const menuRef = ref<HTMLElement | null>(null);

function handleOutsideClick(event: MouseEvent) {
  if (props.show && menuRef.value && !menuRef.value.contains(event.target as Node)) {
    emit('close');
  }
}

watch(() => props.show, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 10);
  } else {
    document.removeEventListener('click', handleOutsideClick);
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});
</script>

<style scoped>
.context-menu {
  position: fixed;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  padding: var(--space-xs) 0;
  min-width: 140px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
}

:deep(.context-menu-item) {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 6px var(--space-md);
  font-size: 12px;
  color: var(--text-primary);
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease-out);
}

:deep(.context-menu-item:hover) {
  background: var(--accent-subtle);
  color: var(--accent);
}

:deep(.context-menu-item.danger) {
  color: var(--accent);
}

:deep(.context-menu-item.danger:hover) {
  background: var(--accent-subtle);
}

:deep(.context-menu-divider) {
  height: 1px;
  background: var(--border-subtle);
  margin: var(--space-xs) 0;
}
</style>
