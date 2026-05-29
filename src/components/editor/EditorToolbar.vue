<template>
  <BubbleMenu
    v-if="editor"
    :editor="editor"
    :tippy-options="{ duration: 150, interactive: true, placement: 'top' }"
    :should-show="shouldShowMenu"
    class="bubble-menu-wrapper font-ui"
  >
    <!-- Link Input Popover (Above the toolbar) -->
    <div v-show="showLinkInput" class="link-popover">
      <input
        ref="linkInputRef"
        v-model="linkUrl"
        type="text"
        placeholder="Paste or type link..."
        class="link-input"
        @keydown.enter="submitLink"
        @keydown.esc="cancelLink"
        @keydown.stop
        @keypress.stop
        @keyup.stop
        @paste.stop
        @copy.stop
        @cut.stop
        @beforeinput.stop
      />
      <button type="button" class="link-submit-btn" @click.prevent.stop="submitLink" title="Confirm Link">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </button>
      <button type="button" class="link-cancel-btn" @click.prevent.stop="cancelLink" title="Cancel">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" x2="6" y1="6" y2="18" />
          <line x1="6" x2="18" y1="6" y2="18" />
        </svg>
      </button>
    </div>

    <!-- Main Formatting Toolbar -->
    <div class="bubble-menu">
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
        type="button"
        :class="['menu-btn', { 'is-active': editor.isActive('link') || showLinkInput }]"
        @mousedown.prevent.stop="toggleLink"
        title="Add Link"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>
    </div>
  </BubbleMenu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type Editor } from '@tiptap/vue-3';
import { BubbleMenu } from '@tiptap/vue-3/menus';

const props = defineProps<{
  editor: Editor | null | undefined;
}>();

const showLinkInput = ref(false);
const linkUrl = ref('');
const linkInputRef = ref<HTMLInputElement | null>(null);
const savedRange = ref<{ from: number; to: number } | null>(null);

const shouldShowMenu = ({ state, editor }: { state: any; editor: any }) => {
  if (!editor) return false;

  const { selection } = state;
  const { empty, $from } = selection;

  // If the link input is open, keep the bubble menu visible UNLESS the user clicked away
  if (showLinkInput.value) {
    if (savedRange.value) {
      const { from, to } = selection;
      // If the selection has changed from when we opened the link input, the user clicked somewhere else
      if (from !== savedRange.value.from || to !== savedRange.value.to) {
        showLinkInput.value = false;
        editor.view.dom.classList.remove('hide-selection');
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  const show = (() => {
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
  })();

  if (!show) {
    showLinkInput.value = false;
  }
  return show;
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

  if (showLinkInput.value) {
    showLinkInput.value = false;
    props.editor.view.dom.classList.remove('hide-selection');
    return;
  }

  // Save the current selection range before editor blurs
  const { selection } = props.editor.state;
  savedRange.value = { from: selection.from, to: selection.to };

  const previousUrl = props.editor.getAttributes('link').href || '';
  linkUrl.value = previousUrl;
  showLinkInput.value = true;
  props.editor.view.dom.classList.add('hide-selection');
  
  setTimeout(() => {
    if (linkInputRef.value) {
      linkInputRef.value.focus();
      linkInputRef.value.select();
    }
  }, 10);
}

function submitLink() {
  if (!props.editor) return;

  const trimmedUrl = linkUrl.value.trim();
  let chain = props.editor.chain().focus();

  // Restore selection range
  if (savedRange.value) {
    chain = chain.setTextSelection(savedRange.value);
  }

  if (trimmedUrl === '') {
    chain.unsetLink().run();
  } else {
    // Auto-add https:// if not present and doesn't look like mailto or absolute URL
    const urlPattern = /^(http:\/\/|https:\/\/|mailto:)/;
    const finalUrl = urlPattern.test(trimmedUrl) ? trimmedUrl : `https://${trimmedUrl}`;
    chain.setLink({ href: finalUrl }).run();
  }

  showLinkInput.value = false;
  props.editor.view.dom.classList.remove('hide-selection');
  linkUrl.value = '';
  savedRange.value = null;
}

function cancelLink() {
  showLinkInput.value = false;
  if (props.editor) {
    props.editor.view.dom.classList.remove('hide-selection');
  }
  linkUrl.value = '';
  
  if (props.editor && savedRange.value) {
    props.editor.chain().focus().setTextSelection(savedRange.value).run();
  }
  savedRange.value = null;
}
</script>

<style scoped>
.bubble-menu-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.link-popover {
  display: flex;
  align-items: center;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  padding: 4px;
  gap: 4px;
}

.bubble-menu {
  display: flex;
  align-items: center;
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

.link-input {
  background: transparent;
  border: none;
  outline: none;
  font-size: 11px;
  color: var(--text-primary);
  padding: 0 8px;
  width: 180px;
  height: 24px;
}

.link-input::placeholder {
  color: var(--text-secondary);
  opacity: 0.7;
}

.link-submit-btn,
.link-cancel-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  color: var(--text-secondary);
  cursor: pointer;
  background: transparent;
  border: none;
  transition: all var(--duration-fast) var(--ease-out);
}

.link-submit-btn:hover {
  background: var(--bg-sunken);
  color: var(--notion-green);
}

.link-cancel-btn:hover {
  background: var(--bg-sunken);
  color: var(--notion-red);
}
</style>
