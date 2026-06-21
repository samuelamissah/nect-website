"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function TiptapEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] px-4 py-3 outline-none prose prose-slate max-w-none",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border border-slate-300 rounded-lg overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-300 p-2 flex flex-wrap gap-1">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className="px-2 py-1 hover:bg-slate-200 rounded font-bold">B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className="px-2 py-1 hover:bg-slate-200 rounded italic">I</button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className="px-2 py-1 hover:bg-slate-200 rounded underline">U</button>
        <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className="px-2 py-1 hover:bg-slate-200 rounded text-xs">P</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="px-2 py-1 hover:bg-slate-200 rounded text-xs font-bold">H1</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="px-2 py-1 hover:bg-slate-200 rounded text-xs font-bold">H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className="px-2 py-1 hover:bg-slate-200 rounded text-xs">List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className="px-2 py-1 hover:bg-slate-200 rounded text-xs">1. List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className="px-2 py-1 hover:bg-slate-200 rounded text-xs">Quote</button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}