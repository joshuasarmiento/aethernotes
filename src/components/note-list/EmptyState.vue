<template>
  <div class="empty-state">
    <div class="empty-icon">
      <slot name="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" x2="16" y1="13" y2="13" />
          <line x1="8" x2="16" y1="17" y2="17" />
          <line x1="8" x2="10" y1="9" y2="9" />
        </svg>
      </slot>
    </div>
    
    <h3 class="empty-title font-display">{{ title }}</h3>
    <p class="empty-message font-body">{{ message }}</p>
    
    <div class="empty-action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  message: string;
}>();
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-2xl) var(--space-lg);
  text-align: center;
  height: 100%;
  color: var(--text-secondary);
  user-select: none;
}

.empty-icon {
  color: var(--text-muted);
  margin-bottom: var(--space-md);
  display: inline-flex;
}

.empty-title {
  font-size: 20px;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
}

.empty-message {
  font-size: 13px;
  color: var(--text-secondary);
  max-width: 240px;
  line-height: 1.6;
  margin-bottom: var(--space-lg);
}

.empty-action {
  display: flex;
  justify-content: center;
}
</style>
