"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Import Leaflet dynamically to avoid SSR issues
const Map = dynamic(() => import('react-leaflet').then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), { ssr: false });
const MarkerClusterGroup = dynamic(() => import('react-leaflet-cluster').then((m) => m.default), { ssr: false });

import 'leaflet/dist/leaflet.css';

export default function ReportMap({ reports }: { reports?: any[] }) {
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    setLeafletLoaded(true);
  }, []);

  if (!leafletLoaded) return <div className="h-96 w-full rounded-lg bg-slate-100" />;

  return (
    <div className="rounded-lg overflow-hidden">
      <Map center={[5.6037, -0.1870]} zoom={12} style={{ height: 480, width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {reports && (
          <MarkerClusterGroup>
            {reports.map((r) => (
              r.lat && r.lng && (
                <Marker key={r.id} position={[r.lat, r.lng]}>
                  <Popup>
                    <div className="max-w-xs">
                      <h4 className="font-bold">{r.report_type}</h4>
                      <p className="text-sm text-slate-600">{r.location}</p>
                      <p className="mt-2 text-xs text-slate-500">{new Date(r.created_at).toLocaleString()}</p>
                    </div>
                  </Popup>
                </Marker>
              )
            ))}
          </MarkerClusterGroup>
        )}
      </Map>
    </div>
  );
}
