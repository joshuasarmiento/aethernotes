<template>
  <BubbleMenu
    v-if="editor"
    :editor="editor"
    :tippy-options="{ duration: 150 }"
    :should-show="shouldShowMenu"
    class="bubble-menu font-ui"
  >
    <!-- Text Type Toggles -->
    <button
      :class="['menu-btn', { 'is-active': editor.isActive('paragraph') }]"
      @click="formatBlock('paragraph')"
      title="Paragraph"
    >
      <span class="btn-text">P</span>
    </button>
    <button
      :class="['menu-btn', { 'is-active': editor.isActive('heading', { level: 1 }) }]"
      @click="formatBlock('h1')"
      title="Heading 1"
    >
      <span class="btn-text">H1</span>
    </button>
    <button
      :class="['menu-btn', { 'is-active': editor.isActive('heading', { level: 2 }) }]"
      @click="formatBlock('h2')"
      title="Heading 2"
    >
      <span class="btn-text">H2</span>
    </button>
    <button
      :class="['menu-btn', { 'is-active': editor.isActive('heading', { level: 3 }) }]"
      @click="formatBlock('h3')"
      title="Heading 3"
    >
      <span class="btn-text">H3</span>
    </button>

    <div class="menu-divider"></div>

    <!-- Bold -->
    <button
      :class="['menu-btn', { 'is-active': editor.isActive('bold') }]"
      @click="editor.chain().focus().toggleBold().run()"
      title="Bold (Cmd+B)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 12a4 4 0 0 0 0-8H6v8" />
        <path d="M15 20a4 4 0 0 0 0-8H6v8Z" />
      </svg>
    </button>

    <!-- Italic -->
    <button
      :class="['menu-btn', { 'is-active': editor.isActive('italic') }]"
      @click="editor.chain().focus().toggleItalic().run()"
      title="Italic (Cmd+I)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" x2="10" y1="4" y2="4" />
        <line x1="14" x2="5" y1="20" y2="20" />
        <line x1="15" x2="9" y1="4" y2="20" />
      </svg>
    </button>

    <!-- Strikethrough -->
    <button
      :class="['menu-btn', { 'is-active': editor.isActive('strike') }]"
      @click="editor.chain().focus().toggleStrike().run()"
      title="Strikethrough (Cmd+Shift+X)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 4H9a3 3 0 0 0-2.83 4 4 4 0 0 0 3.71 3h7.24a4 4 0 0 1 3.71 3 3 3 0 0 1-2.83 4H7" />
        <line x1="4" x2="20" y1="12" y2="12" />
      </svg>
    </button>

    <!-- Inline Code -->
    <button
      :class="['menu-btn', { 'is-active': editor.isActive('code') }]"
      @click="editor.chain().focus().toggleCode().run()"
      title="Inline Code (Cmd+E)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    </button>

    <!-- Highlight -->
    <button
      :class="['menu-btn', { 'is-active': editor.isActive('highlight') }]"
      @click="editor.chain().focus().toggleHighlight().run()"
      title="Highlight (Cmd+Shift+H)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="m12 3-1.912 5.886a2 2 0 0 1-1.236 1.236L3 12l5.886 1.912a2 2 0 0 1 1.236 1.236L12 21l1.912-5.886a2 2 0 0 1 1.236-1.236L21 12l-5.886-1.912a2 2 0 0 1-1.236-1.236Z" />
      </svg>
    </button>

    <!-- Link Toggle -->
    <button
      :class="['menu-btn', { 'is-active': editor.isActive('link') }]"
      @click="toggleLink"
      title="Add Link"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    </button>
  </BubbleMenu>
</template>

<script setup lang="ts">
import { type Editor } from '@tiptap/vue-3';
import { BubbleMenu } from '@tiptap/vue-3/menus';

const props = defineProps<{
  editor: Editor | null | undefined;
}>();

const shouldShowMenu = ({ state }: { state: any }) => {
  const { selection } = state;
  const { empty, $from } = selection;

  // 1. If text is highlighted, show bubble menu
  if (!empty) {
    return true;
  }

  // 2. If selection is empty, show bubble menu only if text immediately before cursor ends with '/'
  // and we are NOT on the first block (first child of the document)
  const isFirstBlock = $from.depth >= 1 && $from.start(1) === 1;
  if (isFirstBlock) {
    return false;
  }

  const currentBlockText = $from.parent.textContent;
  const cursorPosInBlock = $from.parentOffset;
  const textBeforeCursor = currentBlockText.slice(0, cursorPosInBlock);

  return textBeforeCursor.endsWith('/');
};

function formatBlock(type: 'paragraph' | 'h1' | 'h2' | 'h3') {
  if (!props.editor) return;

  const { selection } = props.editor.state;
  const { $from } = selection;
  const currentBlockText = $from.parent.textContent;
  const cursorPosInBlock = $from.parentOffset;
  const textBeforeCursor = currentBlockText.slice(0, cursorPosInBlock);

  let chain = props.editor.chain().focus();

  // If the text before cursor ends with '/', delete the '/' character
  if (textBeforeCursor.endsWith('/')) {
    const pos = selection.from;
    chain = chain.deleteRange({ from: pos - 1, to: pos });
  }

  if (type === 'paragraph') {
    chain.setParagraph().run();
  } else if (type === 'h1') {
    chain.toggleHeading({ level: 1 }).run();
  } else if (type === 'h2') {
    chain.toggleHeading({ level: 2 }).run();
  } else if (type === 'h3') {
    chain.toggleHeading({ level: 3 }).run();
  }
}

function toggleLink() {
  if (!props.editor) return;

  if (props.editor.isActive('link')) {
    props.editor.chain().focus().unsetLink().run();
    return;
  }

  const previousUrl = props.editor.getAttributes('link').href;
  const url = window.prompt('Enter URL:', previousUrl);

  if (url === null) return;

  if (url === '') {
    props.editor.chain().focus().unsetLink().run();
    return;
  }

  props.editor.chain().focus().setLink({ href: url }).run();
}
</script>

<style scoped>
.bubble-menu {
  display: flex;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  padding: 3px;
  gap: 2px;
}

.menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.menu-btn:hover {
  background: var(--bg-sunken);
  color: var(--text-primary);
}

.menu-btn.is-active {
  background: var(--accent-subtle);
  color: var(--accent);
}

.btn-text {
  font-size: 10px;
  font-weight: 700;
}

.menu-divider {
  width: 1px;
  height: 16px;
  background: var(--border);
  align-self: center;
  margin: 0 4px;
}
</style>
