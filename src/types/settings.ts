export interface Settings {
  theme: 'light' | 'dark' | 'system';
  fontSize: number; // 14-24px
  fontFamily: 'sans' | 'serif' | 'mono';
  editorWidth: 'narrow' | 'medium' | 'wide';
  spellcheck: boolean;
  lineWrapping: boolean;
  autoSave: boolean;
  autoSaveDelay: number; // in milliseconds
  showLineNumbers: boolean;
  defaultNoteFormat: 'markdown';
  encryptionEnabled: boolean;
  encryptionKey: string | null; // Hex derived key or null, held in memory inside store
}
