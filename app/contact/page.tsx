"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Building2, 
  Send, 
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Loader2
} from "lucide-react";
import { motion, Variants, AnimatePresence } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

// Social media icons as SVG components
const LinkedInIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const GlobeIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
    <line x1="2" y1="12" x2="22" y2="12" strokeWidth="2"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="2"/>
  </svg>
);

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Address",
      details: [
        "Ministry of Roads and Highways",
        "P.O. Box M.44, Ministries",
        "Accra, Ghana"
      ],
      color: "text-brand-primary"
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "+233 30 212 3456",
        "+233 30 212 3457",
        "+233 24 123 4567"
      ],
      color: "text-emerald-600"
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        "info@nect.gov.gh",
        "support@nect.gov.gh",
        "coordinator@nect.gov.gh"
      ],
      color: "text-blue-600"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: [
        "Monday - Friday: 8:00 AM - 5:00 PM",
        "Saturday: 9:00 AM - 1:00 PM",
        "Sunday: Closed"
      ],
      color: "text-purple-600"
    }
  ];

  const regionalOffices = [
    {
      region: "Greater Accra",
      address: "P.O. Box GP 1234, Accra",
      phone: "+233 30 212 3456",
      email: "accra@nect.gov.gh"
    },
    {
      region: "Ashanti",
      address: "P.O. Box 567, Kumasi",
      phone: "+233 32 212 3456",
      email: "kumasi@nect.gov.gh"
    },
    {
      region: "Western",
      address: "P.O. Box 890, Sekondi-Takoradi",
      phone: "+233 31 212 3456",
      email: "western@nect.gov.gh"
    },
    {
      region: "Eastern",
      address: "P.O. Box 111, Koforidua",
      phone: "+233 34 212 3456",
      email: "eastern@nect.gov.gh"
    },
    {
      region: "Northern",
      address: "P.O. Box 222, Tamale",
      phone: "+233 37 212 3456",
      email: "northern@nect.gov.gh"
    },
    {
      region: "Central",
      address: "P.O. Box 333, Cape Coast",
      phone: "+233 33 212 3456",
      email: "central@nect.gov.gh"
    }
  ];

  const generateReference = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    return `NECT-${year}-${random}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    setReferenceNumber("");

    try {
      const reference = generateReference();

      // 1. Save to Supabase as a report - using columns that exist in your reports table
      const { error: supabaseError } = await supabase
        .from("reports")
        .insert({
          reference: reference,
          report_type: formData.subject,
          description: formData.message,
          location: "Contact Form Submission",
          status: "Pending",
          anonymous: false,
          full_name: formData.name,
          email: formData.email,
          created_at: new Date().toISOString(),
        });

      if (supabaseError) {
        console.error("Supabase error:", supabaseError);
        setStatus("error");
        setErrorMessage("Failed to save your report. Please try again.");
        setTimeout(() => setStatus("idle"), 5000);
        return;
      }

      // 2. Send email notification
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            reference: reference,
          }),
        });

        const data = await response.json();
        if (!data.success) {
          console.error("Email notification failed:", data.error);
        }
      } catch (emailError) {
        console.error("Email error:", emailError);
        // Still continue - report was saved to database
      }

      setReferenceNumber(reference);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => setStatus("idle"), 10000);
      
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 lg:py-24"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-brand-primary/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-5">
          <motion.div 
            variants={fadeInUp}
            className="max-w-3xl"
          >
            <motion.div 
              variants={fadeInUp}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-white border border-white/20"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
              </span>
              Contact Us
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              Get in Touch
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="mt-6 text-lg leading-relaxed text-slate-300"
            >
              Have questions about infrastructure coordination? Need to report an issue? 
              Reach out to the National Engineering Coordinating Team.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Cards */}
      <section className="mx-auto max-w-7xl px-5 -mt-8 relative z-20">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.08)" }}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 transition-all"
            >
              <div className={`h-12 w-12 rounded-xl ${item.color} bg-opacity-10 flex items-center justify-center mb-4`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
              <div className="space-y-1 text-sm text-slate-600">
                {item.details.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact Form & Map */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:py-24 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInLeft}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
            <p className="text-slate-600 mb-6">Fill in the form below and we&apos;ll get back to you as soon as possible.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Subject <span className="text-red-500">*</span></label>
                <select 
                  id="subject"
                  title="Select a subject for your message"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Report Infrastructure Issue">Report Infrastructure Issue</option>
                  <option value="Coordination Request">Coordination Request</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Message <span className="text-red-500">*</span></label>
                <textarea 
                  rows={5}
                  name="message"
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all resize-none"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "sending"}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-sm font-bold text-white hover:bg-brand-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </motion.button>

              {/* Success/Error Messages */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Thank you! Your message has been sent successfully.</p>
                        {referenceNumber && (
                          <p className="mt-2 text-sm">
                            Your reference number: <span className="font-bold font-mono bg-emerald-100 px-2 py-0.5 rounded">{referenceNumber}</span>
                          </p>
                        )}
                        {referenceNumber && (
                          <p className="mt-1 text-sm">
                            <a href="/track" className="text-brand-primary hover:underline font-medium">
                              Track your report →
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700"
                  >
                    <XCircle className="h-5 w-5 shrink-0" />
                    <span className="font-medium">{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Map & Quick Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInRight}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="h-64 bg-slate-200 relative flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-brand-primary mx-auto mb-2" />
                  <p className="text-slate-600 font-medium">Map Location</p>
                  <p className="text-sm text-slate-500">Ministry of Roads and Highways, Accra</p>
                </div>
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-slate-900 mb-2">Visit Our Office</h3>
                <p className="text-sm text-slate-600">
                  Ministry of Roads and Highways Building, <br />
                  Ministries, Accra, Ghana
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Connect With Us</h3>
              <div className="flex gap-3">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#0A66C2] hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#1DA1F2] hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <TwitterIcon />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#FF0000] hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <YoutubeIcon />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-brand-primary hover:text-white transition-colors"
                  aria-label="Website"
                >
                  <GlobeIcon />
                </motion.a>
              </div>
            </div>

            <div className="bg-brand-primary/5 rounded-2xl border border-brand-primary/10 p-6">
              <h4 className="font-semibold text-slate-900 mb-2">Track Your Report</h4>
              <p className="text-sm text-slate-600 mb-3">
                Have a reference number? Check the status of your report.
              </p>
              <a
                href="/track"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-primary/80 transition-colors"
              >
                Go to Tracking Portal →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Regional Offices Section */}
      <section className="bg-white border-t border-slate-200 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-semibold mb-4">
              <Building2 className="h-4 w-4" />
              Regional Offices
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Regional Presence</h2>
            <p className="text-slate-600">
              NECT operates through Regional Engineering Coordinating Teams across all 16 regions of Ghana.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {regionalOffices.map((office, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.08)" }}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-6 transition-all hover:border-brand-primary/30"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-3">{office.region} Region</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <p className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                    {office.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-brand-primary shrink-0" />
                    {office.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-brand-primary shrink-0" />
                    {office.email}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-primary py-16">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <MessageSquare className="h-12 w-12 text-white/80 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Need Immediate Assistance?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            For urgent infrastructure coordination issues, call our emergency hotline or use the quick reporting portal.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="/report"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-brand-primary hover:bg-white/90 transition-colors"
            >
              Report Issue
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="tel:+233302123456"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm px-8 py-3.5 text-sm font-bold text-white hover:bg-white/20 transition-colors border border-white/20"
            >
              <Phone className="h-4 w-4" />
              Emergency Hotline
            </motion.a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}