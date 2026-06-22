"use client";

import dynamic from 'next/dynamic';

const ReportMap = dynamic(() => import('@/app/components/ReportMap'), { ssr: false });

export default function ReportMapWrapper() {
  return <ReportMap />;
}
