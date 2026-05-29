export interface Folder {
  id: string;
  name: string;
  path: string; // Full path, e.g. "projects/ideas" or just path hierarchy
  parentId: string | null;
  color: string | null; // Optional color accent code
  sortOrder: number;
}
