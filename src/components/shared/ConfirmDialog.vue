<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="show" class="dialog-overlay" @click="emit('cancel')">
        <div class="dialog-card animate-slide-down" @click.stop>
          <h3 class="dialog-title font-display">{{ title }}</h3>
          <p class="dialog-message font-body">{{ message }}</p>
          <div class="dialog-actions font-ui">
            <button class="btn btn-secondary" @click="emit('cancel')">
              {{ cancelText || 'Cancel' }}
            </button>
            <button
              :class="['btn', isDanger ? 'btn-danger' : 'btn-primary']"
              @click="emit('confirm')"
            >
              {{ confirmText || 'Confirm' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}>();

const emit = defineEmits(['confirm', 'cancel']);
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.dialog-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--space-lg);
  max-width: 400px;
  width: 90%;
  text-align: left;
}

.dialog-title {
  font-size: 22px;
  margin-bottom: var(--space-sm);
  color: var(--text-primary);
}

.dialog-message {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-lg);
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
}

.btn {
  padding: 6px 14px;
  border-radius: var(--radius);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.btn-secondary {
  background: var(--bg-sunken);
  color: var(--text-secondary);
}

.btn-secondary:hover {
  background: var(--border);
  color: var(--text-primary);
}

.btn-primary {
  background: var(--accent-subtle);
  color: var(--accent);
}

.btn-primary:hover {
  background: var(--accent);
  color: var(--bg-elevated);
}

.btn-danger {
  background: var(--accent);
  color: var(--bg-elevated);
}

.btn-danger:hover {
  opacity: 0.9;
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
