<template>
  <div class="folder-tree">
    <!-- Folder List Header -->
    <div class="tree-header font-ui">
      <span>Folders</span>
    </div>

    <!-- Root Level Folders -->
    <div
      class="root-drop-zone font-ui"
      @dragover.prevent
      @drop="onDropRoot($event)"
    >
      <FolderItem
        v-for="folder in foldersStore.folderTree"
        :key="folder.id"
        :folder="folder"
        :depth="0"
        @contextmenu="handleFolderContextMenu"
      />
      
      <div v-if="foldersStore.folders.length === 0" class="empty-folders font-ui">
        No folders. Click + to add.
      </div>
    </div>

    <!-- Context Menu -->
    <ContextMenu
      :show="showMenu"
      :x="menuX"
      :y="menuY"
      @close="showMenu = false"
    >
      <button class="context-menu-item" @click="openCreateSubfolder">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
          <path d="M12 10v6" />
          <path d="M9 13h6" />
        </svg>
        New Subfolder
      </button>
      
      <button class="context-menu-item" @click="openRename">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
        </svg>
        Rename
      </button>

      <!-- Color Pickers inside Context Menu -->
      <div class="context-menu-divider"></div>
      <div class="color-options-title font-ui">Label Color</div>
      <div class="color-picker-grid">
        <button
          v-for="color in labelColors"
          :key="color.name"
          class="color-dot"
          :style="{ backgroundColor: color.hex || 'var(--text-secondary)' }"
          :title="color.name"
          @click="selectFolderColor(color.hex)"
        ></button>
      </div>

      <div class="context-menu-divider"></div>
      
      <button class="context-menu-item danger" @click="confirmDelete">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
        Delete Folder
      </button>
    </ContextMenu>

    <!-- Dialogs -->
    <Teleport to="body">
      <!-- Create/Rename Dialog Modal -->
      <Transition name="fade">
        <div v-if="activeDialog" class="modal-overlay" @click="activeDialog = null">
          <div class="modal-card animate-slide-down" @click.stop>
            <h3 class="modal-title font-display">
              {{ activeDialog === 'rename' ? 'Rename Folder' : 'New Subfolder' }}
            </h3>
            
            <input
              ref="dialogInput"
              v-model="dialogText"
              type="text"
              class="modal-input font-ui"
              placeholder="Folder name"
              @keydown.enter="handleDialogSubmit"
            />
            
            <div class="modal-actions font-ui">
              <button class="modal-btn cancel" @click="activeDialog = null">Cancel</button>
              <button class="modal-btn submit" @click="handleDialogSubmit">Save</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Deletion Confirmation Dialog -->
    <ConfirmDialog
      :show="showDeleteConfirm"
      title="Delete Folder"
      message="Are you sure you want to delete this folder and all subfolders? Notes will be moved to Uncategorized."
      confirm-text="Delete"
      is-danger
      @confirm="handleFolderDelete"
      @cancel="showDeleteConfirm = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useFoldersStore } from '@/stores/folders';
import FolderItem from '@/components/sidebar/FolderItem.vue';
import ContextMenu from '@/components/shared/ContextMenu.vue';
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue';
import type { Folder } from '@/types';

const foldersStore = useFoldersStore();

const showMenu = ref(false);
const menuX = ref(0);
const menuY = ref(0);
const selectedFolder = ref<Folder | null>(null);

const activeDialog = ref<'rename' | 'createSub' | null>(null);
const dialogText = ref('');
const dialogInput = ref<HTMLInputElement | null>(null);

const showDeleteConfirm = ref(false);

const labelColors = [
  { name: 'Default', hex: null },
  { name: 'Grey', hex: 'var(--notion-grey)' },
  { name: 'Brown', hex: 'var(--notion-brown)' },
  { name: 'Orange', hex: 'var(--notion-orange)' },
  { name: 'Yellow', hex: 'var(--notion-yellow)' },
  { name: 'Green', hex: 'var(--notion-green)' },
  { name: 'Blue', hex: 'var(--notion-blue)' },
  { name: 'Purple', hex: 'var(--notion-purple)' },
  { name: 'Pink', hex: 'var(--notion-pink)' },
  { name: 'Red', hex: 'var(--notion-red)' }
];

function handleFolderContextMenu(payload: { event: MouseEvent; folder: Folder }) {
  selectedFolder.value = payload.folder;
  menuX.value = payload.event.clientX;
  menuY.value = payload.event.clientY;
  showMenu.value = true;
}

function openCreateSubfolder() {
  showMenu.value = false;
  dialogText.value = '';
  activeDialog.value = 'createSub';
  nextTick(() => dialogInput.value?.focus());
}

function openRename() {
  showMenu.value = false;
  if (selectedFolder.value) {
    dialogText.value = selectedFolder.value.name;
    activeDialog.value = 'rename';
    nextTick(() => dialogInput.value?.focus());
  }
}

async function handleDialogSubmit() {
  const name = dialogText.value.trim();
  if (!name || !selectedFolder.value) return;

  if (activeDialog.value === 'rename') {
    await foldersStore.updateFolder(selectedFolder.value.id, { name });
  } else if (activeDialog.value === 'createSub') {
    await foldersStore.createFolder(name, selectedFolder.value.id);
  }

  activeDialog.value = null;
}

async function selectFolderColor(color: string | null) {
  showMenu.value = false;
  if (selectedFolder.value) {
    await foldersStore.updateFolder(selectedFolder.value.id, { color });
  }
}

function confirmDelete() {
  showMenu.value = false;
  showDeleteConfirm.value = true;
}

async function handleFolderDelete() {
  showDeleteConfirm.value = false;
  if (selectedFolder.value) {
    await foldersStore.deleteFolder(selectedFolder.value.id);
    selectedFolder.value = null;
  }
}

// Drag & drop reparenting to Root level
async function onDropRoot(event: DragEvent) {
  if (!event.dataTransfer) return;
  const folderId = event.dataTransfer.getData('text/plain');
  if (folderId) {
    const dragged = foldersStore.folders.find(f => f.id === folderId);
    if (dragged && dragged.parentId !== null) {
      await foldersStore.updateFolder(folderId, { parentId: null });
    }
  }
}
</script>

<style scoped>
.folder-tree {
  display: flex;
  flex-direction: column;
  padding-bottom: var(--space-md);
}

.tree-header {
  font-size: 11px;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: var(--space-md) var(--space-md) var(--space-xs);
  font-weight: 500;
  letter-spacing: 0.5px;
}

.root-drop-zone {
  min-height: 40px;
}

.empty-folders {
  font-size: 11px;
  color: var(--text-muted);
  padding: var(--space-sm) var(--space-md);
}

.color-options-title {
  font-size: 10px;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 6px var(--space-md) var(--space-xs);
  letter-spacing: 0.5px;
}

.color-picker-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-md) var(--space-sm);
}

.color-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid var(--border);
  cursor: pointer;
  transition: transform var(--duration-fast) var(--ease-out);
}

.color-dot:hover {
  transform: scale(1.2);
}

/* Modal Styling */
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
