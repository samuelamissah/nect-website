"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { HelpCircle, ChevronDown, MessageCircle } from "lucide-react";
import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
};

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
    <main className="min-h-screen bg-slate-50 flex flex-col overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-brand-primary/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        
        <div className="relative z-10 mx-auto max-w-4xl px-5 py-16 lg:px-10 lg:py-24 text-center">
          <motion.div 
            variants={fadeInDown}
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary/20 mb-6"
          >
            <HelpCircle className="h-8 w-8 text-brand-primary" />
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl font-extrabold tracking-tight text-white md:text-5xl"
          >
            Frequently Asked Questions
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="mt-6 text-lg leading-relaxed text-slate-300 max-w-2xl mx-auto"
          >
            Find answers to common questions about NECT&apos;s operations, reporting procedures, and contractor compliance.
          </motion.p>
        </div>
      </motion.section>

      {/* FAQ Content */}
      <section className="mx-auto max-w-4xl px-5 py-16 lg:px-10 lg:py-24 w-full flex-1">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-12"
        >
          {faqs.map((section, sectionIdx) => (
            <motion.div key={sectionIdx} variants={fadeInUp}>
              <motion.h2 
                variants={fadeInUp}
                className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200"
              >
                {section.category}
              </motion.h2>
              <div className="space-y-4">
                {section.questions.map((faq, faqIdx) => {
                  const globalIdx = sectionIdx * 100 + faqIdx;
                  const isOpen = openIndex === globalIdx;
                  
                  return (
                    <motion.div 
                      key={faqIdx} 
                      variants={fadeInUp}
                      whileHover={{ scale: 1.01 }}
                      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                        isOpen 
                          ? 'border-brand-primary bg-white shadow-md shadow-brand-primary/5' 
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                      }`}
                    >
                      <motion.button 
                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
                        onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                        whileTap={{ scale: 0.99 }}
                      >
                        <span className={`font-bold pr-4 transition-colors ${
                          isOpen ? 'text-brand-primary' : 'text-slate-900 group-hover:text-brand-primary'
                        }`}>
                          {faq.q}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className={`h-5 w-5 shrink-0 transition-colors ${
                            isOpen ? 'text-brand-primary' : 'text-slate-400'
                          }`} />
                        </motion.div>
                      </motion.button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5">
                              <p className="text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                                {faq.a}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
          className="mt-20 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-brand-primary/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
          
          <div className="relative z-10">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex justify-center"
            >
              <MessageCircle className="h-12 w-12 text-brand-primary" />
            </motion.div>
            
            <h3 className="text-2xl font-bold text-white mb-3 mt-4">Still have questions?</h3>
            <p className="text-slate-300 mb-8 max-w-lg mx-auto">
              If you couldn&apos;t find the answer you were looking for, please reach out to our support team directly.
            </p>
            <motion.a 
              href="mailto:info@nect.gov.gh"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-amber-400 text-slate-900 font-bold rounded-lg hover:bg-amber-300 transition-colors"
            >
              Contact Support
            </motion.a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}