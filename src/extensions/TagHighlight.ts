import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

export const TagHighlight = Extension.create({
  name: 'tagHighlight',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('tagHighlight'),
        state: {
          init(_, { doc }) {
            return findTags(doc);
          },
          apply(tr, oldState) {
            if (tr.docChanged) {
              return findTags(tr.doc);
            }
            return oldState.map(tr.mapping, tr.doc);
          }
        },
        props: {
          decorations(state) {
            return this.getState(state);
          }
        }
      })
    ];
  }
});

function findTags(doc: any): DecorationSet {
  const decorations: Decoration[] = [];

  doc.descendants((node: any, pos: number) => {
    // Highlight tags only in normal textblocks, skipping code blocks
    if (node.isTextblock && node.type.name !== 'codeBlock' && node.type.name !== 'codeBlockLowlight') {
      const text = node.textContent;
      const regex = /(?:^|\s)(@([a-zA-Z][a-zA-Z0-9_-]*))/g;
      let match;
      while ((match = regex.exec(text)) !== null) {
        const fullMatch = match[1];
        const tagText = match[2];
        const leadingSpace = match[0].match(/^\s/) ? match[0].match(/^\s/)![0].length : 0;
        
        // start position relative to textblock node offset
        const start = pos + match.index + leadingSpace + 1; // +1 to offset standard node boundaries
        const end = start + fullMatch.length;

        decorations.push(
          Decoration.inline(start, end, {
            class: 'inline-tag-highlight',
            'data-tag': tagText.toLowerCase()
          })
        );
      }
    }
  });

  return DecorationSet.create(doc, decorations);
}

export default TagHighlight;
