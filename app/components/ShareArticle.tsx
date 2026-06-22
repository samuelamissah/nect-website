"use client";

import { useState } from 'react';
import { Copy, Share } from 'lucide-react';
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ShareArticle({ url, title }: { url: string; title?: string }) {
  const [copied, setCopied] = useState(false);

  async function doShare() {
    if ((navigator as any).share) {
      try {
        await (navigator as any).share({ title, url });
      } catch (e) {
        console.warn('Share failed', e);
      }
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button onClick={doShare} className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50">
        <Share className="inline-block mr-2 -mt-1" /> Share
      </button>
      <button onClick={copyLink} className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50">
        <Copy className="inline-block mr-2 -mt-1" /> {copied ? 'Copied' : 'Copy link'}
      </button>
    </div>
  );
}
