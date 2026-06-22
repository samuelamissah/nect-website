"use client";

import { useEffect, useState } from "react";
import { getQueuedReports, removeQueuedReport } from '@/app/lib/offlineQueue';
import { supabase } from '@/app/lib/supabase';

export default function QueueProcessor() {
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    async function tryFlush() {
      if (!navigator.onLine) return;
      if (processing) return;
      setProcessing(true);
      try {
        const items = await getQueuedReports();
        for (const item of items) {
          try {
            // upload as normal
            const { error } = await supabase.from('reports').insert({
              reference: item.reference,
              report_type: item.report_type,
              anonymous: item.anonymous,
              full_name: item.full_name,
              phone: item.phone,
              email: item.email,
              location: item.location,
              description: item.description,
              photo_url: item.photo_url,
              status: 'Submitted'
            });

            if (!error) {
              await removeQueuedReport(item.id);
            }
          } catch (e) {
            // leave in queue and continue
            console.error('Queue flush item failed', e);
          }
        }
      } finally {
        setProcessing(false);
      }
    }

    tryFlush();

    window.addEventListener('online', tryFlush);
    return () => window.removeEventListener('online', tryFlush);
  }, [processing]);

  if (!processing) return null;
  return (
    <div aria-live="polite" className="fixed bottom-6 right-6 z-50 rounded-lg bg-slate-900/80 px-4 py-2 text-sm text-white">
      Syncing queued reports...
    </div>
  );
}
