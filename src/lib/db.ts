import Dexie, { type Table } from 'dexie';
import type { Note, Folder } from '@/types';

export class AetherNotesDB extends Dexie {
  notes!: Table<Note>;
  folders!: Table<Folder>;
  settings!: Table<{ key: string; value: any }>;

  constructor() {
    super('AetherNotes');
    this.version(1).stores({
      notes: 'id, folder, updatedAt, isPinned, isTrashed, *tags',
      folders: 'id, path, parentId',
      settings: 'key',
    });
  }
}

export const db = new AetherNotesDB();
export default db;
