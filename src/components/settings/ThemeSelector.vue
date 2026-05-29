<template>
  <div class="theme-grid font-ui">
    <button
      v-for="opt in themeOptions"
      :key="opt.value"
      :class="['theme-card', { 'active': settingsStore.theme === opt.value }]"
      @click="settingsStore.setSetting('theme', opt.value)"
    >
      <span class="theme-icon">
        <component :is="opt.icon" />
      </span>
      <span class="theme-label">{{ opt.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { markRaw } from 'vue';
import { useSettingsStore } from '@/stores/settings';

const settingsStore = useSettingsStore();

const IconSun = markRaw({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  `
});

const IconMoon = markRaw({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
  `
});

const IconSystem = markRaw({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>
    </svg>
  `
});

const themeOptions = [
  { label: 'Light', value: 'light' as const, icon: IconSun },
  { label: 'Dark', value: 'dark' as const, icon: IconMoon },
  { label: 'System', value: 'system' as const, icon: IconSystem }
];
</script>

<style scoped>
.theme-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-sm);
  margin-top: var(--space-xs);
}

.theme-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 64px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-elevated);
  cursor: pointer;
  color: var(--text-secondary);
  transition: all var(--duration-fast) var(--ease-out);
}

.theme-card:hover {
  border-color: var(--text-muted);
  color: var(--text-primary);
  background: var(--bg-sunken);
}

.theme-card.active {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-subtle);
}

.theme-icon {
  margin-bottom: var(--space-xs);
  display: inline-flex;
}

.theme-label {
  font-size: 11px;
}
</style>
