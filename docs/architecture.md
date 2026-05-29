# Architectural Decision Records & System Design

This document details Aether Notes' system design, encryption model, organization policies, and technical rationales for contributors and maintainers.

---

## 1. Storage Rationale: Dexie & IndexedDB

### Why IndexedDB (via Dexie.js) was Chosen:
We selected IndexedDB over alternatives like **Origin Private File System (OPFS)**, **localStorage**, and **SQLite-WASM**:

*   **vs localStorage**: localStorage has a rigid **5MB capacity limit** per origin and operates synchronously (blocking the main thread). Aether Notes handles large notes, folders, and embedded media, making localStorage insufficient.
*   **vs OPFS**: While OPFS provides high-performance file-system access, it is file-oriented. It lacks built-in support for relational database queries, compound indexing, transaction management, and schema migrations.
*   **vs SQLite-WASM**: SQLite-WASM provides SQL capabilities in the browser, but it requires compiling and shipping a large WASM binary (~1–2MB) to the client. This hurts initial load times. Additionally, persisting SQLite files in the browser relies on OPFS or IndexedDB sync layers anyway, introducing configuration complexity.
*   **The Dexie.js Advantage**: Dexie.js is a lightweight (~20KB) wrapper around the browser's native IndexedDB. It offers a clean promise-based API, reactive queries (live queries), transactional security, indices (e.g. searching notes by folder or tags), and seamless database schema versioning/migrations with zero bundle size bloat.

---

## 2. Search Engine & Scaling: Fuse.js

Aether Notes uses **Fuse.js** for client-side fuzzy search over note titles, content bodies, and tags.

### Scalability Limits & Thresholds:
Fuse.js loads the search index in memory and searches text arrays in a single thread.
*   **Comfort Zone (Up to 2,000–5,000 notes)**: Memory footprint and search execution remain well under **16ms** (1 frame), providing instantaneous feedback as users type in the Command Palette (`Cmd/Ctrl+K`).
*   **Degradation Zone (5,000+ notes)**: Large text corpuses can cause noticeable keyboard lag during typing.

### Migration Path:
If a vault grows beyond 5,000 notes, we plan to migrate search to one of two designs:
1.  **Web Worker Indexing**: Offload the Fuse.js search execution to a background Web Worker so it does not block the UI thread.
2.  **Dexie Full-Text Indexing (FTS)**: Utilize an IndexedDB-native FTS approach (such as storing split, stemmed word arrays inside Dexie tables) to run search directly inside the database indices.

---

## 3. Cryptosystem: Zero-Knowledge Encryption

Aether Notes derives AES-GCM 256-bit keys using PBKDF2 with 100,000 iterations from a user's passphrase and a local cryptographic salt.

### Passphrase Changes & Re-encryption Workflow:
When a user updates their password in settings:
1.  **Read Decrypted Cache**: The app verifies that the current key is loaded in-memory and notes are decrypted.
2.  **Generate New Key**: Derives a new AES-256-GCM key from the new passphrase and a fresh salt using the Web Crypto API.
3.  **Batch Update**: Decrypts all active notes from IndexedDB using the old key, encrypts them using the new key, and updates the database records in a single database transaction.
4.  **In-Memory Replace**: Replaces the active key in memory and discards the old key.

### Zero-Knowledge Recovery Caveat:
Because the decryption key is derived solely from the user's passphrase and salt, Aether Notes maintainers cannot recover data if the passphrase is forgotten. There are no recovery codes, backup servers, or master keys. This must be highlighted in the onboarding UI.

### Security Evolution (Iterative Counts):
The iteration count is currently fixed at **100,000**. To meet evolving security recommendations (such as NIST SP 800-132), future database schemas will save the iteration count inside the settings table, allowing Aether Notes to auto-upgrade vaults to higher iteration counts dynamically as client devices get faster.

---

## 4. Trash Lifecycle & Soft Deletion

*   **Policy**: Trashed notes are marked `isTrashed = true` and remain in IndexedDB.
*   **Automatic Purge**: When the application mounts (`AppShell.vue`'s `onMounted`), it triggers a database purge of notes where `isTrashed === true` and `updatedAt` is older than 30 days.
*   **Configurability**: In Settings under "Preferences", users can configure the trash retention window (e.g., 7 days, 30 days, or "Never Auto-Purge").
*   **Export Safeguard**: Before a note is permanently deleted, the store checks if the user has backed up their vault recently. A warning message appears if the user attempts to empty the trash manually.

---

## 5. PWA & Offline Strategy

*   **Caching Lifecycle**: Handled via `vite-plugin-pwa` in `vite.config.ts`. It leverages standard Service Worker precaching to store application shell components (HTML, styles, scripts, fonts).
*   **Offline Operation**: Once installed, the application runs entirely offline. Data operations are written to IndexedDB. Once network access returns, local assets stay loaded.
*   **AutoUpdate Behavior**: The service worker is configured to `registerType: 'autoUpdate'`. When a new deployment occurs, the new service worker mounts and activates automatically, ensuring users are always running the latest version without manual refresh prompts.

---

## 6. Accessibility (a11y) Architecture

We design with keyboard-first navigation and assistive technology in mind:

### Focus Management:
*   **Command Palette**: Opening the palette (`Cmd/Ctrl+K`) traps keyboard focus. Arrow keys navigate matching results, and `Escape` closes the palette, returning focus to the editor cursor.
*   **Editor Focus**: The editor viewport can be entered using `Tab` and exited using standard prose focus escapes.

### ARIA Attributes:
*   **Sidebar Navigation**: Folder tree list nodes are rendered with `role="tree"` and folders use `role="treeitem"`, tracking expanded states with `aria-expanded="true/false"`.
*   **Modals & Dialogs**: Standard dialog overlays use `role="dialog"`, `aria-modal="true"`, and label references (`aria-labelledby`).
*   **Actionable Buttons**: Custom SVG icon buttons use descriptive `aria-label` tags so screen readers read out actions (e.g. "Create New Note") instead of just reading "Button".

---

## 7. Testing Strategy

Contributors must follow this testing structure:

### Unit Tests
*   **Scope**: Database APIs (`db.ts`), cryptographic key derivations (`crypto.ts`), and Pinia store state logic.
*   **Tool**: **Vitest** for fast, headless local tests.
*   **Command**: `bun run test`

### Component/Integration Tests
*   **Scope**: Inter-component bindings, e.g., Tiptap editor typography settings syncing with editor view wrappers, folder creations, and outline headings updates.
*   **Tool**: **Vitest** + **Vue Test Utils** (mocking browser dependencies like Web Crypto and IndexedDB where necessary).

### End-to-End (E2E) & PWA Tests
*   **Scope**: Testing the entire user journey (creating notes, encrypting vault, offline operations, Drag and Drop reorganizations).
*   **Tool**: **Playwright** running automated headless chromium tests to verify service worker registration, PWA installation criteria, and local storage persistence.
