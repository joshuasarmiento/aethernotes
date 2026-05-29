import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUiStore = defineStore('ui', () => {
  const isSidebarOpen = ref<boolean>(true);
  const isFocusMode = ref<boolean>(false);
  const isSearchOpen = ref<boolean>(false);
  const isOutlineOpen = ref<boolean>(true);
  const activeFolderId = ref<string | null>(null);
  const activeTag = ref<string | null>(null);
  
  // Editor status
  const wordCount = ref<number>(0);
  const charCount = ref<number>(0);
  const saveStatus = ref<'saved' | 'saving' | 'error'>('saved');

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
  }

  function toggleFocusMode() {
    isFocusMode.value = !isFocusMode.value;
  }

  function toggleSearch() {
    isSearchOpen.value = !isSearchOpen.value;
  }

  function toggleOutline() {
    isOutlineOpen.value = !isOutlineOpen.value;
  }

  function selectFolder(folderId: string | null) {
    activeFolderId.value = folderId;
    activeTag.value = null; // Clear tag filter when selecting folder
  }

  function selectTag(tag: string | null) {
    activeTag.value = tag;
    activeFolderId.value = null; // Clear folder filter when selecting tag
  }

  // PWA Install state
  const pwaInstallPrompt = ref<any>(null);
  const showPwaPrompt = ref<boolean>(false);

  function setPwaInstallPrompt(prompt: any) {
    pwaInstallPrompt.value = prompt;
    // If not running in standalone, and not dismissed before, trigger showing it
    const dismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (dismissed !== 'true') {
      showPwaPrompt.value = true;
    }
  }

  function dismissPwaPrompt() {
    showPwaPrompt.value = false;
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  }

  return {
    isSidebarOpen,
    isFocusMode,
    isSearchOpen,
    isOutlineOpen,
    activeFolderId,
    activeTag,
    wordCount,
    charCount,
    saveStatus,
    pwaInstallPrompt,
    showPwaPrompt,
    toggleSidebar,
    toggleFocusMode,
    toggleSearch,
    toggleOutline,
    selectFolder,
    selectTag,
    setPwaInstallPrompt,
    dismissPwaPrompt
  };
});
