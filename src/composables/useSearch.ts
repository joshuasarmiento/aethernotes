import { ref, watch, computed } from 'vue';
import Fuse, { type FuseResult } from 'fuse.js';
import { useNotesStore } from '@/stores/notes';
import type { Note } from '@/types';

export function useSearch() {
  const notesStore = useNotesStore();
  const searchQuery = ref('');
  const searchResults = ref<FuseResult<Note>[]>([]);

  const searchableNotes = computed(() => 
    notesStore.activeNotes
  );

  const fuse = computed(() => {
    return new Fuse(searchableNotes.value, {
      keys: [
        { name: 'title', weight: 0.6 },
        { name: 'content', weight: 0.4 },
        { name: 'tags', weight: 0.5 }
      ],
      threshold: 0.3, // typo tolerance
      includeMatches: true,
      ignoreLocation: true
    });
  });

  watch([searchQuery, searchableNotes], () => {
    const query = searchQuery.value.trim();
    if (!query) {
      searchResults.value = [];
      return;
    }
    searchResults.value = fuse.value.search(query);
  }, { deep: true });

  return {
    searchQuery,
    searchResults
  };
}
