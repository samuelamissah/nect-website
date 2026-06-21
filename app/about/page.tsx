import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { CheckCircle2, History, Target, Users, Award, BookOpen, MapPin, Phone, Mail, Calendar, Building2, Shield, Clock, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const objectives = [
    "Protect road reservations from unauthorized encroachment and damage.",
    "Mandate joint-planning sessions for all intersecting infrastructure projects.",
    "Maintain a national database of utility corridors (water, power, telecommunications).",
    "Enforce penalties for unauthorized excavations and damage to state property.",
    "Provide a citizen reporting portal to crowdsource infrastructure monitoring.",
    "Coordinate with Regional Engineering Coordinating Teams across all 16 regions."
  ];

  const leadership = [
    {
      name: "Ing. Yaa Obenewaa Okudzeto, FGhIE",
      role: "Chairman",
      image: "/Yaa.jpeg",
      bio: "Electrical Engineer, Fellow of the Ghana Institution of Engineering (GhIE), and Executive Representative for Professional Engineers on the GhIE Council and Executive Committee. She is a leading advocate for infrastructure coordination, engineering standards, long-term national development planning, and effective implementation of public infrastructure projects across Ghana.",
      credentials: "FGhIE"
    },
    {
      name: "Pln. Percy Anaab Bukari, FGIP, MCAP",
      role: "Vice Chairman",
      image: "/Percy.jpeg",
      bio: "President of the Ghana Institute of Planning (GIP), National Development Planning Commission (NDPC) Commissioner, and seasoned Monitoring & Evaluation Specialist. He is widely recognized for his contributions to urban development, spatial planning, local governance, and sustainable city management across Ghana and West Africa.",
      credentials: "FGIP, MCAP"
    },
    {
      name: "David Aryeetey",
      role: "Organiser",
      image: "/David.jpeg",
      bio: "Communications professional and Assistant Communications Manager at the Ghana Chamber of Telecommunications. He has extensive experience in stakeholder engagement, public relations, policy advocacy, media relations, and communications surrounding Ghana's digital and telecommunications ecosystem.",
      credentials: "Communications Specialist"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-brand-primary/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white border border-white/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              About NECT
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl leading-tight">
              Coordinating Ghana&apos;s
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400 block mt-2">
                Critical Infrastructure
              </span>
            </h1>
            
            <p className="mt-6 text-lg leading-relaxed text-slate-300 max-w-2xl">
              The National Engineering Coordinating Team (NECT) is the central body responsible for ensuring that infrastructure projects across Ghana are executed harmoniously, preventing utility damage, and protecting national road corridors.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-white/80 bg-white/5 px-4 py-2 rounded-full">
                <Calendar className="h-5 w-5 text-brand-primary" />
                <span className="text-sm">Est. 1996</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 bg-white/5 px-4 py-2 rounded-full">
                <Users className="h-5 w-5 text-brand-primary" />
                <span className="text-sm">16 Regional Teams</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 bg-white/5 px-4 py-2 rounded-full">
                <Award className="h-5 w-5 text-brand-primary" />
                <span className="text-sm">National Mandate</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 bg-white/5 px-4 py-2 rounded-full">
                <Clock className="h-5 w-5 text-brand-primary" />
                <span className="text-sm">28+ Years of Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr_350px]">
          
          {/* Left Column */}
          <div className="space-y-16">
            {/* Mission */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-brand-primary/10 text-brand-primary">
                  <Target className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
                  <div className="h-1 w-16 bg-brand-primary rounded-full mt-1"></div>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-slate-600 pl-2">
                To establish a unified framework for the planning, execution, and maintenance of public infrastructure in Ghana. We bring together road agencies, utility providers, and local assemblies to eliminate the siloed approach to development, thereby saving the nation millions of Cedis annually in preventable damages.
              </p>
            </div>

            {/* History */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-brand-primary/10 text-brand-primary">
                  <History className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Our History</h2>
                  <div className="h-1 w-16 bg-brand-primary rounded-full mt-1"></div>
                </div>
              </div>
              
              <div className="space-y-4 text-lg leading-relaxed text-slate-600 pl-2">
                <div className="bg-brand-primary/5 p-6 rounded-xl border border-brand-primary/10">
                  <p className="text-slate-800 font-semibold">
                    <span className="text-brand-primary text-2xl font-bold mr-2">1996</span>
                    — The National Engineering Coordinating Team (NECT) was established
                  </p>
                </div>
                
                <p>
                  NECT was set up as a multi-agency body to resolve the growing conflicts between rapid road expansions and the rapid rollout of underground utility infrastructure—including fiber optic cables, water pipelines, and power lines. The increasing instances of newly constructed roads being excavated by utility companies highlighted the urgent need for a coordinated approach.
                </p>

                <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-slate-700 font-medium mb-3">
                    <Building2 className="inline-block h-5 w-5 text-brand-primary mr-2" />
                    Why NECT was created:
                  </p>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                      <span>Prevent waste of public funds on repeated road construction and repairs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                      <span>Minimize traffic disruptions and inconvenience to citizens</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                      <span>Protect vital utility infrastructure from damage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                      <span>Ensure coordinated planning between all infrastructure stakeholders</span>
                    </li>
                  </ul>
                </div>

                <p className="mt-4">
                  Today, NECT operates with a national mandate, backed by government policy to enforce strict coordination protocols before any major excavation or civil works commence within public right-of-ways. Our reach extends across all 16 regions of Ghana through Regional Engineering Coordinating Teams.
                </p>
              </div>
            </div>

            {/* Objectives */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-brand-primary/10 text-brand-primary">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Core Objectives</h2>
                  <div className="h-1 w-16 bg-brand-primary rounded-full mt-1"></div>
                </div>
              </div>
              
              <ul className="space-y-4 pl-2">
                {objectives.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                      <span className="text-sm font-bold">{i + 1}</span>
                    </div>
                    <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-primary">1996</p>
                <p className="text-xs text-slate-500 mt-1">Year Established</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-primary">16</p>
                <p className="text-xs text-slate-500 mt-1">Regional Teams</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-primary">50+</p>
                <p className="text-xs text-slate-500 mt-1">Partner Agencies</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-primary">28+</p>
                <p className="text-xs text-slate-500 mt-1">Years of Service</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-xl">
              <h3 className="text-xl font-bold mb-3">Join the Network</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-6">
                Are you a licensed contractor or utility provider? Register on our portal to submit your project schedules and ensure coordinated infrastructure development.
              </p>
              <Link
                href="/register"
                className="block w-full rounded-lg bg-brand-primary px-6 py-3.5 text-center text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-primary/90 hover:shadow-lg hover:scale-[1.02]"
              >
                Contractor Registration
              </Link>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-white/60">Already registered?</p>
                <Link href="/login" className="text-sm text-brand-primary hover:text-brand-primary/80 font-medium">
                  Sign in →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-4">Contact NECT</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                  <span className="text-slate-600">Ministry of Roads and Highways, Accra, Ghana</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-5 w-5 text-brand-primary shrink-0" />
                  <span className="text-slate-600">+233 30 212 3456</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-5 w-5 text-brand-primary shrink-0" />
                  <span className="text-slate-600">info@nect.gov.gh</span>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200">
                  <p className="text-xs text-slate-400">Regional Coordinating Teams available in all 16 regions</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-brand-primary/5 p-6 border border-brand-primary/10">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-5 w-5 text-brand-primary" />
                <h4 className="font-semibold text-slate-900">Regional Presence</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                NECT operates through Regional Engineering Coordinating Teams across all 16 regions of Ghana, ensuring localized coordination and rapid response.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="bg-white py-20 lg:py-24 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-semibold mb-4">
              <Users className="h-4 w-4" />
              Leadership Team
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet Our Leadership</h2>
            <p className="text-slate-600">
              Dedicated professionals committed to coordinating Ghana&apos;s infrastructure development
            </p>
            <div className="w-24 h-1 bg-brand-primary mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {leadership.map((member, index) => (
              <div 
                key={index} 
                className="group bg-slate-50 rounded-2xl p-8 text-center border border-slate-200 hover:border-brand-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative mb-6 mx-auto h-40 w-40">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-primary/20 to-transparent group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-lg group-hover:border-brand-primary/30 transition-all duration-300">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={160}
                      height={160}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {member.name}
                </h3>

                <p className="mt-1 text-sm font-semibold text-brand-primary">
                  {member.role}
                </p>

                {member.credentials && (
                  <p className="text-xs text-slate-400 mt-1">{member.credentials}</p>
                )}

                <div className="mt-4 h-px bg-slate-200"></div>

                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 py-20 lg:py-24">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 -ml-20 -mt-20 h-96 w-96 rounded-full bg-brand-primary/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 -mr-20 -mb-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white lg:text-4xl mb-4">
              Ready to Coordinate Your Infrastructure Project?
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Join NECT in building a better Ghana through coordinated infrastructure development. 
              Contact your Regional Engineering Coordinating Team to get started.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-primary/90 hover:shadow-lg hover:scale-[1.02]"
              >
                Contact Us
              </Link>
              <Link
                href="/regions"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/20 border border-white/20"
              >
                <MapPin className="h-4 w-4" />
                Find Your Regional Team
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/20 border border-white/20"
              >
                <BookOpen className="h-4 w-4" />
                View Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}