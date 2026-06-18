"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { HelpCircle, ChevronDown, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "General Information",
      questions: [
        {
          q: "What is the mandate of NECT?",
          a: "The National Engineering Coordinating Team (NECT) is mandated to coordinate all infrastructural developments within road reservations across Ghana to prevent damage to utility lines, reduce road cuts, and ensure public safety."
        },
        {
          q: "Who makes up the NECT committee?",
          a: "NECT comprises representatives from major utility providers (ECG, GWCL, Telecommunications), road agencies (Department of Urban Roads, Ghana Highway Authority), and local government assemblies."
        }
      ]
    },
    {
      category: "Citizen Reporting",
      questions: [
        {
          q: "How do I report a burst pipe or exposed cable?",
          a: "You can report any infrastructure issue directly through our Citizen Portal on the homepage or by clicking 'Report Issue' in the navigation menu. You can choose to remain anonymous or provide your details for updates."
        },
        {
          q: "How long does it take to resolve a reported issue?",
          a: "Response times vary depending on the severity. Emergency hazards (like exposed high-voltage cables) are dispatched immediately. Standard issues are assessed within 48 hours."
        },
        {
          q: "Can I track the status of my report?",
          a: "Yes. After submitting a report, you will receive a tracking reference number. You can enter this number on the 'Track Status' page to see real-time updates on your issue."
        }
      ]
    },
    {
      category: "For Contractors",
      questions: [
        {
          q: "Do I need NECT approval before excavating?",
          a: "Yes. All contractors must obtain a wayleave permit and clearance from NECT before commencing any excavation works within national road reservations."
        },
        {
          q: "What happens if I damage a utility line during construction?",
          a: "Contractors are liable for any damages to utility lines if they excavate without NECT clearance. The cost of repair and associated penalties will be billed directly to the offending contractor."
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-5 py-16 lg:px-10 lg:py-24 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary/10 mb-6">
            <HelpCircle className="h-8 w-8 text-brand-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Find answers to common questions about NECT&apos;s operations, reporting procedures, and contractor compliance.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 lg:px-10 lg:py-24 w-full flex-1">
        <div className="space-y-12">
          {faqs.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h2 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.questions.map((faq, faqIdx) => {
                  const globalIdx = sectionIdx * 100 + faqIdx;
                  const isOpen = openIndex === globalIdx;
                  
                  return (
                    <div 
                      key={faqIdx} 
                      className={`border rounded-xl overflow-hidden transition-colors ${isOpen ? 'border-brand-primary bg-white shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                    >
                      <button 
                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                        onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                      >
                        <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                        <ChevronDown className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-primary' : ''}`} />
                      </button>
                      <div 
                        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <p className="text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          <div className="relative z-10">
            <MessageCircle className="h-10 w-10 text-brand-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Still have questions?</h3>
            <p className="text-slate-300 mb-8 max-w-lg mx-auto">
              If you couldn&apos;t find the answer you were looking for, please reach out to our support team directly.
            </p>
            <a href="mailto:info@nect.gov.gh" className="inline-flex items-center gap-2 px-8 py-3 bg-brand-accent text-slate-900 font-bold rounded-lg hover:bg-brand-accent/90 transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}