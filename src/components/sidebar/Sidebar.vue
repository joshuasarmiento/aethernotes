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

      <!-- Folder tree list -->
      <FolderTree />

      <!-- Extracted tags list -->
      <TagList />
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
import SidebarAction from './SidebarAction.vue';
import FolderTree from './FolderTree.vue';
import TagList from './TagList.vue';

const route = useRoute();
const router = useRouter();
const uiStore = useUiStore();
const notesStore = useNotesStore();
const foldersStore = useFoldersStore();

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
