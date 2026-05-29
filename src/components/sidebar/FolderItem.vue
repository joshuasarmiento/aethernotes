<template>
  <div class="folder-node">
    <div
      class="folder-row font-ui"
      :class="{
        'active': uiStore.activeFolderId === folder.id,
        'drag-over': isDragOver
      }"
      :style="{ paddingLeft: `${depth * 12 + 12}px` }"
      draggable="true"
      @dragstart="onDragStart($event, folder.id)"
      @dragover.prevent="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop($event, folder.id)"
      @click="selectFolder"
      @contextmenu.prevent="onContextMenu($event)"
    >
      <span
        :class="['chevron', { 'open': isOpen, 'invisible': !folder.children.length }]"
        @click.stop="toggleOpen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </span>
      
      <span class="folder-icon" :style="{ color: folder.color || 'var(--text-secondary)' }">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
        </svg>
      </span>
      
      <span class="folder-name">{{ folder.name }}</span>
    </div>

    <!-- Children Nodes recursively -->
    <div v-if="isOpen && folder.children.length" class="folder-children">
      <FolderItem
        v-for="child in folder.children"
        :key="child.id"
        :folder="child"
        :depth="depth + 1"
        @contextmenu="emitContextMenu"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUiStore } from '@/stores/ui';
import { useFoldersStore, type FolderNode } from '@/stores/folders';
import type { Folder } from '@/types';

const props = defineProps<{
  folder: FolderNode;
  depth: number;
}>();

const emit = defineEmits(['contextmenu']);

const uiStore = useUiStore();
const foldersStore = useFoldersStore();

const isOpen = ref(true);
const isDragOver = ref(false);

function toggleOpen() {
  isOpen.value = !isOpen.value;
}

function selectFolder() {
  uiStore.selectFolder(props.folder.id);
}

function onContextMenu(event: MouseEvent) {
  emit('contextmenu', { event, folder: props.folder });
}

function emitContextMenu(payload: { event: MouseEvent; folder: Folder }) {
  emit('contextmenu', payload);
}

// Drag & Drop
function onDragStart(event: DragEvent, folderId: string) {
  if (event.dataTransfer) {
    event.dataTransfer.setData('text/plain', folderId);
    event.dataTransfer.effectAllowed = 'move';
  }
}

function onDragOver() {
  isDragOver.value = true;
}

function onDragLeave() {
  isDragOver.value = false;
}

async function onDrop(event: DragEvent, targetId: string) {
  isDragOver.value = false;
  if (!event.dataTransfer) return;

  const draggedId = event.dataTransfer.getData('text/plain');
  if (draggedId && draggedId !== targetId) {
    // Avoid cyclic parenting
    const isDescendant = (parent: FolderNode, childId: string): boolean => {
      if (parent.id === childId) return true;
      return parent.children.some(c => isDescendant(c, childId));
    };

    const draggedNode = foldersStore.folders.find(f => f.id === draggedId);
    
    if (draggedNode && targetId !== draggedNode.id) {
      // Check if target is descendant of dragged node
      const draggedTreeNode = findNodeInTree(foldersStore.folderTree, draggedId);
      if (draggedTreeNode && isDescendant(draggedTreeNode, targetId)) {
        // Can't drag a parent into its own child
        return;
      }
      
      // Update parent folder reference
      await foldersStore.updateFolder(draggedId, { parentId: targetId });
    }
  }
}

function findNodeInTree(nodes: FolderNode[], id: string): FolderNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    const found = findNodeInTree(node.children, id);
    if (found) return found;
  }
  return null;
}
</script>

<style scoped>
.folder-row {
  display: flex;
  align-items: center;
  height: 30px;
  gap: var(--space-xs);
  cursor: pointer;
  border-radius: var(--radius);
  margin: 1px var(--space-sm);
  color: var(--text-secondary);
  transition: background var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out);
  user-select: none;
}

.folder-row:hover {
  background: var(--sidebar-hover);
  color: var(--text-primary);
}

.folder-row.active {
  background: var(--accent-subtle);
  color: var(--accent);
  font-weight: 500;
}

.folder-row.drag-over {
  background: var(--border-subtle);
  outline: 1.5px dashed var(--accent);
}

.chevron {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  color: var(--text-muted);
  transition: transform var(--duration-fast) var(--ease-out);
}

.chevron.open {
  transform: rotate(90deg);
}

.chevron.invisible {
  opacity: 0;
  pointer-events: none;
}

.folder-icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.folder-name {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
