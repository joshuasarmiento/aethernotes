# Contributing to Aether Notes

First off, thank you for taking the time to contribute! Contributions make the open-source community an amazing place to learn, inspire, and create.

Please read our guidelines below to ensure a smooth contribution process.

---

## ✦ Code of Conduct

By participating in this project, you agree to abide by the **Contributor Covenant Code of Conduct** (v2.1). Please report any unacceptable behavior to the project maintainers.

---

## ✦ Conventional Commits

We enforce Conventional Commits guidelines to keep our git history clean and automate changelog generation. Commits must follow this format:

```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Allowed Types
- **feat**: A new feature (e.g., `feat(sidebar): add daily note shortcut button`)
- **fix**: A bug fix (e.g., `fix(editor): prevent cursor jumping on note load`)
- **docs**: Documentation updates (e.g., `docs: add testing strategy to readme`)
- **style**: Changes that do not affect the meaning of the code (formatting, white-space, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Build process or auxiliary tool/library changes

### Tooling Enforced
We use `commitlint` and `husky` hooks. When you commit, git will run checks to verify your commit messages meet this convention. If they do not, the commit will be rejected.

---

## ✦ Local Development Workflow

1. **Fork the Repository** and clone it locally.
2. **Create a Feature Branch**:
   - For new features: `feature/your-feature-name`
   - For bug fixes: `bugfix/issue-description`
3. **Install Dependencies**:
   ```bash
   bun install
   ```
4. **Develop and Test**:
   - Run the development server: `bun run dev`
   - Make edits, respecting our coding standards.
5. **Run Verification checks**:
   Before pushing, ensure your code compiles with no TypeScript warnings or bundler errors:
   ```bash
   bun run build
   ```

---

## ✦ Coding Standards & Architecture

*   **Vue 3 Composition API**: Use `<script setup lang="ts">` exclusively.
*   **Design Tokens & CSS Variables**: Do not write hardcoded color values. Map component colors to design tokens inside `src/assets/styles/tokens.css` to ensure full Light/Dark theme responsiveness.
*   **IndexedDB & Stores**: All data interactions must flow through Pinia stores (`notes`, `folders`, `settings`) which synchronize state with **Dexie.js**. Do not query Dexie directly from layout components.
*   **Zero-Knowledge Encryption**: Ensure that notes are encrypted in the store layer before hitting IndexedDB. Decrypted values should never be stored on the disk.

---

## ✦ Pull Request Checklist

Before submitting a Pull Request, please ensure the following checklist is completed:

- [ ] Branch is up-to-date with `main`.
- [ ] Commits follow Conventional Commits guidelines.
- [ ] Code builds without errors (`bun run build`).
- [ ] Code styles match the project styling guide.
- [ ] You have added tests for new features or bug fixes.
- [ ] ARIA attributes and keyboard shortcuts have been tested for accessibility.
- [ ] You have filled out the Pull Request template.
