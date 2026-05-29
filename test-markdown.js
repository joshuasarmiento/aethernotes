import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Markdown } from 'tiptap-markdown';
import { createLowlight, common } from 'lowlight';

const lowlight = createLowlight(common);

const editor = new Editor({
  extensions: [
    StarterKit.configure({ codeBlock: false }),
    CodeBlockLowlight.configure({ lowlight }),
    Markdown
  ],
  content: '```javascript\nconsole.log(1);\n```'
});

console.log(editor.storage.markdown.getMarkdown());
