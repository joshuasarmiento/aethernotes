<template>
  <div class="note-list-panel">
    <!-- List Toolbar -->
    <NoteListToolbar
      v-model:sort-by="sortBy"
      :is-trash="isTrash"
      @empty-trash="confirmEmptyTrash"
    />

    <!-- Scrollable Note Cards -->
    <div class="notes-scroll-container">
      <div v-if="sortedNotes.length > 0" class="notes-items-grid">
        <NoteListItem
          v-for="note in sortedNotes"
          :key="note.id"
          :note="note"
          :active="route.params.id === note.id"
          @select="selectNote(note.id)"
          @contextmenu="handleNoteContextMenu"
        />
      </div>
      
      <!-- Empty States -->
      <EmptyState
        v-else
        :title="emptyStateTitle"
        :message="emptyStateMessage"
      />
    </div>

    <!-- Right-click Context Menu -->
    <ContextMenu
      :show="showMenu"
      :x="menuX"
      :y="menuY"
      @close="showMenu = false"
    >
      <template v-if="!isTrash">
        <button class="context-menu-item" @click="togglePin">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" x2="12" y1="17" y2="22" />
            <path d="M5 17h14v-1.76a2 2 0 0 0-.44-1.24l-2.78-3.5A2 2 0 0 1 15 9.26V5a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4.26a2 2 0 0 1-.78 1.24l-2.78 3.5a2 2 0 0 0-.44 1.24Z" />
          </svg>
          {{ selectedNote?.isPinned ? 'Unpin Note' : 'Pin Note' }}
        </button>
        
        <button class="context-menu-item" @click="toggleFavorite">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          {{ selectedNote?.isFavorite ? 'Unfavorite' : 'Favorite' }}
        </button>
        
        <div class="context-menu-divider"></div>

        <button class="context-menu-item" @click="copyPageContent">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy Page Content
        </button>

        <button class="context-menu-item" @click="exportAsMarkdown">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export (Markdown Format)
        </button>
        
        <div class="context-menu-divider"></div>
        
        <button class="context-menu-item danger" @click="trashNote">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
          Move to Trash
        </button>
      </template>

      <template v-else>
        <button class="context-menu-item" @click="restoreNote">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M3 21v-5h5" />
          </svg>
          Restore Note
        </button>
        
        <div class="context-menu-divider"></div>
        
        <button class="context-menu-item danger" @click="confirmDeletePermanent">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
          Delete Permanently
        </button>
      </template>
    </ContextMenu>

    <!-- Dialogs -->
    <ConfirmDialog
      :show="showEmptyTrashConfirm"
      title="Empty Trash"
      message="Are you sure you want to empty the trash? All notes in the trash will be permanently deleted. This action cannot be undone."
      confirm-text="Empty"
      is-danger
      @confirm="handleEmptyTrash"
      @cancel="showEmptyTrashConfirm = false"
    />

    <ConfirmDialog
      :show="showDeleteConfirm"
      title="Delete Note"
      message="Are you sure you want to permanently delete this note? This action cannot be undone."
      confirm-text="Delete"
      is-danger
      @confirm="handleDeletePermanent"
      @cancel="showDeleteConfirm = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNotesStore } from '@/stores/notes';
import { useUiStore } from '@/stores/ui';
import { useSettingsStore } from '@/stores/settings';
import NoteListToolbar from './NoteListToolbar.vue';
import NoteListItem from './NoteListItem.vue';
import EmptyState from './EmptyState.vue';
import ContextMenu from '@/components/shared/ContextMenu.vue';
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
import type { Note } from '@/types';

const route = useRoute();
const router = useRouter();
const notesStore = useNotesStore();
const uiStore = useUiStore();
const settingsStore = useSettingsStore();

const sortBy = ref<'updated' | 'title'>('updated');
const showMenu = ref(false);
const menuX = ref(0);
const menuY = ref(0);
const selectedNote = ref<Note | null>(null);

const showEmptyTrashConfirm = ref(false);
const showDeleteConfirm = ref(false);

const isTrash = computed(() => route.name === 'trash');

const filteredNotes = computed(() => {
  if (isTrash.value) {
    return notesStore.trashedNotes;
  }
  
  let list = notesStore.activeNotes;

  // Filter by tag
  if (uiStore.activeTag) {
    list = list.filter(n => n.tags.includes(uiStore.activeTag as string));
  }
  // Filter by folder
  else if (uiStore.activeFolderId) {
    list = list.filter(n => n.folder === uiStore.activeFolderId);
  }
  
  return list;
});

const sortedNotes = computed(() => {
  const list = [...filteredNotes.value];
  
  if (sortBy.value === 'updated') {
    // Sort pinned notes to the top first, then by date descending
    return list.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return b.updatedAt - a.updatedAt;
    });
  } else {
    // Sort pinned notes to the top first, then alphabetically by title
    return list.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return a.title.localeCompare(b.title);
    });
  }
});

const emptyStateTitle = computed(() => {
  if (isTrash.value) return 'Trash is empty';
  if (uiStore.activeTag) return 'No notes tagged';
  if (uiStore.activeFolderId) return 'Folder is empty';
  return 'No notes yet';
});

const emptyStateMessage = computed(() => {
  if (isTrash.value) return 'Notes deleted from your vault will show up here.';
  if (uiStore.activeTag) return `No notes match the tag @${uiStore.activeTag}.`;
  if (uiStore.activeFolderId) return 'Create a new note in this folder to get started.';
  return 'Create a note to start capturing your thoughts.';
});

function selectNote(noteId: string) {
  if (isTrash.value) {
    router.push(`/trash`); // Remain on trash view
  } else {
    router.push(`/note/${noteId}`);
  }
}

function handleNoteContextMenu(payload: { event: MouseEvent; note: Note }) {
  selectedNote.value = payload.note;
  menuX.value = payload.event.clientX;
  menuY.value = payload.event.clientY;
  showMenu.value = true;
}

// Menu Actions
async function togglePin() {
  showMenu.value = false;
  if (selectedNote.value) {
    await notesStore.updateNote(selectedNote.value.id, { isPinned: !selectedNote.value.isPinned });
  }
}

async function toggleFavorite() {
  showMenu.value = false;
  if (selectedNote.value) {
    await notesStore.updateNote(selectedNote.value.id, { isFavorite: !selectedNote.value.isFavorite });
  }
}

async function trashNote() {
  showMenu.value = false;
  if (selectedNote.value) {
    await notesStore.deleteNote(selectedNote.value.id);
    if (route.params.id === selectedNote.value.id) {
      router.push('/note');
    }
  }
}

async function restoreNote() {
  showMenu.value = false;
  if (selectedNote.value) {
    await notesStore.restoreNote(selectedNote.value.id);
  }
}

function confirmDeletePermanent() {
  showMenu.value = false;
  showDeleteConfirm.value = true;
}

async function handleDeletePermanent() {
  showDeleteConfirm.value = false;
  if (selectedNote.value) {
    await notesStore.permanentlyDeleteNote(selectedNote.value.id);
    selectedNote.value = null;
  }
}

function confirmEmptyTrash() {
  showEmptyTrashConfirm.value = true;
}

async function handleEmptyTrash() {
  await notesStore.emptyTrash();
}

async function copyPageContent() {
  showMenu.value = false;
  if (!selectedNote.value) return;

  const note = selectedNote.value;
  
  if (note.encryptedWith === 'vault' && !settingsStore.encryptionKey) {
    alert('This note is encrypted. Please unlock your vault to copy its content.');
    return;
  }

  try {
    await navigator.clipboard.writeText(note.content);
    alert('Note content copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy text:', err);
    alert('Failed to copy content to clipboard.');
  }
}

function exportAsMarkdown() {
  showMenu.value = false;
  if (!selectedNote.value) return;
  
  const note = selectedNote.value;
  
  if (note.encryptedWith === 'vault' && !settingsStore.encryptionKey) {
    alert('This note is encrypted. Please unlock your vault to export it.');
    return;
  }

  const content = note.content;
  const title = note.title || 'untitled';
  
  const filename = `${title.toLowerCase().replace(/[^a-z0-9_-]/g, '_')}.md`;
  
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
</script>

<style scoped>
.note-list-panel {
  display: flex;
  flex-direction: column;
  width: var(--note-list-width);
  border-right: 1px solid var(--border);
  height: 100%;
  background: var(--bg-elevated);
  flex-shrink: 0;
}

.notes-scroll-container {
  flex: 1;
  overflow-y: auto;
}

.notes-items-grid {
  display: flex;
  flex-direction: column;
}
</style>
