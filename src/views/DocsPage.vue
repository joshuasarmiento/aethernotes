<template>
  <div class="docs-page">

    <!-- Top Bar -->
    <header class="docs-header font-ui">
      <div class="docs-header-inner">
        <div class="docs-logo-container">
          <!-- Sidebar Toggle Button (visible only on mobile) -->
          <button class="sidebar-toggle" @click="toggleSidebar" :aria-expanded="sidebarOpen" aria-label="Toggle navigation">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>

          <router-link to="/" class="docs-logo">
            <svg class="logo-icon" width="14" height="20" viewBox="0 0 333 510" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M169.501 0.264499C172.368 1.7765 172.368 1.7765 175.376 3.9525C175.928 4.3495 176.479 4.7465 177.048 5.1555C184.435 10.5545 191.478 16.4055 198.501 22.2645C199.1 22.7635 199.699 23.2615 200.316 23.7755C207.52 29.7815 214.58 35.9325 221.501 42.2645C222.473 43.1435 223.445 44.0225 224.446 44.9285C230.736 50.6455 236.855 56.5165 242.876 62.5145C243.857 63.4885 243.857 63.4885 244.857 64.4815C249.274 68.9125 253.424 73.5215 257.501 78.2645C258.451 79.3475 259.401 80.4295 260.353 81.5105C268.153 90.4535 275.435 99.7325 282.501 109.264C283.267 110.29 283.267 110.29 284.048 111.338C303.4 137.42 317.147 166.227 326.501 197.264C326.901 198.537 326.901 198.538 327.31 199.837C331.76 214.815 333.003 230.045 332.892 245.598C332.876 248.263 332.892 250.927 332.911 253.592C332.931 268.923 331.561 284.231 326.376 298.764C326.076 299.628 325.776 300.493 325.467 301.383C319.813 317.191 312.186 331.57 302.501 345.264C302.082 345.86 301.662 346.456 301.23 347.07C289.864 362.949 275.363 376.926 259.501 388.264C258.945 388.67 258.389 389.077 257.815 389.495C243.751 399.681 227.9 408.134 211.708 414.397C209.493 415.217 209.493 415.217 207.478 416.35C203.897 418.006 200.336 418.035 196.501 417.264C192.918 414.266 191.727 412.32 190.751 407.764C191.587 403.862 192.792 402.125 195.958 399.71C199.706 397.58 203.704 396.269 207.759 394.854C246.528 380.894 278.606 349.579 298.501 314.264C299.055 313.305 299.61 312.346 300.181 311.358C315.676 282.776 316.739 246.493 310.501 215.264C310.356 214.527 310.212 213.792 310.063 213.033C306.91 197.399 301.785 181.481 294.501 167.264C294.342 168.45 294.184 169.636 294.021 170.858C291.881 186.032 288.798 200.133 280.501 213.264C279.989 214.08 279.477 214.897 278.95 215.738C270.259 228.826 258.403 240.112 246.501 250.264C244.209 252.221 241.917 254.18 239.626 256.139C239.02 256.657 238.414 257.176 237.789 257.71C233.378 261.49 229.036 265.339 224.739 269.249C222.629 271.15 220.478 272.99 218.313 274.827C202.638 288.516 190.998 308.149 184.876 327.889C184.577 328.842 184.278 329.795 183.969 330.776C181.496 338.859 179.712 346.898 178.501 355.264C178.328 356.376 178.156 357.489 177.978 358.635C177.234 364.682 177.357 370.753 177.359 376.837C177.356 378.198 177.353 379.559 177.349 380.919C177.341 383.836 177.336 386.752 177.332 389.669C177.326 394.283 177.31 398.898 177.291 403.512C177.285 405.096 177.278 406.679 177.272 408.263C177.269 409.055 177.266 409.848 177.262 410.664C177.22 421.397 177.187 432.131 177.175 442.865C177.167 450.12 177.144 457.374 177.106 464.629C177.086 468.464 177.074 472.299 177.079 476.133C177.083 479.736 177.069 483.339 177.042 486.943C177.031 488.891 177.041 490.837 177.051 492.785C176.936 503.535 176.936 503.535 172.501 508.264C169.316 509.857 165.968 509.655 162.501 509.264C159.265 507.521 158.677 506.792 157.501 503.264C157.405 501.487 157.368 499.706 157.363 497.926C157.358 496.818 157.352 495.71 157.346 494.568C157.345 493.351 157.344 492.134 157.343 490.88C157.335 488.912 157.328 486.945 157.32 484.977C157.312 482.857 157.307 480.737 157.302 478.618C157.291 474.18 157.271 469.743 157.249 465.305C157.187 452.683 157.133 440.059 157.1 427.438C157.081 420.469 157.052 413.5 157.012 406.531C156.991 402.854 156.975 399.177 156.973 395.5C156.956 374.874 156.594 354.156 150.501 334.264C150.307 333.605 150.112 332.946 149.912 332.267C145.582 317.722 139.504 304.561 130.501 292.264C130.001 291.56 129.501 290.857 128.985 290.132C119.766 277.88 108.1 266.767 96.0825 257.339C92.4925 254.455 89.1425 251.337 85.7685 248.205C83.0565 245.689 80.3175 243.224 77.5005 240.826C58.5075 224.203 42.8205 203.067 40.2945 177.15C40.1135 173.505 40.2065 169.899 40.5005 166.264C39.8405 166.264 39.1805 166.264 38.5005 166.264C38.1295 167.44 37.7575 168.615 37.3755 169.826C36.0035 173.98 34.3785 177.98 32.6885 182.014C19.6855 213.939 16.9285 248.455 23.5005 282.264C23.7055 283.371 23.9105 284.48 24.1215 285.62C29.8615 312.039 46.3305 335.094 65.1175 353.882C66.4945 355.259 67.8565 356.651 69.1765 358.081C85.0605 375.028 108.1 389.006 130.148 396.15C134.945 397.772 137.998 399.681 141.501 403.264C142.534 406.703 142.278 409.773 141.501 413.264C139.439 415.889 139.439 415.889 136.501 417.264C112.542 418.969 81.7195 395.128 64.5005 380.264C63.7435 379.617 62.9875 378.97 62.2075 378.303C45.9995 364.078 32.2655 349.05 21.5005 330.264C21.1355 329.641 20.7705 329.017 20.3955 328.375C11.5945 313.222 5.52752 296.551 2.50052 279.264C2.29652 278.105 2.09352 276.947 1.88352 275.753C-7.02148 214.457 16.6115 155.859 52.4775 107.28C56.3245 102.135 60.3335 97.1535 64.5005 92.2645C65.4445 91.1465 66.3885 90.0275 67.3325 88.9095C77.4735 76.9375 88.1135 65.5595 99.1885 54.4525C99.9345 53.7015 99.9345 53.7015 100.696 52.9365C106.452 47.1575 112.303 41.5685 118.501 36.2645C120.046 34.8515 121.588 33.4355 123.126 32.0145C128.805 26.8855 134.817 22.2265 140.863 17.5425C143.161 15.7495 145.424 13.9135 147.689 12.0765C149.29 10.8025 150.894 9.5315 152.501 8.2645C153.441 7.5155 154.38 6.7665 155.349 5.9945C156.306 5.2585 157.264 4.5225 158.251 3.7645C159.112 3.0945 159.973 2.4235 160.86 1.7335C164.113 -0.0765007 165.826 -0.278501 169.501 0.264499Z"
                fill="currentColor" />
            </svg>
            <span class="docs-logo-text">Aether Notes</span>
            <span class="docs-logo-badge">Docs</span>
          </router-link>
        </div>

        <div class="docs-header-right">
          <button class="theme-toggle" @click="cycleTheme" :aria-label="`Switch theme (${settingsStore.theme})`">
            <svg v-if="settingsStore.theme === 'system'" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <rect width="20" height="14" x="2" y="3" rx="2" />
              <line x1="8" x2="16" y1="21" y2="21" />
              <line x1="12" x2="12" y1="17" y2="21" />
            </svg>
            <svg v-else-if="settingsStore.theme === 'dark'" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path
                d="M12 2v2M12 20v2m-7.07-14.07 1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2m-15.07 5.66-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          </button>
          <router-link to="/note" class="launch-btn">Launch App</router-link>
        </div>
      </div>
    </header>

    <!-- Layout -->
    <div class="docs-layout">

      <!-- Sidebar Nav -->
      <aside class="docs-sidebar font-ui" :class="{ 'is-open': sidebarOpen }">
        <nav>
          <div v-for="section in navSections" :key="section.label" class="nav-group">
            <span class="nav-group-label">{{ section.label }}</span>
            <a v-for="item in section.items" :key="item.id" :href="`#${item.id}`" class="nav-link"
              :class="{ active: activeSection === item.id }" @click.prevent="scrollTo(item.id)">{{ item.title }}</a>
          </div>
        </nav>
      </aside>

      <!-- Sidebar Backdrop -->
      <div v-if="sidebarOpen" class="sidebar-backdrop" @click="sidebarOpen = false"></div>

      <!-- Main Content -->
      <main class="docs-content">

        <!-- Introduction -->
        <section id="introduction" class="doc-section">
          <h1 class="doc-h1 font-display">Introduction</h1>
          <p class="doc-p">Aether Notes is a local-first, zero-knowledge encrypted note-taking workspace that runs
            entirely in your browser. No accounts, no servers, no cloud sync — your notes stay on your device, encrypted
            with a key that only you hold.</p>
          <p class="doc-p">Built with Vue 3, Tiptap, Pinia, and Dexie.js (IndexedDB), it's designed for writers,
            developers, and privacy-focused users who want the speed of a local app with the convenience of the web.</p>
          <div class="doc-callout info">
            <strong>Local-first means offline-first.</strong> Once installed as a PWA, Aether Notes works without any
            network connection.
          </div>
        </section>

        <hr class="doc-divider" />

        <!-- Getting Started -->
        <section id="getting-started" class="doc-section">
          <h2 class="doc-h2 font-display">Getting Started</h2>
          <p class="doc-p">You can use Aether Notes directly in the browser or run it locally from source.</p>

          <h3 id="web" class="doc-h3">Use in Browser</h3>
          <p class="doc-p">Navigate to the hosted app and click <strong>Launch Editor</strong>. No installation
            required. The app will prompt you to set up a vault passphrase on first launch.</p>

          <h3 id="local-setup" class="doc-h3">Run Locally</h3>
          <div class="doc-code-block">
            <div class="code-header font-ui">
              <span>bash</span>
              <button class="copy-btn"
                @click="copy('git clone https://github.com/joshuasarmiento/aethernotes.git\ncd aethernotes\nbun install\nbun run dev')">
                {{ copied ? 'Copied' : 'Copy' }}
              </button>
            </div>
            <pre class="code-body"><code>git clone https://github.com/joshuasarmiento/aethernotes.git
cd aethernotes
bun install
bun run dev</code></pre>
          </div>
          <p class="doc-p">The dev server runs at <code class="inline-code">http://localhost:5173</code>.</p>

          <h3 id="first-launch" class="doc-h3">First Launch</h3>
          <p class="doc-p">On your first visit, a passphrase setup dialog will appear. This passphrase is used to derive
            the AES-256-GCM encryption key for your vault. <strong>Write it down — it cannot be recovered if
              lost.</strong></p>
        </section>

        <hr class="doc-divider" />

        <!-- Editor -->
        <section id="editor" class="doc-section">
          <h2 class="doc-h2 font-display">Editor</h2>
          <p class="doc-p">The editor is powered by Tiptap and ProseMirror. It supports Markdown-style input rules and
            rich formatting via keyboard shortcuts and a contextual bubble menu.</p>

          <h3 id="slash-commands" class="doc-h3">Slash Commands</h3>
          <p class="doc-p">Type <code class="inline-code">/</code> on any line to open the formatting menu. Available
            block types:</p>
          <table class="doc-table">
            <thead>
              <tr>
                <th>Command</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code class="inline-code">/h1</code> or <code class="inline-code"># </code></td>
                <td>Heading 1</td>
              </tr>
              <tr>
                <td><code class="inline-code">/h2</code> or <code class="inline-code">## </code></td>
                <td>Heading 2</td>
              </tr>
              <tr>
                <td><code class="inline-code">/h3</code> or <code class="inline-code">### </code></td>
                <td>Heading 3</td>
              </tr>
              <tr>
                <td><code class="inline-code">- </code> or <code class="inline-code">* </code></td>
                <td>Bulleted list</td>
              </tr>
              <tr>
                <td><code class="inline-code">1. </code></td>
                <td>Numbered list</td>
              </tr>
              <tr>
                <td><code class="inline-code">[] </code></td>
                <td>Task / checkbox item</td>
              </tr>
            </tbody>
          </table>

          <h3 id="inline-formatting" class="doc-h3">Inline Formatting</h3>
          <table class="doc-table">
            <thead>
              <tr>
                <th>Shortcut</th>
                <th>Format</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code class="inline-code">**text**</code></td>
                <td>Bold</td>
              </tr>
              <tr>
                <td><code class="inline-code">_text_</code></td>
                <td>Italic</td>
              </tr>
              <tr>
                <td><code class="inline-code">~~text~~</code></td>
                <td>Strikethrough</td>
              </tr>
              <tr>
                <td><code class="inline-code">`text`</code></td>
                <td>Inline code</td>
              </tr>
              <tr>
                <td><code class="inline-code">==text==</code></td>
                <td>Highlight</td>
              </tr>
            </tbody>
          </table>

          <h3 id="tags" class="doc-h3">Inline Tags</h3>
          <p class="doc-p">Any word prefixed with <code class="inline-code">@</code> is treated as a tag (e.g. <code
              class="inline-code">@idea</code>, <code class="inline-code">@todo</code>). Tags are highlighted inline and
            collected in the sidebar tag list. Clicking a tag in the sidebar scrolls to its first occurrence in the
            editor.</p>

          <h3 id="outline" class="doc-h3">Document Outline</h3>
          <p class="doc-p">The collapsible right-hand panel indexes all H1–H3 headings in the current note and updates
            in real time. Click any heading to scroll to it. Toggle the panel with the outline icon in the top bar.</p>
        </section>

        <hr class="doc-divider" />

        <!-- Keyboard Shortcuts -->
        <section id="shortcuts" class="doc-section">
          <h2 class="doc-h2 font-display">Keyboard Shortcuts</h2>

          <h3 id="global-shortcuts" class="doc-h3">Global</h3>
          <table class="doc-table">
            <thead>
              <tr>
                <th>Shortcut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><kbd>Cmd/Ctrl + K</kbd></td>
                <td>Open Command Palette</td>
              </tr>
              <tr>
                <td><kbd>Cmd/Ctrl + N</kbd></td>
                <td>Create new note</td>
              </tr>
              <tr>
                <td><kbd>Escape</kbd></td>
                <td>Close palette / dialog</td>
              </tr>
            </tbody>
          </table>

          <h3 id="editor-shortcuts" class="doc-h3">Editor</h3>
          <table class="doc-table">
            <thead>
              <tr>
                <th>Shortcut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><kbd>Cmd/Ctrl + B</kbd></td>
                <td>Bold</td>
              </tr>
              <tr>
                <td><kbd>Cmd/Ctrl + I</kbd></td>
                <td>Italic</td>
              </tr>
              <tr>
                <td><kbd>Cmd/Ctrl + Shift + S</kbd></td>
                <td>Strikethrough</td>
              </tr>
              <tr>
                <td><kbd>Cmd/Ctrl + E</kbd></td>
                <td>Inline code</td>
              </tr>
              <tr>
                <td><kbd>Cmd/Ctrl + Z</kbd></td>
                <td>Undo</td>
              </tr>
              <tr>
                <td><kbd>Cmd/Ctrl + Shift + Z</kbd></td>
                <td>Redo</td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr class="doc-divider" />

        <!-- Security -->
        <section id="security" class="doc-section">
          <h2 class="doc-h2 font-display">Security & Encryption</h2>
          <p class="doc-p">Aether Notes uses a zero-knowledge encryption model. No plaintext ever leaves your device.
          </p>

          <h3 id="encryption-model" class="doc-h3">Encryption Model</h3>
          <div class="doc-steps">
            <div class="step">
              <div class="step-num">1</div>
              <div>
                <strong>Key Derivation</strong>
                <p>Your passphrase is processed through PBKDF2 with 100,000 iterations and a cryptographically random
                  salt stored locally. This produces a deterministic but brute-force-resistant hash.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <div>
                <strong>AES-256-GCM Key</strong>
                <p>The Web Crypto API imports the PBKDF2 hash as an AES-256-GCM encryption key. The key lives only
                  in-memory and is never written to IndexedDB or localStorage.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">3</div>
              <div>
                <strong>Encrypted Storage</strong>
                <p>Before saving, note content is encrypted with AES-256-GCM. The ciphertext, IV, and tag are stored in
                  IndexedDB. Without the correct passphrase, the database is unreadable.</p>
              </div>
            </div>
          </div>

          <div class="doc-callout warning">
            <strong>Passphrase loss = data loss.</strong> There are no recovery codes, backup servers, or master keys.
            Export your vault regularly if you need a backup.
          </div>

          <h3 id="passphrase-change" class="doc-h3">Changing Your Passphrase</h3>
          <p class="doc-p">Go to <strong>Settings → Security</strong>. Aether Notes will decrypt all notes with the
            current key, derive a new key from the new passphrase, re-encrypt every note in a single batch transaction,
            and replace the in-memory key. The old key is immediately discarded.</p>
        </section>

        <hr class="doc-divider" />

        <!-- Organization -->
        <section id="organization" class="doc-section">
          <h2 class="doc-h2 font-display">Organization</h2>

          <h3 id="folders" class="doc-h3">Folders</h3>
          <p class="doc-p">Create folders from the sidebar <strong>+</strong> button. Folders support unlimited nesting
            — drag and drop a folder onto another to reparent it. Right-click any folder to rename it, set a label
            color, add a subfolder, or delete it.</p>
          <div class="doc-callout info">
            Deleting a folder moves all its notes to <strong>Uncategorized</strong>. Notes are not deleted.
          </div>

          <h3 id="favorites" class="doc-h3">Favorites</h3>
          <p class="doc-p">Click the star icon on any note in the note list to pin it to the Favorites section at the
            top of the sidebar.</p>

          <h3 id="trash" class="doc-h3">Trash & Purge</h3>
          <p class="doc-p">Deleted notes go to Trash, where they are held for a configurable window before permanent
            removal. Configure the window in <strong>Settings → Preferences</strong>:</p>
          <table class="doc-table">
            <thead>
              <tr>
                <th>Option</th>
                <th>Behavior</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>7 days</td>
                <td>Purge notes trashed more than 7 days ago on next launch</td>
              </tr>
              <tr>
                <td>30 days (default)</td>
                <td>Purge notes trashed more than 30 days ago on next launch</td>
              </tr>
              <tr>
                <td>Never</td>
                <td>Notes stay in Trash until manually emptied</td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr class="doc-divider" />

        <!-- Command Palette -->
        <section id="command-palette" class="doc-section">
          <h2 class="doc-h2 font-display">Command Palette</h2>
          <p class="doc-p">Open with <kbd>Cmd/Ctrl + K</kbd>. The palette provides fuzzy search over note titles,
            bodies, and tags using Fuse.js. It also supports instant commands:</p>
          <table class="doc-table">
            <thead>
              <tr>
                <th>Command</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code class="inline-code">new note</code></td>
                <td>Creates a new note in the current folder</td>
              </tr>
              <tr>
                <td><code class="inline-code">toggle theme</code></td>
                <td>Cycles light / dark / system</td>
              </tr>
              <tr>
                <td><code class="inline-code">settings</code></td>
                <td>Opens the Settings panel</td>
              </tr>
              <tr>
                <td><code class="inline-code">trash</code></td>
                <td>Opens the Trash view</td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr class="doc-divider" />

        <!-- PWA -->
        <section id="pwa" class="doc-section">
          <h2 class="doc-h2 font-display">PWA & Offline</h2>
          <p class="doc-p">Aether Notes is a fully installable Progressive Web App. Once installed, it runs completely
            offline.</p>

          <h3 id="install-pwa" class="doc-h3">Installing</h3>
          <p class="doc-p">In Chrome or Edge, click the install icon in the address bar. On iOS Safari, tap
            <strong>Share → Add to Home Screen</strong>. On Android Chrome, tap the banner or use the browser menu.
          </p>

          <h3 id="offline" class="doc-h3">Offline Behavior</h3>
          <p class="doc-p">All app shell assets (HTML, JS, CSS, fonts) are pre-cached by the service worker on install.
            Data operations write to IndexedDB locally. There is no sync layer — every change is immediately persisted
            locally.</p>

          <h3 id="updates" class="doc-h3">Updates</h3>
          <p class="doc-p">The service worker is configured with <code
              class="inline-code">registerType: 'autoUpdate'</code>. New versions activate in the background and take
            effect on the next page load.</p>
        </section>

        <hr class="doc-divider" />

        <!-- Architecture -->
        <section id="architecture" class="doc-section">
          <h2 class="doc-h2 font-display">Architecture</h2>

          <h3 id="stack" class="doc-h3">Tech Stack</h3>
          <table class="doc-table">
            <thead>
              <tr>
                <th>Layer</th>
                <th>Technology</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Framework</td>
                <td>Vue 3 (Composition API)</td>
                <td>Reactive UI, component tree</td>
              </tr>
              <tr>
                <td>Editor</td>
                <td>Tiptap + ProseMirror</td>
                <td>Rich text engine and extensions</td>
              </tr>
              <tr>
                <td>State</td>
                <td>Pinia</td>
                <td>Global stores: notes, folders, settings, UI</td>
              </tr>
              <tr>
                <td>Database</td>
                <td>Dexie.js (IndexedDB)</td>
                <td>Local persistent storage with schema versioning</td>
              </tr>
              <tr>
                <td>Crypto</td>
                <td>Web Crypto API</td>
                <td>PBKDF2 key derivation and AES-256-GCM encryption</td>
              </tr>
              <tr>
                <td>Search</td>
                <td>Fuse.js</td>
                <td>Client-side fuzzy search</td>
              </tr>
              <tr>
                <td>PWA</td>
                <td>vite-plugin-pwa</td>
                <td>Service worker and manifest generation</td>
              </tr>
              <tr>
                <td>Build</td>
                <td>Vite + Bun</td>
                <td>Bundler and package runtime</td>
              </tr>
            </tbody>
          </table>

          <h3 id="storage" class="doc-h3">Why IndexedDB?</h3>
          <p class="doc-p">Aether Notes uses IndexedDB via Dexie.js rather than alternatives like OPFS, localStorage, or
            SQLite-WASM:</p>
          <ul class="doc-list">
            <li><strong>vs localStorage</strong> — 5MB limit, synchronous (blocks main thread), no query support.</li>
            <li><strong>vs OPFS</strong> — File-oriented, no relational queries, compound indexing, or built-in
              migrations.</li>
            <li><strong>vs SQLite-WASM</strong> — Ships a 1–2MB binary, hurts cold load times, and still relies on
              IndexedDB or OPFS under the hood.</li>
            <li><strong>Dexie.js</strong> — ~20KB wrapper, promise-based API, reactive live queries, compound indices,
              and seamless schema migrations.</li>
          </ul>

          <h3 id="search-limits" class="doc-h3">Search Scaling</h3>
          <p class="doc-p">Fuse.js performs well up to ~5,000 notes (well under 16ms per query). Beyond that, the plan
            is to move search into a Web Worker or use a Dexie full-text index approach.</p>
        </section>

        <hr class="doc-divider" />

        <!-- Contributing -->
        <section id="contributing" class="doc-section">
          <h2 class="doc-h2 font-display">Contributing</h2>
          <p class="doc-p">Aether Notes welcomes contributions. See <a class="doc-link"
              href="https://github.com/joshuasarmiento/aethernotes/blob/main/CONTRIBUTING.md" target="_blank"
              rel="noopener">CONTRIBUTING.md</a> for the full guide.</p>

          <h3 id="commits" class="doc-h3">Commit Convention</h3>
          <p class="doc-p">All commits must follow <a class="doc-link" href="https://www.conventionalcommits.org/"
              target="_blank" rel="noopener">Conventional Commits</a>:</p>
          <div class="doc-code-block">
            <div class="code-header font-ui"><span>examples</span></div>
            <pre class="code-body"><code>feat: add export to markdown
fix: resolve drag-and-drop bubble bug
docs: update PWA offline behavior
chore: bump Tiptap to v2.5</code></pre>
          </div>

          <h3 id="pr-checklist" class="doc-h3">PR Checklist</h3>
          <ul class="doc-list">
            <li>Branch from <code class="inline-code">main</code> using <code class="inline-code">feat/</code>, <code
                class="inline-code">fix/</code>, or <code class="inline-code">docs/</code> prefix</li>
            <li>Follow the PR template in <code class="inline-code">.github/pull_request_template.md</code></li>
            <li>Ensure <code class="inline-code">bun run build</code> passes with no type errors</li>
            <li>Include tests for any new store logic or crypto utilities</li>
          </ul>

          <h3 id="license" class="doc-h3">License</h3>
          <p class="doc-p">Aether Notes is open source under the <a class="doc-link"
              href="https://github.com/joshuasarmiento/aethernotes/blob/main/LICENSE" target="_blank" rel="noopener">MIT
              License</a>.</p>
        </section>

      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import { useTheme } from '@/composables/useTheme';

const settingsStore = useSettingsStore();
useTheme();

const sidebarOpen = ref(false);
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

function cycleTheme() {
  const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
  const nextIdx = (themes.indexOf(settingsStore.theme) + 1) % themes.length;
  settingsStore.setSetting('theme', themes[nextIdx]);
}

// Copy to clipboard
const copied = ref(false);
function copy(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 1800);
  });
}

// Active section tracking
const activeSection = ref('introduction');

const navSections = [
  {
    label: 'Overview',
    items: [
      { id: 'introduction', title: 'Introduction' },
      { id: 'getting-started', title: 'Getting Started' },
    ],
  },
  {
    label: 'Using Aether',
    items: [
      { id: 'editor', title: 'Editor' },
      { id: 'shortcuts', title: 'Keyboard Shortcuts' },
      { id: 'command-palette', title: 'Command Palette' },
      { id: 'organization', title: 'Organization' },
    ],
  },
  {
    label: 'Security',
    items: [
      { id: 'security', title: 'Encryption Model' },
    ],
  },
  {
    label: 'Platform',
    items: [
      { id: 'pwa', title: 'PWA & Offline' },
      { id: 'architecture', title: 'Architecture' },
    ],
  },
  {
    label: 'Contributing',
    items: [
      { id: 'contributing', title: 'Contributing' },
    ],
  },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    activeSection.value = id;
    sidebarOpen.value = false;
  }
}

// Intersection observer for active section
let observer: IntersectionObserver | null = null;

onMounted(() => {
  document.body.style.overflow = 'auto';
  document.body.style.height = 'auto';

  const sections = document.querySelectorAll('.doc-section');
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
  );
  sections.forEach((s) => observer!.observe(s));
});

onUnmounted(() => {
  document.body.style.overflow = 'hidden';
  document.body.style.height = '100vh';
  observer?.disconnect();
});
</script>

<style scoped>
.docs-page {
  background: var(--bg);
  color: var(--text-primary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ── Header ── */
.docs-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--topbar-height);
  background: var(--bg);
  border-bottom: 1px solid var(--border-subtle);
  z-index: 100;
}

.docs-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

@media (min-width: 769px) {
  .docs-header-inner {
    padding: 0 var(--space-lg);
  }
}

.docs-logo-container {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.sidebar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
}

@media (min-width: 769px) {
  .sidebar-toggle {
    display: none;
  }
}

.docs-logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  text-decoration: none;
  color: var(--text-primary);
}

.logo-icon {
  color: var(--text-primary);
  flex-shrink: 0;
}

.docs-logo-text {
  font-size: 14px;
  font-weight: 500;
  font-family: 'Instrument Serif', Georgia, serif;
}

.docs-logo-badge {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 2px 6px;
  font-family: 'DM Mono', monospace;
}

.docs-header-right {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  transition: color var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out);
}

.theme-toggle:hover {
  color: var(--text-primary);
  background: var(--hover-bg);
}

.launch-btn {
  text-decoration: none;
  background: var(--text-primary);
  color: var(--bg);
  padding: 6px 14px;
  border-radius: var(--radius);
  font-size: 11px;
  font-weight: 500;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.launch-btn:hover {
  opacity: 0.8;
}

/* ── Layout ── */
.docs-layout {
  display: block;
  width: 100%;
  padding-top: var(--topbar-height);
  flex: 1;
}

@media (min-width: 769px) {
  .docs-layout {
    display: flex;
    max-width: 1280px;
    margin: 0 auto;
  }
}

/* ── Sidebar ── */
.docs-sidebar {
  position: fixed;
  top: var(--topbar-height);
  left: 0;
  bottom: 0;
  width: 260px;
  z-index: 1000;
  background: var(--bg);
  transform: translateX(-100%);
  transition: transform var(--duration-base) var(--ease-out);
  border-right: 1px solid var(--border-subtle);
  padding: var(--space-lg);
  height: calc(100vh - var(--topbar-height));
  overflow-y: auto;
}

.docs-sidebar.is-open {
  transform: translateX(0);
}

@media (min-width: 769px) {
  .docs-sidebar {
    position: sticky;
    top: var(--topbar-height);
    transform: none;
    width: 220px;
    height: calc(100vh - var(--topbar-height));
    padding: var(--space-xl) var(--space-md) var(--space-2xl);
    border-right: 1px solid var(--border-subtle);
    z-index: auto;
  }
}

.sidebar-backdrop {
  position: fixed;
  top: var(--topbar-height);
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 999;
}

@media (min-width: 769px) {
  .sidebar-backdrop {
    display: none;
  }
}

.nav-group {
  margin-bottom: var(--space-lg);
}

.nav-group-label {
  display: block;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  color: var(--text-muted);
  font-weight: 600;
  padding: 0 var(--space-sm);
  margin-bottom: var(--space-xs);
}

.nav-link {
  display: block;
  font-size: 12px;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 5px var(--space-sm);
  border-radius: var(--radius);
  transition: color var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out);
  cursor: pointer;
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--hover-bg);
}

.nav-link.active {
  color: var(--text-primary);
  background: var(--accent-subtle);
  font-weight: 500;
}

/* ── Content ── */
.docs-content {
  width: 100%;
  padding: var(--space-md) var(--space-lg) var(--space-2xl);
}

@media (min-width: 769px) {
  .docs-content {
    flex: 1;
    min-width: 0;
    padding: var(--space-xl) var(--space-2xl);
    max-width: 780px;
  }
}

.doc-section {
  padding-top: var(--space-lg);
  margin-bottom: var(--space-lg);
  scroll-margin-top: calc(var(--topbar-height) + 24px);
}

.doc-divider {
  border: none;
  border-top: 1px solid var(--border-subtle);
  margin: var(--space-2xl) 0 0;
}

.doc-h1 {
  font-size: 32px;
  font-weight: normal;
  letter-spacing: -0.5px;
  margin-bottom: var(--space-md);
  color: var(--text-primary);
}

.doc-h2 {
  font-size: 24px;
  font-weight: normal;
  letter-spacing: -0.3px;
  margin-bottom: var(--space-md);
  color: var(--text-primary);
}

.doc-h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin: var(--space-lg) 0 var(--space-sm);
  font-family: 'DM Mono', monospace;
  letter-spacing: -0.1px;
}

.doc-p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: var(--space-md);
  font-family: 'DM Mono', monospace;
}

.doc-list {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.doc-list li {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.7;
  padding-left: var(--space-md);
  position: relative;
  font-family: 'DM Mono', monospace;
}

.doc-list li::before {
  content: '–';
  position: absolute;
  left: 0;
  color: var(--text-muted);
}

.doc-link {
  color: var(--text-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: var(--border);
  transition: text-decoration-color var(--duration-fast) var(--ease-out);
}

.doc-link:hover {
  text-decoration-color: var(--text-primary);
}

/* ── Callout ── */
.doc-callout {
  border-radius: var(--radius);
  padding: var(--space-md);
  font-size: 12px;
  line-height: 1.65;
  margin: var(--space-md) 0;
  font-family: 'DM Mono', monospace;
}

.doc-callout.info {
  background: var(--accent-subtle);
  /* border-left: 3px solid var(--accent); */
  color: var(--text-primary);
}

.doc-callout.warning {
  background: rgba(217, 115, 13, 0.06);
  /* border-left: 3px solid var(--notion-orange); */
  color: var(--text-primary);
}

/* ── Table ── */
.doc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  margin: var(--space-md) 0;
  font-family: 'DM Mono', monospace;
}

.doc-table th {
  text-align: left;
  padding: var(--space-sm) var(--space-md);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  font-weight: 600;
  border-bottom: 1px solid var(--border);
}

.doc-table td {
  padding: var(--space-sm) var(--space-md);
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
  line-height: 1.5;
}

.doc-table tr:last-child td {
  border-bottom: none;
}

.doc-table tr:hover td {
  background: var(--hover-bg);
}

/* ── Code ── */
.inline-code {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  background: var(--accent-subtle);
  color: var(--text-primary);
  padding: 1px 5px;
  border-radius: 3px;
  border: 1px solid var(--border);
}

.doc-code-block {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin: var(--space-md) 0;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-sunken);
  padding: var(--space-sm) var(--space-md);
  font-size: 10px;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.copy-btn {
  font-size: 10px;
  font-family: 'DM Mono', monospace;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 2px 8px;
  border-radius: 3px;
  cursor: pointer;
  transition: color var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out);
}

.copy-btn:hover {
  color: var(--text-primary);
  background: var(--hover-bg);
}

.code-body {
  margin: 0;
  padding: var(--space-md);
  background: var(--bg-elevated);
  overflow-x: auto;
}

.code-body code {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  color: var(--text-primary);
  line-height: 1.7;
}

/* ── Steps ── */
.doc-steps {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin: var(--space-md) 0;
}

.step {
  display: flex;
  gap: var(--space-md);
  align-items: flex-start;
}

.step-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--text-primary);
  color: var(--bg);
  font-size: 11px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: 'DM Mono', monospace;
  margin-top: 2px;
}

.step strong {
  display: block;
  font-size: 13px;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
  font-family: 'DM Mono', monospace;
}

.step p {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.65;
  margin: 0;
  font-family: 'DM Mono', monospace;
}

/* ── kbd ── */
kbd {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  background: var(--bg-sunken);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 2px 6px;
  color: var(--text-primary);
  white-space: nowrap;
}
</style>
