# 🌌 Aether Notes

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4fc08d.svg)](https://vuejs.org/)
[![Tiptap](https://img.shields.io/badge/Editor-Tiptap-black.svg)](https://tiptap.dev/)
[![Dexie](https://img.shields.io/badge/Database-Dexie.js-blue.svg)](https://dexie.org/)

A minimal, secure, local-first, and markdown-first note-taking web application. Designed around Notion's visual layout principles and Obsidian's privacy-focused, stealth monochrome aesthetic. Powered by **Vue 3 (Composition API)**, **Tiptap**, **Pinia**, and **Dexie (IndexedDB)**.

---

## ✦ Design & Aesthetics

*   **Obsidian Dark Mode**: A premium, deep obsidian-black theme (`#0F0F11`) with subtle dark sidebar separators and high-contrast typography.
*   **Stealth Monochrome Accents**: Redefined active selections, drag indicators, outlines, and buttons using a minimalist monochrome palette: stealth black (`#1A1A18`) in light mode and pure white (`#FFFFFF`) in dark mode.
*   **Notion Color Palette**: Custom tag highlights, folder labels, and typography backgrounds using Notion's exact hex color system, fully responsive to light and dark theme variables.

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
*   **Web Crypto API**: High-strength client-side encryption using **AES-256-GCM** keys derived via **PBKDF2** (100,000 iterations) from a user-defined passphrase.
*   **Zero-Knowledge Architecture**: The decryption key is held strictly in-memory and never written to the local disk. Notes are encrypted transparently before writing to the database.
*   **IndexedDB Persistent Storage**: Managed by **Dexie.js** with local indexing of note metadata, favorites, pinned states, and trash.

### 3. Typography & Editor Customization
*   **Custom Fonts**: Choose between system **Sans-Serif**, classic **Editorial Serif**, or coder-friendly **Monospace** typography styles.
*   **Variable Font Sizes**: Slide-adjustable body sizes ranging from 14px to 24px.
*   **Editor Preferences**: Real-time styling updates for:
    *   **Line Wrapping**: Uncheck to keep long paragraphs on single lines with horizontal scrolling.
    *   **Line Numbers**: Displays code-style running numbers in the left gutter using pure CSS counters.
    *   **Spellcheck**: Toggle native browser grammar check inside Tiptap.

### 4. Fuzzy Search & Command Palette
*   **Command Palette (`Cmd/Ctrl+K`)**: Keyboard-centric search hub powered by **Fuse.js** for typo-tolerant query matching over titles, bodies, and tags. Includes instant trigger commands (e.g. create a note, toggle themes, delete a note).

### 5. Nested Folders & Organization
*   **Hierarchical Trees**: Drag-and-drop support to nest folders, rename directories, and customize label accent colors (synchronized dynamically between light/dark theme variables).
*   **Soft Deletions**: Trashed notes are held in the vault for 30 days before automatic purging.

---

## ✦ Directory Structure

```text
aether-notes/
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
# or: npm install
```

### Local Development Commands

| Command | Action |
| :--- | :--- |
| `bun run dev` | Starts Vite dev server on `http://localhost:5173` |
| `bun run build` | Compiles and typechecks code into minified `/dist` assets |
| `bun run preview` | Spins up a local server to preview the built production bundle |
| `bun run lint` | Runs eslint/prettier checks |

---

## ✦ Contribution Guidelines

We welcome contributions from the community! Follow these steps to contribute:

### 1. Development Process
1. **Fork the repo** and create a branch from `main`:
   - Features: `feature/your-feature-name`
   - Bugfixes: `bugfix/issue-description`
2. **Setup local dev**: Ensure you run `bun run dev` and check that the app runs.
3. **Commit your changes**: Write clear, imperative commit messages (e.g. `feat: add daily note shortcut button to sidebar`).
4. **Submit a Pull Request**: Provide a detailed description of the changes made, screenshots for visual updates, and link any related issues.

### 2. Code Standards & Rules
*   **Composition API**: Always write components using Vue 3's `<script setup lang="ts">` style.
*   **Minimal/Stealth Style**: Keep CSS updates minimal. Rely on custom properties defined in `tokens.css` to ensure perfect Light/Dark theme responsiveness. Do not hardcode raw Hex/HSL values in components.
*   **Maintain Type Safety**: Avoid the `any` keyword. Use interfaces defined inside `src/types/index.ts`.
*   **Documentation**: Maintain or update docstrings/comments on core helper systems like the cryptographic layer (`crypto.ts`) and db interfaces (`db.ts`).

### 3. Verification Checklist
Before submitting your PR, make sure to verify:
```bash
# Typecheck and build verification
bun run build
```
Ensure there are no TypeScript compiler warnings or vite bundling errors.

---

## ✦ License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.
