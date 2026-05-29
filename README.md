# Aether Notes

A minimal, secure, local-first, markdown-first note-taking web application. Inspired by Notion's visual layout and Obsidian's privacy/monochrome aesthetics. Built using **Vue 3**, **Tiptap**, **Pinia**, and **Dexie (IndexedDB)**.

---

## ✦ Design & Aesthetics

*   **Obsidian Dark Mode**: A premium, deep obsidian-black theme (`#0F0F11`) with subtle dark sidebar separators and high-contrast text.
*   **Stealth Monochrome Accents**: Redefined highlights, active focus states, selection boxes, and buttons using a minimalist monochrome design: stealth black (`#1A1A18`) in light mode and pure white (`#FFFFFF`) in dark mode.
*   **Notion Color Palette**: Custom tag highlighting, folder label options, and typography backgrounds using Notion's exact hex color system for both light and dark modes.

---

## ✦ Key Features

### 1. Markdown-First Editor (Tiptap)
*   **Title Autogeneration**: Note titles are derived dynamically from the first line of content (which defaults to an `H1` block for a clean look). Manually typed titles are automatically locked to prevent unwanted overwriting.
*   **Dynamic Placeholders**: Focus placeholders show `"Title"` when cursor is on the empty H1 header, and `"Start writing or '/' for command formatting menu"` elsewhere.
*   **Notion-Style Slash (`/`) Commands**: Type `/` on any line below the title to trigger the formatting menu (Paragraph, H1, H2, H3). Selecting a block format automatically removes the `/` character.
*   **Real-time Clickable Outline**: A collapsible right-hand Table of Contents sidebar that automatically indexes document headings (`H1`–`H3`) and supports smooth scrolling to them on click.
*   **Bubble formatting toolbar**: Contextual toolbar menu offering P, H1, H2, H3 toggles, Bold, Italic, Strikethrough, Highlight, Code blocks, and Link inputs.
*   **Inline Tag Highlighting**: Automatic regex-based parsing and visual highlighting of `@tags` inside document blocks. Clicking a tag in the sidebar will scroll the editor smoothly to its first occurrence.

### 2. local-First Security & Vault Encryption
*   **Web Crypto API**: High-strength client-side encryption using **AES-256-GCM** keys derived via **PBKDF2** (100,000 iterations) from a user-defined passphrase.
*   **Zero-Knowledge Architecture**: The decryption key is held strictly in-memory and never written to the local disk. Notes are encrypted transparently before writing to the database.
*   **IndexedDB Persistent Storage**: Handled by **Dexie.js** with local indexing of note metadata, favorites, pinned flags, and trash.

### 3. Typography & Editor Customization
*   **Custom Fonts**: Choose between system **Sans-Serif**, classic **Editorial Serif**, or coder-friendly **Monospace** typography styles.
*   **Variable Font Sizes**: Slide-adjustable body sizes ranging from 14px to 24px.
*   **Editor Toggles**: Real-time styling updates for:
    *   **Line Wrapping**: Uncheck to keep long paragraphs on single lines with horizontal scrolling.
    *   **Line Numbers**: Displays code-style running numbers in the left gutter using pure CSS counters.
    *   **Spellcheck**: Toggle native browser grammar check inside Tiptap.

### 4. Fuzzy Search & Command Palette
*   **Command Palette (`Cmd/Ctrl+K`)**: Keyboard-centric search hub powered by **Fuse.js** for typo-tolerant query matching over titles, bodies, and tags. Includes instant trigger commands (e.g. create a note, toggle themes, delete a note).

### 5. Nested Folders & Organization
*   **Hierarchical Trees**: Drag-and-drop support to nest folders, rename directories, and customize label accent colors (synchronized dynamically between light/dark theme variables).
*   **Soft Deletions**: Trashed notes are held in the vault for 30 days before automatic purging.

### 6. Data Portability & PWA
*   **Vault backups**: Export folders and notes as a unified JSON package, and import JSON backups or multiple raw `.md` files directly.
*   **PWA Ready**: Offline editing capability supported by Service Worker precaching.

---

## ✦ Technology Stack

*   **Framework**: Vue 3 (Composition API, `<script setup>`)
*   **Bundler & Dev Server**: Vite + TypeScript
*   **State Management**: Pinia
*   **Database**: Dexie.js (IndexedDB wrapper)
*   **Rich Text Engine**: Tiptap v2/v3 (ProseMirror-based)
*   **Fuzzy Search Engine**: Fuse.js
*   **Theme & Spacing Utilities**: Vanilla CSS Variables

---

## ✦ Getting Started

### Prerequisites
*   Node.js (v18+)
*   [Bun](https://bun.sh/) (recommended) or npm

### Installation
Clone the repository, navigate to the folder, and install the dependencies:
```bash
bun install
# or
npm install
```

### Development Server
Start the local Vite dev server (defaults to `http://localhost:5173`):
```bash
bun run dev
# or
npm run dev
```

### Production Build
Compile and bundle the project into a minified, production-ready static directory (`dist`):
```bash
bun run build
# or
npm run build
```

---

## ✦ License

Private / Proprietary. Created with love.
