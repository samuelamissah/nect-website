"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getQueuedReports, removeQueuedReport } from "@/app/lib/offlineQueue";
import { supabase } from "@/app/lib/supabase";

export default function QueueProcessor() {
  const [processing, setProcessing] = useState(false);
  const processingRef = useRef(false);

  const tryFlush = useCallback(async () => {
    if (!navigator.onLine) return;
    if (processingRef.current) return;

    const items = await getQueuedReports();
    if (!items.length) return;

    processingRef.current = true;
    setProcessing(true);

    try {
      for (const item of items) {
        const { error } = await supabase.from("reports").insert({
          reference: item.reference,
          report_type: item.report_type,
          anonymous: item.anonymous,
          full_name: item.full_name,
          phone: item.phone,
          email: item.email,
          location: item.location,
          description: item.description,
          photo_url: item.photo_url,
          status: "Submitted",
          lat: item.lat,
          lng: item.lng,
        });

        if (!error) {
          await removeQueuedReport(item.id);
        }
      }
    } catch (e) {
      console.error("Queue flush failed", e);
    } finally {
      processingRef.current = false;
      setProcessing(false);
    }
  }, []);

  useEffect(() => {
    // Schedule initial flush to avoid synchronous setState in effect
    queueMicrotask(() => {
      tryFlush();
    });

    window.addEventListener("online", tryFlush);
    return () => window.removeEventListener("online", tryFlush);
  }, [tryFlush]);

  if (!processing) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 rounded-lg bg-slate-900/80 px-4 py-2 text-sm text-white"
    >
      Syncing queued reports...
    </div>
  );
}