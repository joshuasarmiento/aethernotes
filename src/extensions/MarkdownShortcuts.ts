import { Extension, markInputRule } from '@tiptap/core';

// Input rule for highlight: ==text== -> highlight mark
export const inputRuleHighlight = /==([^=]+)==$/;

export const MarkdownShortcuts = Extension.create({
  name: 'markdownShortcuts',

  addInputRules() {
    return [
      markInputRule({
        find: inputRuleHighlight,
        type: this.editor.schema.marks.highlight,
      }),
    ];
  },
});

export default MarkdownShortcuts;
