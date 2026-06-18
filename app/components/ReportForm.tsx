"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { Loader2, CheckCircle2, User, UserX, Camera, MapPin, AlignLeft, Info } from "lucide-react";

export default function ReportForm() {
  const [anonymous, setAnonymous] = useState(true);
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

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
      try {
        (event.target as HTMLFormElement).reset();
      } catch (e) {
        console.error("Form reset error:", e);
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
           onClick={() => setReference("")}
           className="mt-8 text-sm font-semibold text-brand-primary hover:underline"
        >
          Submit another report
        </button>
      </div>
    );
  }

  return (
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

        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
          <input
            name="location"
            required
            placeholder="Location / landmark (e.g. Near Achimota Mall)"
            className="input pl-12"
          />
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
                {fileName ? fileName : "Click to upload a photo (optional)"}
              </p>
              <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 10MB</p>
            </div>
            <input 
              title="Upload photo" 
              name="photo" 
              type="file" 
              accept="image/*" 
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
  );
}