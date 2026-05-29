# 🌌 Aether Notes

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4fc08d.svg)](https://vuejs.org/)
[![Tiptap](https://img.shields.io/badge/Editor-Tiptap-black.svg)](https://tiptap.dev/)
[![Dexie](https://img.shields.io/badge/Database-Dexie.js-blue.svg)](https://dexie.org/)

A minimal, secure, local-first, and markdown-first note-taking web application. Designed around Notion's visual layout principles and Obsidian's privacy-focused, stealth monochrome aesthetic. Powered by **Vue 3 (Composition API)**, **Tiptap**, **Pinia**, and **Dexie (IndexedDB)**.

---

## ✦ Technical Documentation & Contribution Quick-Links
*   **System Architecture & Decisions**: [docs/architecture.md](file:///Users/joshuasarmiento/Documents/Github/Aether%20Notes/docs/architecture.md) (Dexie vs OPFS, cryptosystem workflows, search scaling limits, soft-delete design, PWA setup, a11y, and testing).
*   **Contribution Guidelines**: [CONTRIBUTING.md](file:///Users/joshuasarmiento/Documents/Github/Aether%20Notes/CONTRIBUTING.md) (Conventional Commits, git hook enforcement, PR templates, and coding standards).

---

## ✦ Key Features

### 1. Markdown-First Editor (Tiptap Engine)
*   **Title Autogeneration**: Note titles are derived dynamically from the first line of content (which defaults to an `H1` block for a clean look). Manually typed titles are locked to prevent unwanted overwriting.
*   **Dynamic Placeholders**: Focus placeholders show `"Title"` when focusing on an empty H1 heading, and `"Start writing or '/' for command formatting menu"` elsewhere.
*   **Notion-Style Slash (`/`) Commands**: Type `/` on any line below the title to trigger the formatting bubble menu (Paragraph, H1, H2, H3). Selecting a format automatically deletes the `/` character.
*   **Real-time Clickable Outline**: A collapsible right-hand Table of Contents sidebar that dynamically indexes document headings (`H1`–`H3`) and supports smooth scrolling to heading elements on click.
*   **Contextual Bubble Menu**: Context-aware floating toolbar menu offering paragraph/heading toggles, bold, italic, strikethrough, highlight, inline code, and link inputs.
*   **Inline Tag Highlighting**: Automatic regex-based parsing and terracotta highlighting of `@tags` inside blocks. Clicking a tag in the sidebar scrolls the editor smoothly to its first occurrence.

### 2. Local-First Security & Vault Encryption
*   **AES-256-GCM Encryption**: Client-side encryption derived via **PBKDF2** (100,000 iterations) from a user-defined passphrase using the native Web Crypto API.
*   **Zero-Knowledge Architecture**: The decryption key is held strictly in-memory and never written to the local disk. If a passphrase is forgotten, **data recovery is cryptographically impossible**.
*   **Passphrase Changing**: When changing the passphrase, Aether Notes runs a batch update transaction, decrypting note records using the current key, re-encrypting them with the new derived key, and saving them back to the database.
*   **IndexedDB Persistent Storage**: Managed by **Dexie.js** with local indexing of note metadata, favorites, pinned states, and trash.

### 3. Progressive Web App (PWA) & Offline-First Strategy
*   **Pre-caching assets**: Pre-caches assets (HTML, styles, scripts, fonts) upon installation to ensure the application works offline.
*   **Auto-Update Service Worker**: Service Worker configured for `registerType: 'autoUpdate'` in Vite, ensuring any new updates are mounted and activated immediately without manual refresh cycles.
*   **Installability**: Fully compliant with modern Chrome and Safari PWA criteria (standalone window display, custom manifest, and offline assets fetching).

### 4. Accessibility (a11y) Layouts
*   **Focus Trapping**: Keyboard navigation traps focus within active dialogs (Settings Modal, Command Palette) and returns focus cleanly to the editor on close.
*   **ARIA Accessibility**: Folder trees use `role="tree"` and folders act as `role="treeitem"`, tracking toggle visibility via `aria-expanded` and interactive triggers via `aria-label`.
*   **Keybind Integrations**: Keyboard shortcuts for core workflows:
    *   `Cmd/Ctrl+K` to toggle the Command Palette.
    *   `Escape` to exit focus menus or palettes.
    *   Arrow keys to navigate through palette searches and tree lists.

### 5. Typography & Editor Customization
*   **Custom Fonts**: Choose between system **Sans-Serif**, classic **Editorial Serif**, or coder-friendly **Monospace** typography styles.
*   **Variable Font Sizes**: Slide-adjustable body sizes ranging from 14px to 24px.
*   **Editor Preferences**: Real-time styling updates for:
    *   **Line Wrapping**: Uncheck to keep long paragraphs on single lines with horizontal scrolling.
    *   **Line Numbers**: Displays code-style running numbers in the left gutter using pure CSS counters.
    *   **Spellcheck**: Toggle native browser grammar check inside Tiptap.

### 6. Fuzzy Search & Command Palette
*   **Command Palette (`Cmd/Ctrl+K`)**: Keyboard-centric search hub powered by **Fuse.js** for typo-tolerant query matching over titles, bodies, and tags. Includes instant trigger commands (e.g. create a note, toggle themes, delete a note).

### 7. Nested Folders & Organization
*   **Hierarchical Trees**: Drag-and-drop support to nest folders, rename directories, and customize label accent colors (synchronized dynamically between light/dark theme variables).
*   **Soft Deletions & Purges**: Trashed notes are held for 30 days before automatic purging. Users can configure the trash retention window (7 days, 30 days, or "Never") inside settings and trigger export backups before permanent deletion.

---

## ✦ Testing Strategy

Contributors must verify their code utilizing the following test structure:

*   **Unit Tests (Vitest)**: Core utilities testing, focusing on cryptographically derived key generation (`crypto.ts`) and database transactions (`db.ts`).
    ```bash
    bun run test
    ```
*   **Component & Integration Tests (Vitest + Vue Test Utils)**: Validating styling syncs between Pinia states, custom Tiptap extensions, and UI wrappers.
*   **End-to-End & PWA Tests (Playwright)**: Verifying installation flows, drag-and-drop hierarchy operations, and offline IndexedDB persistence.

---

## ✦ Directory Structure

```text
aether-notes/
├── .github/                 # GitHub workflows & Pull Request templates
├── docs/                    # System designs & Architectural Decision Records
│   └── architecture.md      # Detailed system constraints & crypto design
├── public/                  # Static assets & PWA manifest icons
├── src/
│   ├── assets/              # Design system styling files
│   │   ├── styles/
│   │   │   ├── tokens.css       # HSL-tailored light/dark color tokens
│   │   │   ├── global.css       # Resets, scrollbars, noise overlay
│   │   │   ├── editor.css       # Tiptap specific styling overrides
│   │   │   └── transitions.css  # Vue transition animation timing rules
│   ├── components/          # Reusable Vue components
│   │   ├── editor/          # Tiptap wrapper, BubbleMenu toolbar
│   │   ├── layout/          # AppShell grid, TopBar, StatusBar
│   │   ├── note-list/       # Note search items and filtering
│   │   ├── search/          # Command palette search hub
│   │   ├── settings/        # Preferences panel & encryption options
│   │   └── sidebar/         # Folder tree lists, tag lists, footer
│   ├── composables/         # Shared state wrappers (useTheme, useKeyboard)
│   ├── extensions/          # Custom ProseMirror/Tiptap extensions
│   ├── lib/                 # Core utilities (crypto, DB, nanoid)
│   ├── stores/              # Pinia global states (notes, folders, settings)
│   ├── types/               # TypeScript interfaces
│   ├── App.vue              # Main container
│   └── main.ts              # Entry mounting logic
├── index.html               # Main template anchor
├── vite.config.ts           # Bundler and PWA service worker config
└── tsconfig.json            # TypeScript options
```

---

## ✦ Getting Started

### Prerequisites
*   Node.js (v18+)
*   [Bun](https://bun.sh/) (recommended) or npm

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/aether-notes.git
cd aether-notes
bun install
```

### Development Server
```bash
bun run dev
```

### Production Build
```bash
bun run build
```

---

## ✦ License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.
