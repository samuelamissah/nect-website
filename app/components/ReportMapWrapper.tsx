"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

const ReportMap = dynamic(() => import("@/app/components/ReportMap"), {
  ssr: false,
  loading: () => <div className="h-[480px] w-full rounded-lg bg-slate-100" />,
});

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ReportMapWrapper() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    async function fetchReports() {
      const { data, error } = await supabase
        .from("reports")
        .select("id, reference, report_type, location, status, lat, lng, created_at")
        .not("lat", "is", null)
        .not("lng", "is", null)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) {
        console.error("Map reports error:", error);
        return;
      }

      setReports(data || []);
    }

    fetchReports();
  }, []);

  return <ReportMap reports={reports} />;
}