import { watch, onMounted, onUnmounted } from 'vue';
import { useSettingsStore } from '@/stores/settings';

export function useTheme() {
  const settingsStore = useSettingsStore();
  
  const mediaQuery = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function applyTheme() {
    if (typeof document === 'undefined') return;
    
    const activeTheme = settingsStore.theme;
    let isDark = false;
    
    if (activeTheme === 'system') {
      isDark = mediaQuery ? mediaQuery.matches : false;
    } else {
      isDark = activeTheme === 'dark';
    }

    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }

  function handleSystemThemeChange() {
    if (settingsStore.theme === 'system') {
      applyTheme();
    }
  }

  watch(() => settingsStore.theme, () => {
    applyTheme();
  });

  onMounted(() => {
    applyTheme();
    if (mediaQuery) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    }
  });

  onUnmounted(() => {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
  });

  return {
    applyTheme,
  };
}
