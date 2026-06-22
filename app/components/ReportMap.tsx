"use client";

import * as ReactLeaflet from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* eslint-disable @typescript-eslint/no-explicit-any */

const MapContainer: any = ReactLeaflet.MapContainer;
const TileLayer: any = ReactLeaflet.TileLayer;
const Marker: any = ReactLeaflet.Marker;
const Popup: any = ReactLeaflet.Popup;

const createStatusIcon = (color: string) =>
  new L.DivIcon({
    className: "custom-status-marker",
    html: `
      <div style="
        background:${color};
        width:18px;
        height:18px;
        border-radius:9999px;
        border:3px solid white;
        box-shadow:0 4px 10px rgba(0,0,0,.35);
      "></div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10],
  });

const icons = {
  submitted: createStatusIcon("#f59e0b"),
  progress: createStatusIcon("#2563eb"),
  resolved: createStatusIcon("#10b981"),
  rejected: createStatusIcon("#ef4444"),
};

function getStatusIcon(status?: string) {
  const s = String(status || "").toLowerCase();

  if (s.includes("resolved") || s.includes("closed")) return icons.resolved;
  if (s.includes("progress") || s.includes("assigned") || s.includes("inspection")) return icons.progress;
  if (s.includes("rejected") || s.includes("invalid")) return icons.rejected;

  return icons.submitted;
}

function getStatusBadge(status?: string) {
  const s = String(status || "Submitted");
  const lower = s.toLowerCase();

  if (lower.includes("resolved") || lower.includes("closed")) {
    return <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">{s}</span>;
  }

  if (lower.includes("progress") || lower.includes("assigned") || lower.includes("inspection")) {
    return <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700">{s}</span>;
  }

  if (lower.includes("rejected") || lower.includes("invalid")) {
    return <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-700">{s}</span>;
  }

  return <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-700">{s}</span>;
}

export default function ReportMapClient({ reports }: { reports?: any[] }) {
  const validReports =
    reports?.filter((r) => Number(r.lat) && Number(r.lng)) || [];

  const center: [number, number] =
    validReports.length > 0
      ? [Number(validReports[0].lat), Number(validReports[0].lng)]
      : [5.6037, -0.187];


      const spreadReports = validReports.map((r, index) => {
  const sameLocationCount = validReports.filter(
    (x) => Number(x.lat) === Number(r.lat) && Number(x.lng) === Number(r.lng)
  ).length;

  if (sameLocationCount <= 1) return r;

  const angle = index * 45;
  const offset = 0.00008;

  return {
    ...r,
    mapLat: Number(r.lat) + Math.sin(angle) * offset,
    mapLng: Number(r.lng) + Math.cos(angle) * offset,
  };
});

  return (
    <div className="relative z-0 h-[480px] w-full rounded-lg overflow-hidden border border-slate-200">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {spreadReports.map((r) => (
          <Marker
            key={r.id}
            position={[Number(r.mapLat || r.lat), Number(r.mapLng || r.lng)]}
            icon={getStatusIcon(r.status)}
          >
            <Popup>
              <div className="min-w-[220px] max-w-xs">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h4 className="font-bold text-slate-900">{r.report_type}</h4>
                  {getStatusBadge(r.status)}
                </div>

                <p className="border-b border-slate-100 pb-2 text-sm text-slate-600">
                  {r.location}
                </p>

                <p className="mt-2 text-xs font-mono text-slate-500">
                  Ref: {r.reference || "N/A"}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {new Date(r.created_at).toLocaleString()}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {validReports.length === 0 && (
        <div className="absolute inset-0 z-[500] flex items-center justify-center bg-white/80 text-sm font-semibold text-slate-500">
          No reports with map coordinates yet.
        </div>
      )}
    </div>
  );
}