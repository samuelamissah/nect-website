"use client";

import dynamic from 'next/dynamic';

const QueueProcessor = dynamic(() => import('@/app/components/QueueProcessor'), { ssr: false });

export default function QueueProcessorWrapper() {
  return <QueueProcessor />;
}
