import { onMounted, onUnmounted } from 'vue';
import { useUiStore } from '@/stores/ui';
import { useSettingsStore } from '@/stores/settings';
import { useNotesStore } from '@/stores/notes';
import { useRouter } from 'vue-router';

export function useKeyboard() {
  const uiStore = useUiStore();
  const settingsStore = useSettingsStore();
  const notesStore = useNotesStore();
  const router = useRouter();

  function handleKeyDown(event: KeyboardEvent) {
    const isMod = event.metaKey || event.ctrlKey;
    const isShift = event.shiftKey;
    const key = event.key.toLowerCase();

    // 1. Toggle Sidebar (Cmd/Ctrl + \)
    if (isMod && event.key === '\\') {
      event.preventDefault();
      uiStore.toggleSidebar();
      return;
    }

    // 2. Command Palette (Cmd/Ctrl + K)
    if (isMod && key === 'k') {
      event.preventDefault();
      uiStore.toggleSearch();
      return;
    }

    // 3. New Note (Cmd/Ctrl + N)
    if (isMod && key === 'n') {
      event.preventDefault();
      notesStore.createNote(uiStore.activeFolderId).then(newNote => {
        router.push(`/note/${newNote.id}`);
      });
      return;
    }

    // 4. Toggle Theme (Cmd/Ctrl + Shift + L)
    if (isMod && isShift && key === 'l') {
      event.preventDefault();
      const currentTheme = settingsStore.theme;
      const nextTheme = currentTheme === 'light' ? 'dark' : currentTheme === 'dark' ? 'system' : 'light';
      settingsStore.setSetting('theme', nextTheme);
      return;
    }

    // 5. Toggle Focus Mode (Cmd/Ctrl + Shift + F)
    if (isMod && isShift && key === 'f') {
      event.preventDefault();
      uiStore.toggleFocusMode();
      return;
    }

    // 6. Escape (Close modal / exit search / deselect)
    if (event.key === 'Escape') {
      if (uiStore.isSearchOpen) {
        event.preventDefault();
        uiStore.isSearchOpen = false;
      }
      return;
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });
}
