"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { v4 as uuidv4 } from 'uuid';
import { addQueuedReport } from '@/app/lib/offlineQueue';
import { Loader2, CheckCircle2, User, UserX, Camera, MapPin, AlignLeft, Info, Crosshair, Search } from "lucide-react";
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ReportForm() {
  const [activeTab, setActiveTab] = useState<"submit" | "track">("submit");
  const [anonymous, setAnonymous] = useState(true);
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  
  // Tracking state
  const [trackRef, setTrackRef] = useState("");
  const [trackResult, setTrackResult] = useState<any>(null);
  const [trackLoading, setTrackLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const locationInput = document.querySelector('input[name="location"]') as HTMLInputElement;
          
          if (locationInput) {
            locationInput.value = "Fetching address...";
            try {
              const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
              const data = await response.json();
              if (data && data.display_name) {
                const address = data.address;
                const shortAddress = [
                  address.road, 
                  address.suburb || address.neighbourhood, 
                  address.city || address.town || address.village, 
                  address.state
                ].filter(Boolean).join(", ");
                
                locationInput.value = shortAddress || data.display_name;
              } else {
                locationInput.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
              }
            } catch (err) {
              locationInput.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
            }
          }
          setLocationLoading(false);
        },
        (error) => {
          alert("Could not get location. Please ensure location services are enabled.");
          setLocationLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackRef) return;
    setTrackLoading(true);
    setTrackResult(null);
    
    const { data, error } = await supabase
      .from("reports")
      .select("reference, status, created_at, report_type")
      .eq("reference", trackRef)
      .single();
      
    if (error || !data) {
      setTrackResult({ error: "Report not found. Please check your reference code." });
    } else {
      setTrackResult(data);
    }
    setTrackLoading(false);
  };

  async function submitReport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const file = form.get("photo") as File | null;

    let photoUrl = "";

    if (file && file.size > 0) {
      const uploadName = `reports/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("nect-media")
        .upload(uploadName, file);

      if (uploadError) {
        alert("Image Upload Error: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data } = supabase.storage
        .from("nect-media")
        .getPublicUrl(uploadName);

      photoUrl = data.publicUrl;
    }

    const ref = `NECT-${new Date().getFullYear()}-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    // If offline, queue the report locally and return success to user
    if (!navigator.onLine) {
      const queued = {
        id: uuidv4(),
        reference: ref,
        report_type: form.get("report_type"),
        anonymous,
        full_name: anonymous ? null : form.get("full_name"),
        phone: anonymous ? null : form.get("phone"),
        email: anonymous ? null : form.get("email"),
        location: form.get("location"),
        description: form.get("description"),
        photo_url: photoUrl,
        status: 'Queued',
        created_at: new Date().toISOString()
      };

      try {
        await addQueuedReport(queued);
        setReference(ref);
        setFileName(null);
        try { (event.target as HTMLFormElement).reset(); } catch (e) {}
      } catch (err) {
        alert('Failed to queue report offline: ' + String(err));
      }
    } else {
      const { error } = await supabase.from("reports").insert({
        reference: ref,
        report_type: form.get("report_type"),
        anonymous,
        full_name: anonymous ? null : form.get("full_name"),
        phone: anonymous ? null : form.get("phone"),
        email: anonymous ? null : form.get("email"),
        location: form.get("location"),
        description: form.get("description"),
        photo_url: photoUrl,
        status: 'Submitted'
      });

      if (error) {
        alert(error.message);
      } else {
      // Trigger email notification if user provided an email
      if (!anonymous && form.get("email")) {
        try {
          await fetch('/api/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'submission',
              email: form.get("email"),
              name: form.get("full_name"),
              reference: ref,
              report_type: form.get("report_type")
            })
          });
        } catch (err) {
          console.error("Failed to send email notification", err);
        }
      }
      
        setReference(ref);
        setFileName(null);
        try { (event.target as HTMLFormElement).reset(); } catch (e) {}
      }
    }

    setLoading(false);
  }

  if (reference) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in-95 duration-500">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Report Submitted Successfully</h2>
        <p className="mt-4 text-lg text-slate-600 max-w-md mx-auto">
          Thank you for helping protect Ghana&apos;s infrastructure. Please save your tracking reference below:
        </p>
        <div className="mt-8 rounded-2xl bg-slate-900 p-6 shadow-xl w-full max-w-sm border border-slate-800">
          <p className="text-sm font-medium uppercase tracking-wider text-slate-400 mb-2">Tracking Reference</p>
          <p className="text-3xl font-mono font-bold text-brand-accent tracking-widest">
            {reference}
          </p>
        </div>
        <button
           onClick={() => {
             setReference("");
             setActiveTab("track");
           }}
           className="mt-8 text-sm font-semibold text-brand-primary hover:underline"
        >
          Track this report
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8 flex space-x-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
        <button
          onClick={() => setActiveTab("submit")}
          className={`flex-1 rounded-lg py-3 text-sm font-bold transition-all ${
            activeTab === "submit"
              ? "bg-white text-brand-primary shadow-sm ring-1 ring-slate-200/50"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Submit Report
        </button>
        <button
          onClick={() => setActiveTab("track")}
          className={`flex-1 rounded-lg py-3 text-sm font-bold transition-all ${
            activeTab === "track"
              ? "bg-white text-brand-primary shadow-sm ring-1 ring-slate-200/50"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Track Status
        </button>
      </div>

      {activeTab === "track" ? (
        <form onSubmit={handleTrack} className="space-y-6">
          <div>
            <label className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-4">
              <Search className="h-4 w-4 text-slate-400" />
              Check Report Status
            </label>
            <p className="text-sm text-slate-500 mb-4">
              Enter your NECT tracking reference to view the current status of your report.
            </p>
            <input
              type="text"
              required
              value={trackRef}
              onChange={(e) => setTrackRef(e.target.value)}
              placeholder="e.g. NECT-2024-123456"
              className="input text-center text-lg tracking-widest font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={trackLoading}
            className="btn-primary w-full py-4 text-lg shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2"
          >
            {trackLoading && <Loader2 className="h-5 w-5 animate-spin" />}
            {trackLoading ? "Searching..." : "Track Report"}
          </button>

          {trackResult && (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              {trackResult.error ? (
                <p className="text-center font-semibold text-red-600">{trackResult.error}</p>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Reference</span>
                    <span className="font-mono font-bold text-slate-900">{trackResult.reference}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Type</span>
                    <span className="font-medium text-slate-900">{trackResult.report_type}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Date</span>
                    <span className="font-medium text-slate-900">{new Date(trackResult.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Status</span>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${
                      trackResult.status === 'Resolved' || trackResult.status === 'Closed' ? 'bg-emerald-100 text-emerald-700' :
                      trackResult.status === 'In Progress' || trackResult.status === 'Site Inspection' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {trackResult.status}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </form>
      ) : (
        <form
          onSubmit={submitReport}
          className="space-y-8 animate-in fade-in duration-500"
        >
      <div>
        <label className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-4">
          <Info className="h-4 w-4 text-slate-400" />
          Reporting Identity
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setAnonymous(true)}
            className={`relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all ${
              anonymous ? "border-brand-primary bg-brand-primary/5 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${anonymous ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                <UserX className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Anonymous</p>
                <p className="text-xs text-slate-500 mt-1">Submit without contact details</p>
              </div>
            </div>
            {anonymous && <div className="absolute top-0 right-0 border-[16px] border-transparent border-t-brand-primary border-r-brand-primary"></div>}
          </button>

          <button
            type="button"
            onClick={() => setAnonymous(false)}
            className={`relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all ${
              !anonymous ? "border-brand-primary bg-brand-primary/5 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${!anonymous ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">With my details</p>
                <p className="text-xs text-slate-500 mt-1">We may contact you for updates</p>
              </div>
            </div>
            {!anonymous && <div className="absolute top-0 right-0 border-[16px] border-transparent border-t-brand-primary border-r-brand-primary"></div>}
          </button>
        </div>
      </div>

      <div className={`grid gap-5 transition-all duration-300 ${anonymous ? 'grid-rows-[0fr] opacity-0 overflow-hidden' : 'grid-rows-[1fr] opacity-100'}`}>
        <div className="grid gap-5 md:grid-cols-3">
          <input name="full_name" placeholder="Full name" className="input" disabled={anonymous} />
          <input name="phone" placeholder="Phone number" className="input" disabled={anonymous} />
          <input name="email" type="email" placeholder="Email address" className="input" disabled={anonymous} />
        </div>
      </div>

      <div className="h-px w-full bg-slate-200 my-8"></div>

      <div className="space-y-5">
        <div className="relative">
          <Info className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
          <select title="Report Type" name="report_type" required className="input pl-12 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.5em_1.5em] bg-[right_1rem_center] bg-no-repeat cursor-pointer">
            <option value="">Select report type</option>
            <option>Road reservation encroachment</option>
            <option>Utility damage</option>
            <option>Exposed cable</option>
            <option>Burst water pipe</option>
            <option>Unauthorized excavation</option>
            <option>Illegal structure</option>
            <option>Other infrastructure concern</option>
          </select>
        </div>

        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            <input
              name="location"
              required
              placeholder="Location / landmark (e.g. Near Achimota Mall)"
              className="input pl-12"
            />
          </div>
          <button
            type="button"
            onClick={handleGetLocation}
            disabled={locationLoading}
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-brand-primary transition-colors disabled:opacity-70"
            title="Get Current Location"
          >
            {locationLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Crosshair className="h-5 w-5" />}
          </button>
        </div>

        <div className="relative">
          <AlignLeft className="absolute left-4 top-4 h-5 w-5 text-slate-400 pointer-events-none" />
          <textarea
            name="description"
            required
            rows={5}
            placeholder="Describe what is happening in detail..."
            className="input pl-12 resize-none"
          />
        </div>

        <div>
          <label className="relative flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 py-8 hover:bg-slate-100 hover:border-slate-400 transition-colors">
            <div className="flex flex-col items-center justify-center pb-2 pt-1 text-center">
              <Camera className="mb-3 h-8 w-8 text-slate-400" />
              <p className="text-sm font-semibold text-slate-700">
                {fileName ? fileName : "Click to upload a photo or video (optional)"}
              </p>
              <p className="text-xs text-slate-500 mt-1">PNG, JPG, MP4 up to 50MB</p>
            </div>
            <input 
              title="Upload media" 
              name="photo" 
              type="file" 
              accept="image/*,video/*" 
              className="hidden" 
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFileName(e.target.files[0].name);
                }
              }}
            />
          </label>
        </div>
      </div>

      <button
        disabled={loading}
        className="btn-primary w-full py-5 text-lg shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="h-5 w-5 animate-spin" />}
        {loading ? "Submitting report..." : "Submit Report"}
      </button>
    </form>
      )}
    </div>
  );
}