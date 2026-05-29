export interface Note {
  id: string;
  title: string;
  content: string;
  folder: string | null; // Folder ID (or null for Root/Uncategorized)
  tags: string[];
  isPinned: boolean;
  isFavorite: boolean;
  isTrashed: boolean;
  createdAt: number;
  updatedAt: number;
  encryptedWith: string | null;
  iv?: string; // Hex representation of IV for decryption
}
