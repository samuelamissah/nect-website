"use client";

import dynamic from "next/dynamic";

const InfrastructureScene = dynamic(() => import("./InfrastructureScene"), {
  ssr: false,
});

export default function Hero3D() {
  return (
    <div className="h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
      <InfrastructureScene />
    </div>
  );
}