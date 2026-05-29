import { ref } from 'vue';
import { useNotesStore } from '@/stores/notes';

export function useAutoSave() {
  const notesStore = useNotesStore();
  const saveStatus = ref<'saved' | 'saving' | 'error'>('saved');
  let timeoutId: any = null;

  function save(noteId: string, content: string, delay = 300) {
    saveStatus.value = 'saving';
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(async () => {
      try {
        await notesStore.updateNote(noteId, { content });
        saveStatus.value = 'saved';
      } catch (err) {
        console.error('Auto-save failed:', err);
        saveStatus.value = 'error';
      } finally {
        timeoutId = null;
      }
    }, delay);
  }

  function flush(noteId: string, content: string) {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
      
      // Return a promise for async tracking if needed
      return notesStore.updateNote(noteId, { content })
        .then(() => {
          saveStatus.value = 'saved';
        })
        .catch(err => {
          console.error('Flush save failed:', err);
          saveStatus.value = 'error';
          throw err;
        });
    }
    return Promise.resolve();
  }

  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  return {
    save,
    flush,
    cancel,
    saveStatus
  };
}
