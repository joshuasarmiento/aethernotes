<template>
  <div class="font-selector font-ui">
    <!-- Font Family Selector -->
    <div class="setting-group">
      <div class="setting-header">
        <label class="setting-label">Font Family</label>
        <span class="setting-desc">Choose typography style for note reading.</span>
      </div>
      
      <div class="font-family-grid">
        <button
          v-for="f in fontOptions"
          :key="f.value"
          :class="['font-card', { 'active': settingsStore.fontFamily === f.value }]"
          @click="settingsStore.setSetting('fontFamily', f.value)"
        >
          <span :class="['font-preview', f.previewClass]">Aa</span>
          <span class="font-card-label">{{ f.label }}</span>
        </button>
      </div>
    </div>

    <!-- Font Size Slider -->
    <div class="setting-group">
      <div class="setting-header">
        <div class="size-header-row">
          <label class="setting-label">Font Size</label>
          <span class="size-value">{{ settingsStore.fontSize }}px</span>
        </div>
        <span class="setting-desc">Adjust note body size (14px – 24px).</span>
      </div>
      
      <div class="slider-container">
        <span class="slider-hint small">A</span>
        <input
          type="range"
          min="14"
          max="24"
          step="1"
          :value="settingsStore.fontSize"
          @input="onSizeChange"
          class="size-slider"
        />
        <span class="slider-hint large">A</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';

const settingsStore = useSettingsStore();

const fontOptions = [
  { label: 'Sans-Serif', value: 'sans' as const, previewClass: 'sans-font' },
  { label: 'Editorial Serif', value: 'serif' as const, previewClass: 'serif-font' },
  { label: 'Monospace', value: 'mono' as const, previewClass: 'mono-font' }
];

function onSizeChange(event: Event) {
  const target = event.target as HTMLInputElement;
  settingsStore.setSetting('fontSize', Number(target.value));
}
</script>

<style scoped>
.font-selector {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.setting-header {
  display: flex;
  flex-direction: column;
}

.setting-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.setting-desc {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 2px;
}

.font-family-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-sm);
}

.font-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 72px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-elevated);
  cursor: pointer;
  color: var(--text-secondary);
  transition: all var(--duration-fast) var(--ease-out);
}

.font-card:hover {
  border-color: var(--text-muted);
  color: var(--text-primary);
  background: var(--bg-sunken);
}

.font-card.active {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-subtle);
}

.font-preview {
  font-size: 18px;
  margin-bottom: var(--space-xs);
}

.sans-font {
  font-family: system-ui, sans-serif;
}

.serif-font {
  font-family: 'Source Serif 4', Georgia, serif;
}

.mono-font {
  font-family: 'JetBrains Mono', monospace;
}

.font-card-label {
  font-size: 11px;
}

/* Slider */
.size-header-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.size-value {
  font-size: 11px;
  font-weight: 500;
  color: var(--accent);
  background: var(--accent-subtle);
  padding: 1px 6px;
  border-radius: 4px;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  height: 32px;
}

.slider-hint {
  color: var(--text-muted);
  font-weight: 500;
  user-select: none;
}

.slider-hint.small {
  font-size: 12px;
}

.slider-hint.large {
  font-size: 18px;
}

.size-slider {
  flex: 1;
  appearance: none;
  height: 4px;
  border-radius: 2px;
  background: var(--border);
  outline: none;
}

.size-slider::-webkit-slider-thumb {
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
  transition: transform var(--duration-fast) var(--ease-out);
}

.size-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
</style>
