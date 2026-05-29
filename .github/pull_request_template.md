## Description
Please describe the changes proposed in this Pull Request, detailing what was fixed, improved, or added. Include visual assets (screenshots or recordings) for any UI/UX adjustments.

Fixes # (issue reference)

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Verification Checklist

### Automated Verification
- [ ] Run `bun run build` completed successfully with zero type errors.
- [ ] Tests executed successfully (`bun run test` / vitest / playwright).

### Manual Verification
- [ ] UI visual style checked across Light Mode (Notion theme) and Dark Mode (Obsidian theme).
- [ ] Encryption flow tested (lock/unlock behavior works correctly).
- [ ] PWA offline functionality verified (notes editable when airplane mode is toggled).
- [ ] Accessibility: Checked keyboard focus states and screen reader tags.

### Code Standards
- [ ] Commits follow Conventional Commits format.
- [ ] Hardcoded hex colors avoided (mapped to custom properties in `tokens.css`).
- [ ] Code written using Vue 3 Composition API (`<script setup lang="ts">`).
