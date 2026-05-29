<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="docs-dialog-overlay" @click="handleClose">
        <div class="docs-dialog-card animate-slide-up" @click.stop>
          <!-- Header -->
          <div class="docs-dialog-header">
            <div class="docs-dialog-title font-display">Documentation</div>
            <button class="close-btn" @click="handleClose" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Body Content -->
          <div class="docs-dialog-body font-ui">
            <!-- 1. Introduction -->
            <section class="docs-sec">
              <h4 class="sec-title">Introduction</h4>
              <p class="sec-p">Aether Notes is a local-first notes workspace running entirely in the browser. Built
                using Vue 3, Tiptap, Pinia, and Dexie.js (IndexedDB), it features zero-knowledge client-side encryption
                via the Web Crypto API.</p>
              <div class="sec-callout">
                <strong>Offline Support:</strong> Fully cached via service worker PWA, allowing complete offline
                functionality.
              </div>
            </section>

            <!-- 2. Getting Started -->
            <section class="docs-sec">
              <h4 class="sec-title">Getting Started</h4>
              <p class="sec-p">Simply open Aether Notes on the web and configure your private password (or passphrase)
                when prompted. This passphrase derives the local key to encrypt and lock your notes database.</p>
              <div class="sec-callout warning">
                <strong>Password Loss = Data Loss:</strong> We do not have servers, meaning there is no recovery option.
                Write your passphrase down and store it safely.
              </div>
            </section>

            <!-- 3. Editor & Formatting -->
            <section class="docs-sec">
              <h4 class="sec-title">Editor & Formatting</h4>
              <p class="sec-p">Powered by Tiptap (ProseMirror core), the editor parses markdown input rules as you type
                or through the floating bubble menu.</p>
              <p class="sec-p"><strong>Slash commands:</strong> Type <code class="inline-code">/</code> at the end of
                any line to trigger formatting toggles (Paragraph, H1, H2, H3).</p>

              <div class="table-wrapper">
                <table class="docs-table">
                  <thead>
                    <tr>
                      <th>Syntax</th>
                      <th>Format</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code class="inline-code">**bold**</code></td>
                      <td>Bold text</td>
                    </tr>
                    <tr>
                      <td><code class="inline-code">_italic_</code></td>
                      <td>Italic text</td>
                    </tr>
                    <tr>
                      <td><code class="inline-code">~~strike~~</code></td>
                      <td>Strikethrough</td>
                    </tr>
                    <tr>
                      <td><code class="inline-code">`code`</code></td>
                      <td>Inline code</td>
                    </tr>
                    <tr>
                      <td><code class="inline-code">==highlight==</code></td>
                      <td>Highlight mark</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p class="sec-p"><strong>Inline Tags:</strong> Prefix any keyword with an <code
                  class="inline-code">@</code> symbol (e.g. <code class="inline-code">@idea</code>) to tag your text.
                Tags are indexed in the sidebar for quick scroll-anchoring.</p>
            </section>

            <!-- 4. Keyboard Shortcuts -->
            <section class="docs-sec">
              <h4 class="sec-title">Keyboard Shortcuts</h4>
              <div class="table-wrapper">
                <table class="docs-table">
                  <thead>
                    <tr>
                      <th>Shortcut</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><kbd>Cmd/Ctrl + K</kbd></td>
                      <td>Open Search / Command Palette</td>
                    </tr>
                    <tr>
                      <td><kbd>Cmd/Ctrl + N</kbd></td>
                      <td>New Note</td>
                    </tr>
                    <tr>
                      <td><kbd>Cmd/Ctrl + \</kbd></td>
                      <td>Toggle Sidebar</td>
                    </tr>
                    <tr>
                      <td><kbd>Cmd/Ctrl + B</kbd></td>
                      <td>Bold</td>
                    </tr>
                    <tr>
                      <td><kbd>Cmd/Ctrl + I</kbd></td>
                      <td>Italic</td>
                    </tr>
                    <tr>
                      <td><kbd>Cmd/Ctrl + Shift + X</kbd></td>
                      <td>Strikethrough</td>
                    </tr>
                    <tr>
                      <td><kbd>Cmd/Ctrl + E</kbd></td>
                      <td>Inline Code</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <!-- 5. Command Search -->
            <section class="docs-sec">
              <h4 class="sec-title">Command Search</h4>
              <p class="sec-p">Press <kbd>Cmd/Ctrl + K</kbd> to open the palette powered by Fuse.js fuzzy search.
                Quickly scan titles, bodies, and tags, or type commands like <code class="inline-code">settings</code>
                or <code class="inline-code">trash</code>.</p>
            </section>

            <!-- 6. Folders & Organization -->
            <section class="docs-sec">
              <h4 class="sec-title">Folders & Organization</h4>
              <p class="sec-p"><strong>Nested Folders:</strong> Create subfolders and re-parent structures via
                drag-and-drop. Deleting a folder safely moves its notes to Uncategorized.</p>
              <p class="sec-p"><strong>Favorites & Trash:</strong> Star notes to pin them in the sidebar. Configure
                automatic trash purging (7 days, 30 days, or never) under Settings.</p>
            </section>

            <!-- 7. Security (How Privacy Works) -->
            <section class="docs-sec">
              <h4 class="sec-title">How Privacy Works</h4>
              <p class="sec-p">All cryptographic operations run client-side via the Web Crypto API.</p>
              <ul class="docs-list">
                <li><strong>PBKDF2 Derivation:</strong> Key derived using PBKDF2 (100,000 iterations) with a local
                  random salt.</li>
                <li><strong>AES-256-GCM:</strong> Derived key encrypts/decrypts notes in-memory. The key never touches
                  IndexedDB or localStorage.</li>
                <li><strong>IndexedDB Storage:</strong> Encrypted ciphertext, random IV, and authentication tag are
                  stored locally.</li>
              </ul>
            </section>

            <!-- 8. App Installation -->
            <section class="docs-sec">
              <h4 class="sec-title">App Installation</h4>
              <p class="sec-p">Install Aether Notes as a Progressive Web App (PWA) to run offline:</p>
              <ul class="docs-list">
                <li><strong>Desktop (Chrome/Edge/Safari):</strong> Click the install icon in the address bar.</li>
                <li><strong>iOS Safari:</strong> Tap Share → Add to Home Screen.</li>
                <li><strong>Android Chrome:</strong> Tap the install banner.</li>
              </ul>
            </section>

            <!-- 9. Data Safety & Backup -->
            <section class="docs-sec">
              <h4 class="sec-title">Data Safety & Backup</h4>
              <p class="sec-p">Back up and download your data in Settings under Data Portability:</p>
              <ul class="docs-list">
                <li><strong>Export Vault (JSON):</strong> Full encrypted database snapshot file including settings and
                  note history.</li>
                <li><strong>Export Markdown (ZIP):</strong> Generates a folder structure containing all notes exported
                  as raw Markdown (.md) text files inside a ZIP archive.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void;
}>();

function handleClose() {
  emit('close');
}
</script>

<style scoped>
.docs-dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: var(--space-md);
}

.docs-dialog-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.docs-dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--border-subtle);
  flex-shrink: 0;
}

.docs-dialog-title {
  font-size: 20px;
  color: var(--text-primary);
  margin: 0;
}

.close-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 6px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--duration-fast) var(--ease-out);
}

.close-btn:hover {
  background: var(--bg-sunken);
  color: var(--text-primary);
}

.docs-dialog-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.docs-sec {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.sec-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 2px 0;
  border-left: 2px solid var(--accent);
  padding-left: 8px;
}

.sec-p {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.sec-callout {
  background: var(--bg-sunken);
  /* border-left: 3px solid var(--accent); */
  padding: 8px var(--space-sm);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-size: 11px;
  color: var(--text-secondary);
}

.sec-callout.warning {
  /* border-left-color: var(--notion-red); */
  background: rgba(235, 87, 87, 0.05);
}

.table-wrapper {
  overflow-x: auto;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  margin: var(--space-xs) 0;
}

.docs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
  text-align: left;
}

.docs-table th,
.docs-table td {
  padding: 8px 12px;
  border-bottom: 1px solid var(--border-subtle);
}

.docs-table th {
  background: var(--bg-sunken);
  font-weight: 600;
  color: var(--text-primary);
}

.docs-table td {
  color: var(--text-secondary);
}

.docs-table tr:last-child td {
  border-bottom: none;
}

.docs-list {
  margin: 0;
  padding-left: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.docs-list li {
  font-size: 11px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.inline-code {
  font-family: 'JetBrains Mono', monospace;
  background: var(--bg-sunken);
  color: var(--accent);
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 10px;
}

kbd {
  font-family: 'JetBrains Mono', monospace;
  background: var(--bg-sunken);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 2px 5px;
  font-size: 9px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  color: var(--text-primary);
}

/* Animations */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform var(--duration-base) var(--ease-out),
    opacity var(--duration-base) var(--ease-out);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--duration-base) var(--ease-out);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
