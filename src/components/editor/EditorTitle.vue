<template>
  <div class="title-container">
    <textarea
      ref="textareaRef"
      class="title-input font-display"
      :value="modelValue"
      @input="handleInput"
      placeholder="Untitled Note"
      @keydown.enter.prevent="emit('enter')"
      :disabled="disabled"
      rows="1"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';

const props = defineProps<{
  modelValue: string;
  disabled?: boolean;
}>();

const emit = defineEmits(['update:modelValue', 'enter']);

const textareaRef = ref<HTMLTextAreaElement | null>(null);

function adjustHeight() {
  const el = textareaRef.value;
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
}

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
  adjustHeight();
}

watch(() => props.modelValue, () => {
  nextTick(adjustHeight);
});

onMounted(() => {
  adjustHeight();
});
</script>

<style scoped>
.title-container {
  padding: var(--space-xl) var(--space-lg) var(--space-sm);
  max-width: var(--editor-max-width);
  margin: 0 auto;
}

.title-input {
  width: 100%;
  font-size: 32px;
  font-weight: 400;
  line-height: 1.3;
  color: var(--text-primary);
  border: none;
  background: transparent;
  padding: 0;
  outline: none;
  resize: none;
  overflow: hidden;
  display: block;
  font-family: inherit;
}

.title-input::placeholder {
  color: var(--text-muted);
  opacity: 0.6;
}

.title-input:disabled {
  color: var(--text-secondary);
  cursor: not-allowed;
}
</style>
