<template>
  <div class="settings-panel">
    <!-- Header -->
    <div class="settings-header">
      <h2 class="settings-title font-display">Settings</h2>
      <button class="close-btn font-ui" @click="closeSettings" title="Close Settings">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Scrollable content -->
    <div class="settings-scroll-container">
      <div class="settings-content">
        <!-- Theme Section -->
        <section class="settings-section">
          <h3 class="section-title font-display">Aesthetic</h3>
          <ThemeSelector />
        </section>

        <div class="divider"></div>

        <!-- Typography Section -->
        <section class="settings-section">
          <h3 class="section-title font-display">Typography</h3>
          <FontSelector />
        </section>

        <div class="divider"></div>

        <!-- Editor Config Section -->
        <section class="settings-section">
          <h3 class="section-title font-display">Editor Preferences</h3>
          <div class="preferences-list font-ui">
            <!-- Line Wrapping -->
            <label class="pref-item">
              <div class="pref-desc">
                <span class="pref-label">Line Wrapping</span>
                <span class="pref-sub">Wrap long lines to fit the reading pane.</span>
              </div>
              <input
                type="checkbox"
                class="pref-checkbox"
                :checked="settingsStore.lineWrapping"
                @change="togglePref('lineWrapping')"
              />
            </label>

            <!-- Spellcheck -->
            <label class="pref-item">
              <div class="pref-desc">
                <span class="pref-label">Spellcheck</span>
                <span class="pref-sub">Enable browser spellcheck inside the editor.</span>
              </div>
              <input
                type="checkbox"
                class="pref-checkbox"
                :checked="settingsStore.spellcheck"
                @change="togglePref('spellcheck')"
              />
            </label>

            <!-- Line Numbers -->
            <label class="pref-item">
              <div class="pref-desc">
                <span class="pref-label">Show Line Numbers</span>
                <span class="pref-sub">Display code-style line count in note editor.</span>
              </div>
              <input
                type="checkbox"
                class="pref-checkbox"
                :checked="settingsStore.showLineNumbers"
                @change="togglePref('showLineNumbers')"
              />
            </label>
          </div>
        </section>

        <div class="divider"></div>

        <!-- Security Section -->
        <section class="settings-section">
          <h3 class="section-title font-display">Security</h3>
          <EncryptionPanel />
        </section>

        <div class="divider"></div>

        <!-- Portability / Import Export Section -->
        <section class="settings-section">
          <h3 class="section-title font-display">Data Portability</h3>
          <div class="portability-panel font-ui">
            <div class="portability-group">
              <span class="port-label">Backup Vault</span>
              <span class="port-desc">Download all your notes and folder hierarchies as a JSON backup file.</span>
              <button class="port-btn export-btn" @click="exportVault">Export Vault (JSON)</button>
            </div>

            <div class="portability-group">
              <span class="port-label">Export Markdown (ZIP)</span>
              <span class="port-desc">Download all your active notes as plain text Markdown (.md) files in a ZIP archive.</span>
              <button class="port-btn export-btn" @click="exportMarkdownZip">Export All (ZIP)</button>
            </div>
            
            <div class="portability-group">
              <span class="port-label">Import Vault</span>
              <span class="port-desc">Restore folder hierarchies and notes from a previous JSON backup.</span>
              <label class="port-btn import-btn-label">
                Upload Backup
                <input type="file" accept=".json" class="file-input" @change="importVault" />
              </label>
            </div>

            <div class="portability-group">
              <span class="port-label">Import Markdown Files</span>
              <span class="port-desc">Import plain text Markdown (.md) documents as new notes.</span>
              <label class="port-btn import-btn-label">
                Select .md Files
                <input type="file" accept=".md" multiple class="file-input" @change="importMarkdown" />
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import JSZip from 'jszip';
import { useSettingsStore } from '@/stores/settings';
import { useNotesStore } from '@/stores/notes';
import { useFoldersStore } from '@/stores/folders';
import { db } from '@/lib/db';
import ThemeSelector from './ThemeSelector.vue';
import FontSelector from './FontSelector.vue';
import EncryptionPanel from './EncryptionPanel.vue';

const router = useRouter();
const settingsStore = useSettingsStore();
const notesStore = useNotesStore();
const foldersStore = useFoldersStore();

function closeSettings() {
  router.push('/note');
}

function togglePref(key: 'spellcheck' | 'lineWrapping' | 'showLineNumbers') {
  settingsStore.setSetting(key, !settingsStore[key]);
}

// Data Portability Actions

async function exportMarkdownZip() {
  try {
    const zip = new JSZip();
    const activeNotes = notesStore.notes.filter(n => !n.isTrashed);

    if (activeNotes.length === 0) {
      alert('No active notes to export.');
      return;
    }

    const usedPaths = new Set<string>();

    for (const note of activeNotes) {
      let folderPath = '';
      if (note.folder) {
        const folder = foldersStore.folders.find(f => f.id === note.folder);
        if (folder) {
          folderPath = folder.path;
        }
      }

      const sanitizedTitle = note.title.replace(/[\\/:*?"<>|]/g, '_') || 'Untitled Note';
      let relativePath = sanitizedTitle + '.md';
      if (folderPath) {
        relativePath = `${folderPath}/${relativePath}`;
      }

      // Handle duplicate paths inside ZIP
      let counter = 1;
      let finalPath = relativePath;
      while (usedPaths.has(finalPath.toLowerCase())) {
        const uniqueTitle = `${sanitizedTitle}_${counter}`;
        relativePath = uniqueTitle + '.md';
        if (folderPath) {
          finalPath = `${folderPath}/${relativePath}`;
        } else {
          finalPath = relativePath;
        }
        counter++;
      }

      usedPaths.add(finalPath.toLowerCase());
      zip.file(finalPath, note.content);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aether-notes-markdown-${new Date().toISOString().slice(0, 10)}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Failed to export markdown zip:', err);
    alert('Failed to export markdown zip.');
  }
}

async function exportVault() {
  try {
    const allNotes = await db.notes.toArray();
    const allFolders = await db.folders.toArray();

    const backup = {
      notes: allNotes,
      folders: allFolders,
      exportedAt: Date.now(),
      version: 1
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aether-vault-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Failed to export vault:', err);
    alert('Failed to export backup.');
  }
}

async function importVault(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;

  const file = target.files[0];
  const reader = new FileReader();

  reader.onload = async (e) => {
    try {
      const data = JSON.parse(e.target?.result as string);
      if (!data.notes || !data.folders) {
        alert('Invalid backup format.');
        return;
      }

      // Bulk put into Dexie
      for (const folder of data.folders) {
        await db.folders.put(folder);
      }
      for (const note of data.notes) {
        await db.notes.put(note);
      }

      // Reload state
      await foldersStore.loadFolders();
      await notesStore.loadNotes();
      
      alert('Vault backup imported successfully!');
      target.value = '';
    } catch (err) {
      console.error('Import failure:', err);
      alert('Error parsing JSON backup.');
    }
  };

  reader.readAsText(file);
}

async function importMarkdown(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;

  const files = Array.from(target.files);
  let importedCount = 0;

  for (const file of files) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
        
        // Use nanoid for note creation
        const { nanoid } = await import('@/lib/nanoid');
        const { extractTags } = await import('@/stores/notes');

        const newNote = {
          id: nanoid(),
          title: nameWithoutExt || 'Untitled Note',
          content: text || '',
          folder: null,
          tags: extractTags(text || ''),
          isPinned: false,
          isFavorite: false,
          isTrashed: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          encryptedWith: null
        };

        // Write directly to Dexie
        await db.notes.put(newNote);
        importedCount++;

        // Reload notes on final file
        if (importedCount === files.length) {
          await notesStore.loadNotes();
          alert(`Successfully imported ${importedCount} Markdown notes.`);
          target.value = '';
        }
      } catch (err) {
        console.error('Markdown import failure:', err);
      }
    };
    reader.readAsText(file);
  }
}
</script>

<style scoped>
.settings-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  background: var(--bg);
  overflow: hidden;
}

.settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 58px;
  padding: 0 var(--space-lg);
  border-bottom: 1px solid var(--border-subtle);
  max-width: var(--editor-max-width);
  width: 100%;
  margin: 0 auto;
  flex-shrink: 0;
}

.settings-title {
  font-size: 24px;
  font-weight: 400;
  color: var(--text-primary);
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.close-btn:hover {
  background: var(--bg-sunken);
  color: var(--text-primary);
}

.settings-scroll-container {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-md) var(--space-lg) var(--space-2xl);
}

.settings-content {
  max-width: var(--editor-max-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.section-title {
  font-size: 18px;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
}

.divider {
  height: 1px;
  background: var(--border-subtle);
}

/* Preferences toggle checkboxes */
.preferences-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.pref-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.pref-desc {
  display: flex;
  flex-direction: column;
}

.pref-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.pref-sub {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 2px;
}

.pref-checkbox {
  appearance: none;
  width: 36px;
  height: 20px;
  background: var(--border);
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease-out);
}

.pref-checkbox::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--bg-elevated);
  transition: transform var(--duration-fast) var(--ease-out);
  box-shadow: var(--shadow-sm);
}

.pref-checkbox:checked {
  background: var(--accent);
}

.pref-checkbox:checked::before {
  transform: translateX(16px);
}

/* Portability Section */
.portability-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.portability-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.port-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.port-desc {
  font-size: 11px;
  color: var(--text-muted);
  margin-bottom: var(--space-xs);
}

.port-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 var(--space-md);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.port-btn:hover {
  background: var(--bg-sunken);
  color: var(--text-primary);
  border-color: var(--text-muted);
}

.import-btn-label {
  position: relative;
}

.file-input {
  position: absolute;
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
}
</style>
