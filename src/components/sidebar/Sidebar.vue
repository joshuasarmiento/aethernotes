<template>
  <aside class="sidebar">
    <SidebarAction @new-note="handleNewNote" @new-folder="openNewFolderDialog" />
    
    <div class="sidebar-scrollable">
      <!-- Quick Navigation Filters -->
      <div class="quick-filters font-ui">
        <button
          :class="['filter-item', { 'active': isAllNotesActive }]"
          @click="selectAllNotes"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
          </svg>
          <span>All Notes</span>
        </button>
        
        <button
          :class="['filter-item', { 'active': route.name === 'trash' }]"
          @click="selectTrash"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
          <span>Trash</span>
        </button>
      </div>

      <!-- Favorites Section (collapsible list) -->
      <div v-if="notesStore.favoriteNotes.length > 0" class="sidebar-section">
        <div class="section-header font-ui">
          <span>Favorites</span>
        </div>
        <div class="favorites-list font-ui">
          <button
            v-for="note in notesStore.favoriteNotes"
            :key="note.id"
            :class="['fav-item', { 'active': route.params.id === note.id }]"
            @click="selectNote(note.id)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span class="fav-title">{{ note.title || 'Untitled Note' }}</span>
          </button>
        </div>
      </div>

      <!-- Folder tree list -->
      <FolderTree />

      <!-- Extracted tags list -->
      <TagList />
    </div>

    <!-- Sidebar Footer Workspace / Status Panel -->
    <div class="sidebar-footer font-ui">
      <div class="workspace-info" @click="router.push('/settings')">
        <div class="workspace-avatar">Æ</div>
        <div class="workspace-details">
          <span class="workspace-name">Aether Vault</span>
          <span class="vault-status">
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            {{ settingsStore.encryptionEnabled ? 'Encrypted' : 'Local-first' }}
          </span>
        </div>
      </div>
      <button class="settings-cog" @click="router.push('/settings')" title="Open Settings">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>
    </div>

    <!-- Create Folder Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showNewFolderModal" class="modal-overlay" @click="showNewFolderModal = false">
          <div class="modal-card animate-slide-down" @click.stop>
            <h3 class="modal-title font-display">New Folder</h3>
            <input
              ref="folderInput"
              v-model="newFolderName"
              type="text"
              class="modal-input font-ui"
              placeholder="Folder name"
              @keydown.enter="handleCreateFolder"
            />
            <div class="modal-actions font-ui">
              <button class="modal-btn cancel" @click="showNewFolderModal = false">Cancel</button>
              <button class="modal-btn submit" @click="handleCreateFolder">Create</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUiStore } from '@/stores/ui';
import { useNotesStore } from '@/stores/notes';
import { useFoldersStore } from '@/stores/folders';
import { useSettingsStore } from '@/stores/settings';
import SidebarAction from './SidebarAction.vue';
import FolderTree from './FolderTree.vue';
import TagList from './TagList.vue';

const route = useRoute();
const router = useRouter();
const uiStore = useUiStore();
const notesStore = useNotesStore();
const foldersStore = useFoldersStore();
const settingsStore = useSettingsStore();

const showNewFolderModal = ref(false);
const newFolderName = ref('');
const folderInput = ref<HTMLInputElement | null>(null);

const isAllNotesActive = computed(() => {
  return route.name !== 'trash' && route.name !== 'settings' && uiStore.activeFolderId === null && uiStore.activeTag === null;
});

async function handleNewNote() {
  const newNote = await notesStore.createNote(uiStore.activeFolderId);
  router.push(`/note/${newNote.id}`);
}

function openNewFolderDialog() {
  newFolderName.value = '';
  showNewFolderModal.value = true;
  nextTick(() => folderInput.value?.focus());
}

async function handleCreateFolder() {
  const name = newFolderName.value.trim();
  if (!name) return;
  
  await foldersStore.createFolder(name, null); // Root level folder
  showNewFolderModal.value = false;
}

function selectAllNotes() {
  uiStore.selectFolder(null);
  uiStore.selectTag(null);
  if (route.name !== 'note-empty' && route.name !== 'note-detail') {
    router.push('/note');
  }
}

function selectTrash() {
  uiStore.selectFolder(null);
  uiStore.selectTag(null);
  router.push('/trash');
}

function selectNote(noteId: string) {
  router.push(`/note/${noteId}`);
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: var(--sidebar-width);
  background: var(--sidebar-bg);
  border-right: 1px solid var(--border);
  height: 100%;
  flex-shrink: 0;
  user-select: none;
}

.sidebar-scrollable {
  flex: 1;
  overflow-y: auto;
  padding-bottom: var(--space-lg);
}

.quick-filters {
  display: flex;
  flex-direction: column;
  padding: var(--space-sm) var(--space-sm) 0;
  gap: 2px;
}

.filter-item {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 var(--space-sm);
  border-radius: var(--radius);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 12px;
  gap: var(--space-sm);
  transition: all var(--duration-fast) var(--ease-out);
  text-align: left;
}

.filter-item:hover {
  background: var(--sidebar-hover);
  color: var(--text-primary);
}

.filter-item.active {
  background: var(--accent-subtle);
  color: var(--accent);
  font-weight: 500;
}

/* Favorites Section Styling */
.sidebar-section {
  display: flex;
  flex-direction: column;
  margin-top: var(--space-md);
}

.section-header {
  font-size: 11px;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 0 var(--space-md) var(--space-xs);
  font-weight: 500;
  letter-spacing: 0.5px;
}

.favorites-list {
  display: flex;
  flex-direction: column;
  padding: 0 var(--space-sm);
  gap: 2px;
}

.fav-item {
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 var(--space-sm);
  border-radius: var(--radius);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 12px;
  gap: var(--space-sm);
  transition: all var(--duration-fast) var(--ease-out);
  text-align: left;
  background: transparent;
  border: none;
  width: 100%;
}

.fav-item:hover {
  background: var(--sidebar-hover);
  color: var(--text-primary);
}

.fav-item.active {
  background: var(--accent-subtle);
  color: var(--accent);
  font-weight: 500;
}

.fav-item svg {
  flex-shrink: 0;
  opacity: 0.7;
}

.fav-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Workspace Footer Styling */
.sidebar-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-md);
  border-top: 1px solid var(--border);
  background: var(--sidebar-bg);
  flex-shrink: 0;
}

.workspace-info {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  flex: 1;
  overflow: hidden;
}

.workspace-avatar {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: var(--text-primary);
  color: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
}

.workspace-details {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-align: left;
}

.workspace-name {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

.vault-status {
  font-size: 9px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 4px;
  line-height: 1.2;
  margin-top: 1px;
}

.vault-status svg {
  flex-shrink: 0;
  opacity: 0.8;
}

.settings-cog {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: var(--space-xs);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--duration-fast) var(--ease-out);
}

.settings-cog:hover {
  background: var(--sidebar-hover);
  color: var(--text-primary);
}

/* Modal overlays (standardized across modules) */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.modal-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--space-lg);
  width: 90%;
  max-width: 320px;
}

.modal-title {
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: var(--space-md);
}

.modal-input {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 8px var(--space-sm);
  background: var(--bg-sunken);
  color: var(--text-primary);
  font-size: 13px;
  margin-bottom: var(--space-lg);
}

.modal-input:focus {
  border-color: var(--accent);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
}

.modal-btn {
  padding: 6px 12px;
  border-radius: var(--radius);
  font-size: 12px;
  cursor: pointer;
}

.modal-btn.cancel {
  background: var(--bg-sunken);
  color: var(--text-secondary);
}

.modal-btn.cancel:hover {
  background: var(--border);
}

.modal-btn.submit {
  background: var(--accent-subtle);
  color: var(--accent);
  font-weight: 500;
}

.modal-btn.submit:hover {
  background: var(--accent);
  color: var(--bg-elevated);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--duration-base) var(--ease-out);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
